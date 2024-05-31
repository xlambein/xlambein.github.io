---
description: >-
pubdate: 2024-05-31
tags:
  - GUI
  - rust
---

# A design pattern for GUIs based on polymorphism

I'd like to share a pattern I've been exploring for a GUI library I'm working on. It's a sort of compromise between retained and immediate GUIs.

## Immediate versus retained

In a typical immediate GUI (imGUI) framework, you'd write a button kind-of like that:

```rust
fn button(ctx: &mut Context, text: &str) -> bool {
    // If you're wondering, `TextLayouter` is some sort of
    // thread-local cache for text layouts, keyed by string
    let text_layout = TextLayouter::layout_text(text);
    let size = text_layout.size();
    let rect = Rect::new(ctx.position(), size);

    let hovered = rect.contains(ctx.mouse());
    let bg_color = if hovered {
        HOVER_COLOR
    } else {
        BG_COLOR
    };

    ctx.draw_box(rect, bg_color);
    ctx.draw_text(text_layout);

    if ctx.clicked() && hovered {
        ctx.capture_click();
        true
    } else {
        false
    }
}
```

Which means, you do the layouting, rendering and event handling all in one function. This contrasts with the way retained GUIs (retGUI) usually work, where they typically use objects rather than functions. Something like:

```rust
struct Button {
    text: String,
    on_click: Option<Box<dyn FnMut()>>,
}

impl Button {
    fn new(text: String) -> Self {
        Self {
            text,
            text_layout: None,
            on_click: None,
        }
    }

    fn on_click(self, on_click: impl FnMut()) -> Self {
        Self {
            on_click: Some(Box::new(on_click)),
            ..self
        }
    }
}

impl Widget for Button {
    fn layout(&mut self, ctx: &mut LayoutContext) -> Size {
        let text_layout = TextLayouter::layout_text(text);
        text_layout.size()
    }

    fn draw(&self, ctx: &mut RenderContext) {
        let rect = ctx.available_rect();
        ctx.draw_box(rect);

        let text_layout = TextLayouter::layout_text(text);
        ctx.draw_text(text_layout);
    }

    fn event(&mut self, ctx: &mut EventContext, event: &Event) {
        let rect = ctx.available_rect();
        if let Event::MouseButtonUp = event {
            if rect.contains(ctx.mouse()) {
                if let Some(on_click) = self.on_click.as_mut() {
                    on_click();
                }
            }
        }
    }
}
```

When comparing the two, we see a bit more separation of concerns in the retGUI, but this comes at the cost of some redundant bits, more boilerplate, and additional state management. This becomes worse as widgets get more complex. In particular with nested widgets, you typically end up copy-pasting a `for` loop several times.

That being said, there's plenty of good reasons to _not_ use an imGUI framework. With an imGUI, many tasks become awkward, and some things are pretty much impossible. For example, since they perform layouting "as they go" (i.e., along with rendering), layouts like flexbox that adapt to their content cannot be implemented with imGUI.

Like Hannah Montana, I want the best of both worlds. To that end, I've started using a pattern that lets me write code which looks like imGUI, but which behaves more like retGUI. As we'll see, it relies on making the `button` function polymorphic.

## The polymorphic immediate GUI pattern

Let's return to the example of the imGUI button from above, which I'll update with a few changes:

```rust
fn button<C: Phase>(ctx: &mut C, text: &str) -> bool {
    let text_layout = TextLayouter::layout_text(text);
    ctx.set_size(text_layout.size());
    let rect = ctx.rect();

    let hovered = rect.contains(ctx.mouse());

    ctx.render(|painter| {
        let bg_color = if hovered {
            Color::LESS_DARK
        } else {
            Color::DARK
        };

        painter.draw_box(rect, bg_color);
        painter.draw_text(&text_layout);
    });

    if ctx.clicked() && hovered {
        ctx.capture_click();
        true
    } else {
        false
    }
}
```

The code is mostly the same as before, except for a few things. First, `button` is now a generic function which accepts some type `C` implementing `Phase`. Next, in the body, I'm calling `set_size` to signal the layout size to the context, and I'm using a function `rect` to get the button's position and size to draw and check for events. Finally, I'm doing all the rendering in a call to `render`, which takes a closure.

The idea here is that, through polymorphism, this single function actually ends up implementing all three methods `layout`, `draw` and `event` of the `Button` object from the retGUI example. The actual variant is selected by passing a different `C: Phase` as the first argument, monomorphizing `button` into one of the three retGUI functions.

For example, if I wanted to execute the layouting phase of this widget, I would do something like this:

```rust
let ctx = LayoutPhase::new();
button(&mut ctx, "Click me!")
```

and similarly with `RenderPhase` and `EventPhase`.

Note that this pattern handles nesting very well, which means I can define a custom GUI element that uses `button` as follows:

