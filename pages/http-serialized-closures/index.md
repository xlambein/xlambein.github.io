---
template: page
pubdate: 2024-08-04
tags:
  - clojure
---

# Abstract away HTTP with serialized closures

I was playing around with Clojure the other day---a language I'm not very familiar with---and found an interesting design pattern for writing a web app with server-side rendering. I haven't seen this used elsewhere, but I didn't look super hard. Chances are, there's a library or framework which already does something similar, in which case I'd love to know.

## Problem statement

Let's say I'm writing a to-do app. I'm using [ring][ring] to write HTTP request handlers, and [hiccup][hiccup] to produce HTML. Here's a basic index page, which has a form for adding a new task, and a list of tasks:

```clojure
; Inner state. In a real app, this would be a database.
(def ^:dynamic todos (atom [{:desc "Take out the trash", :done false}
                            {:desc "Buy groceries", :done true}]))
(defn todos-add-new [desc]
  (swap! todos conj {:desc desc, :done false}))
(defn todos-toggle-done [index]
  (swap! todos
         (fn [todos]
           (let [{desc :desc, done :done} (nth todos index)]
             (assoc todos index {:desc desc, :done (not done)})))))

; Index route. Not shown: the actual router, mapping `/` to it.
(defn index [request]
  (h/html
   [:h1 "To-do"]
   ; Create a task
   [:form
    [:p
     [:input {:type "text"
              :name "desc"
              :placeholder "Description"}]
     [:button
      {:type "submit"}
      "Create task"]]]
   ; List of tasks
   [:ul
    (for [{desc :desc, done :done} @todos]
      [:li
       [:label
        [:input
         {:type "checkbox", :checked done}
         desc]]])]))
```

In order to make this app work, we need an endpoint for creating a task, and an endpoint for (un)marking a task as done. In most HTTP frameworks I've used, we'd create two new functions and add them as routes to our HTTP router. Something like:

```clojure
(defn router
  (route
   "/" index
   "/tasks/create" create-task
   "/task/:id/mark" mark-task))

(defn create-task [request]
  ; Not shown: extracting the description from the POST request body
  (let [desc (extract-desc-from-request-body request)]
    (todos-add-new desc)))

(defn mark-task [request]
  ; Not shown: extracting the task index from the URL
  (let [index (extract-index-from-url request)]
    (todos-toggle-done index)))
```

Then we can hook this up to our form and our checkboxes (with a sprinkle of javascript for the latter). Or if we want something a bit more reactive, we can use [HTMX][htmx], and make the functions `create-task` and `mark-task` return the updated, server-side-rendered HTML:

```clojure
(defn index [request]
  (h/html
   [:h1 "To-do"]
   [:form
    ; NEW: attributes for HTMX
    {:hx-post "/tasks/create"
     :hx-swap "outerHTML"
     :hx-target "#todos"}
    [:p
     [:input {:type "text"
              :name "desc"
              :placeholder "Description"}]
     [:button
      {:type "submit"}
      "Create to-do"]]]
   ; NEW: we moved the task list to separate functions
   (show-tasks)))

(defn show-tasks []
  [:ul
   {:id "todos"} ; HTML id, to use as target with HTMX
   (for [index (range (count @todos))]
     (show-task index))])

(defn show-task [index]
  (let [{desc :desc, done :done} (nth @todos index)]
    [:li
     {:id (str "todo-" index)}
     [:label
      [:input
       {:type "checkbox", :checked done
        :hx-post (str "/task/" index "/mark")
        :hx-swap "outerHTML"
        :hx-target (str "todo-" index)}
       desc]]]))

(defn create-task [request]
  ; Snip: same as above
  ; Return the (updated) task list HTML, to be substituted by HTMX
  (show-tasks))

(defn mark-task [request]
  ; Snip: same as above
  ; Return the (updated) task HTML, to be substituted by HTMX
  (show-task index))
```

While this works well, it feels like too much boilerplate for what we're doing. If this were a native app, or even a fully browser-based app without a server, we could instead do something like:

```clojure
(defn index [request]
  (h/html
    ; Snip
   [:form
    {:on-submit (fn [desc] (todos-add-new desc))}]
    ; Snip
   ))
```

Essentially, connect the form to a callback, which performs the action we want when submitting. Why can't we do this with a client-server setting, and abstract away the HTTP layer? Well, turns out this is fairly easy to do by serializing closures.

## Serializing closures

Clojure has a nice serialization library called [nippy][nippy], and there's a specific extention to that library called [nippy-serializable-fn][nippy-serializable-fn] which allows you to do exactly what's on the tin:

```clojure
(def y 1)

(def ser-fn (nippy/freeze-to-string (fn [x] (+ x y))))

(def add-one (nippy/thaw-from-string ser-fn))

; true
(= (add-one 2) 3)
```