```rust
fn counter<C: Phase>(&mut ctx: C) {
    let mut count = 0;

    // We'll see why we need `ctx.nested()` later
    if button(&mut ctx.nested(), "Increment") {
        count += 1;
    } else if button(&mut ctx.nested(), "Decrement") {
        count -= 1;
    }
}
```

and then lay out the whole UI with `counter(&mut LayoutPhase::new())`.

## Implementing the pattern

To understand how this works, let's look at the `Phase` trait and each of its implementors, starting with `LayoutPhase`:

```rust
trait Phase {
    /// Specify the desired size of the current GUI node.
    fn set_size(&mut self, _size: Size) {}

    /// The rectangle of the current GUI node.
    fn rect(&mut self) -> Rect {
        Rect::EMPTY
    }

    /// The current position of the mouse.
    fn mouse(&self) -> Vec2 {
        Vec2 { x: 0.0, y: 0.0 }
    }

    /// Rendering.
    fn render(&mut self, _paint: impl FnOnce(&mut Painter)) {}

    /// Whether the mouse was just clicked.
    fn clicked(&self) -> bool {
        false
    }

    /// Signal that the current mouse click was captured, and
    /// shouldn't bubble.
    fn capture_click(&mut self) {}

    /// Create a phase context for a nested GUI node.
    fn nested(&mut self) -> Self;

    // Probably a bunch of other things.
}

struct LayoutPhase {
    /// ID of this GUI node.
    node_id: NodeId,
    /// Deterministic source of node IDs.
    node_id_source: Rc<NodeIdSource>,
    /// Desired size of each GUI node.
    constraints: Rc<LayoutConstraints>,
    // Snip.
}

impl Phase for LayoutPhase {
    fn set_size(&mut self, size: Size) {
        self.constraints.set_size(self.node_id, size);
    }

    fn nested(&mut self) -> Self {
        let node_id = self.node_id_source.next_id();
        self.constraints.add_child(self.node_id, node_id);
        Self {
            node_id,
            constraints: self.constraints.clone(),
        }
    }
}
```

As you can see, `Phase` has many default implementations for its methods, and `LayoutPhase` only provides a couple of required methods. This means any call to e.g. `render` or `capture_click`, once they're monomorphized, will be inlined into nothing. Even better, calls to `click` will inline to `false`, which means the compiler will get rid of whole `if` blocks. More things can be eliminated transitively, and as a result, we get the following monomorphized version of the polymorphic `button<C: Phase>` from above:

```rust
fn button_layout(ctx: &mut LayoutPhase, text: &str) -> bool {
    let text_layout = TextLayouter::layout_text(text);
    ctx.set_size(text_layout.size());

    // `rect` and `hover` are unused, so they're optimized out by
    // the compiler

    // No render block

    // No event handling

    false
}
```

which is pretty much equivalent to the retGUI method `layout` from above.

Before continuing, I'll do a quick parenthesis into a few details of the implementation of `LayoutPhase`. This is not crucial to understanding the pattern, but it's helpful if you wanna know how we bridge the gap from imGUI to retGUI.

First, there's these `node_id` and `node_id_source` fields in `LayoutPhase`. The former is used to identify a specific node in the GUI tree, while the latter is a shared deterministic source of such node IDs. This implies that a specific `LayoutPhase` object, and indeed in general a specific `Phase` object, is bound to a given GUI node.

Then there's this shared object `constraints`: this is an accumulator which collects all the layout constraints for all the GUI nodes we're traversing. This means once we're done with the layouting phase, `constraints` will know the desired sizes of various nodes, which it can use to "solve" the layout globally and assign a position and size to each GUI node. The node ID source being deterministic, we can reset it and re-use it in the following phases, in order to assign the correct position and size to each node.

Finally, we need a way to actually create a new `Phase` instance for a nested element, and bind it to a given GUI node. This is what the `nested` method does. In the case of `LayoutPhase`, it gets the next node ID from the source, marks it as child of the current node, and creates a new `LayoutPhase` instance with it.

End of parenthesis! Let's move on to the next phase, rendering:

```rust
struct RenderPhase {
    /// ID of this GUI node.
    node_id: NodeId,
    /// Deterministic source of node IDs.
    node_id_source: Rc<NodeIdSource>,
    /// Position and size of all laid out node.
    layout: Rc<Layout>,
    /// Object used for painting to the screen.
    painter: Rc<RefCell<Painter>>,
    /// Current position of the mouse.
    mouse: Vec2,
    // Snip.
}

impl Phase for RenderPhase {
    fn rect(&mut self) -> Rect {
        self.layout.get(self.node_id)
    }

    fn mouse(&self) -> Vec2 {
        self.mouse
    }

    fn render(&mut self, paint: impl FnOnce(&mut Painter)) {
        paint(self.painter.borrow_mut())
    }

    fn nested(&mut self) -> Self {
        let node_id = self.node_id_source.next_id();
        Self {
            node_id,
            ..self.clone()
        }
    }
}
```

Here we implement different methods of `Phase`: `rect`, which returns the position and size that have been computed during a previous layout phase, along with `mouse`, which may be useful when drawing hovers, and of course `render`. As before, there's also the `nested` method, which is mostly the same. Note that here we don't implement `set_size`, since it isn't used by the rendering phase.

Given all that, the function `button` now monomorphizes with `RenderPhase` to:

```rust
fn button_render(ctx: &mut RenderPhase, text: &str) -> bool {
    let text_layout = TextLayouter::layout_text(text);
    // No `set_size`
    let rect = ctx.rect();

    let hovered = rect.contains(ctx.mouse());

    ctx.render(|painter| {
        let bg_color = if hovered {
            Color::LESS_DARK
        } else {
            Color::DARK
        };

        painter.draw_box(rect, bg_color);
        painter.draw_text(&text_layout);
    });

    // No event handling

    true
}
```

Nothing's very different about the `EventPhase`, so I'll just provide an implementation and skip the monomorphization:

```rust
struct EventPhase {
    /// ID of this GUI node.
    node_id: NodeId,
    /// Deterministic source of node IDs.
    node_id_source: Rc<NodeIdSource>,
    /// Position and size of all laid out node.
    layout: Rc<Layout>,
    /// Current position of the mouse.
    mouse: Vec2,
    /// Current event being handled, or `None` if a widget
    /// captured it.
    event: Option<Event>,
    // Snip.
}

impl Phase for EventPhase {
    fn rect(&mut self) -> Rect {
        self.layout.get(self.node_id)
    }

    fn mouse(&self) -> Vec2 {
        self.mouse
    }

    fn clicked(&self) -> bool {
        matches!(self.event, Some(Event::MouseButtonUp))
    }

    fn capture_click(&mut self) {
        if self.clicked() {
            self.event.take();
        }
    }

    fn nested(&mut self) -> Self {
        // Same as `RenderPhase`
    }
}
```

Note that this `EventPhase` only handles a single event. This contrasts with regular imGUI frameworks, which group together all the events of a given frame and handle them all at once (along with rendering that same frame).

## A practical example

Here's an example of using a library based on this pattern to make the traditional to-do app:

```rust
struct AppData {
    form_input: String,
    tasks: Vec<String>,
}

fn ui<C: Phase>(ctx: &mut C, data: &mut AppData) -> bool {
    let mut should_relayout = false;

    column(&mut ctx.nested(), |ctx| {
        // Title
        label(&mut ctx.nested(), "To-do");

        // Add task button
        row(&mut ctx.nested(), |ctx| {
            text_input(&mut ctx.nested(), &mut data.form_input);

            if button(&mut ctx.nested(), "Add task") {
                let task = std::mem::take(data.form_input);
                data.tasks.push(task);
                should_relayout = true;
            }
        });

        // Task list
        let mut to_remove = None;
        for (i, task) in data.tasks.iter().enumerate() {
            row(&mut ctx.nested(), |ctx| {
                label(&mut ctx.nested(), task);

                if button(&mut ctx.nested(), "❌") {
                    to_remove = Some(i);
                }
            });
        }
        if let Some(i) = to_remove {
            data.tasks.remove(i);
            should_relayout = true;
        }
    });

    should_relayout
}
```

The function `ui` can now be used to layout, render and handle events. In particular, I introduced a `should_relayout` boolean return value, which can be used to signal that the data has changed and the layout needs to be recomputed. We could use it as follows:

```rust
let should_relayout = ui(&mut EventPhase::new(...), &mut data);
if should_relayout {
    ui(&mut LayoutPhase::new(...), &mut data);
}
```

In a real GUI library, I'd probably add a method `signal_layout_change` in `Phase`.

There's still lots of room for improvement, but I like the general feel of this API. It's direct and imperative, very much like an imGUI, which I personally find quite intuitive to use. However, it has the `column` and `row` layouting widgets we expect from retGUI libraries, and in theory at least it can be made more efficient than an imGUI.

That being said, there is a major pitfall with this pattern: since we write code as a single function that gets split three ways and executed differently, it's possible to write code that fails in non-obvious ways.

For example, if your layouting phase does things that depend on `ctx.rect()`, you're in for a bad time, since the rect is not yet available during layouting. A solution to that problem would be to make `ctx.rect()` return `Option<Rect>`, but this comes at the cost of a worse API.

Another example is if you do non-deterministic stuff inside a widget, which might lead to discrepancies in the GUI tree between the layouting and subsequent phases.

This is definitely a leaky abstraction, and more experiments are needed for me to better understand what this pattern's practical strengths and limitations are.