The way this works is rather simple: in Clojure, you can reflect on a function to retrieve its compiled name and all its captured variables.[^ser] Then, it's just a matter of serializing both.

[^ser]: Note that this can work in any language that offers such facilities. As far as I could tell, JavaScript is not one of them.

So with a little bit of plumbing, I can write a `route` function which takes any function `f` and produces an endpoint for my server, such that sending an HTTP request to that endpoint will call `f`.

Given that, here's the updated code for creating a new task:

```clojure
(defn index [request]
  (h/html
   [:h1 "To-do"]
   [:form
    ; NEW: route generated from a closure
    {:hx-post (route (fn [request]
                       (let [desc (extract-desc-from-request-body request)]
                         (todos-add-new desc)
                         (show-tasks))))
     :hx-swap "outerHTML"
     :hx-target "#todos"}
    [:p
     [:input {:type "text"
              :name "desc"
              :placeholder "Description"}]
     [:button
      {:type "submit"}
      "Create to-do"]]]
   (show-tasks)))
```

Everything works in the same way as above, except that before the form would POST to `/tasks/create`, and now it POSTs to an endpoint generated from the closure passed to `route`. This means we've moved our logic to the exact place where it's used, similarly to adding an `onclick` event handler to a button in a JavaScript app.

Where this gets slightly more interesting is when we look at the "mark as done" action:

```clojure
(defn show-task [index]
  (let [{desc :desc, done :done} (nth @todos index)]
    [:li
     {:id (str "todo-" index)}
     [:label
      [:input
       {:type "checkbox", :checked done
        ; NEW: route generated from a closure
        :hx-post (route (fn [_]
                          (todos-toggle-done index)
                          (show-task index)))
        :hx-swap "outerHTML"
        :hx-target (str "todo-" index)}
       desc]]]))
```

Here, the closure passed to `route` _captures the index_ of the task. Hence, unlike in the previous implementation, there's no need to put that index into the route and decode it in the router: this is already taken care of by the (de)serialization of the closure.

Two concerns you might have about this idea: first, this sounds _wildly_ unsecure, and you'd be right! Malicious actors could reverse-engineer the serialization mechanism and reveal secrets, alter the closure's captures, or even try and call a different function that you didn't intend to expose. It's not a dealbreaker though, as there are easy solutions. For example: 1) you could store each generated route in a dictionary, and check for each HTTP request that the route did come from you, 2) you could encrypt routes, and/or 3) you could sign routes to ensure they haven't been tempered with. Of these, encryption seems like the most effective.

A second concern is that those endpoints aren't very "friendly". Instead, they are base-64 horrors like:

```
/TlBZAFJbuWkeY2xqbXgudG9kbyRzaG93X3RvZG8kZm5fXzEzODE2KgAAAAFpBnRvZG8tMQg=
```

However, I don't think this is too important. Unless you need to make a user-facing API---which isn't really the goal here---it doesn't actually matter that the routes are so ugly. Furthermore, if you did want prettier endpoints (e.g., to make debugging easier), you could put in a bit of work and roll your own serialization scheme that e.g. exposes the function name and captured values. Then you could end up with an endpoint like this:

```
/main.core$index$fn__24595@24f63771?capture1=123&capture2=foo
````

## Conclusion

I haven't poked at this idea enough to ensure it's not full of holes, but with my limited experience I quite enjoy it. Do let me know what blatant limitations I overlooked, and/or send me all the major framework I missed that already do this.

Also, for my own taste, a major limitation of this idea is that it's so aggressively "non-local-first". It's a proper client-server app, and if your internet connection goes down, well, tough luck. So I'm wondering whether it would be possible to abstract away the client/server delimitation here. Since this is Clojure, an app could be compiled to both Java for the server, and JavaScript for the client. And since all interactive elements are implemented as regular callbacks, we could have one implementation use serialized closures & HTMX, and another use JavaScript events. Then it's a matter of synchronizing data between the client and the server when they're connected---this is probably the hard part. Anyway, it's something to think about, perhaps for a future blog post.

Also also, I do know about [Electric][electric], but AFAIU it's a much larger, reactive web framework. It probably does most of what this blogpost offers, but it's also quite a different beast to tame.

[ring]: https://github.com/ring-clojure/ring
[hiccup]: https://github.com/weavejester/hiccup
[htmx]: https://htmx.org/
[nippy]: https://github.com/taoensso/nippy
[nippy-serializable-fn]: https://github.com/redplanetlabs/nippy-serializable-fns
[htmx-resp-headers]: https://htmx.org/reference/#response_headers
[electric]: https://github.com/hyperfiddle/electric
