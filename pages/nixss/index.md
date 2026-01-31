---
pubdate: 2026-01-01
tags:
  - nix
# fediverse: https://sunny.garden/@xavier/
---

# nixss, a Nix library for building static websites

I made a library for building static websites with Nix. The target audience is people who already know Nix, and want a lot of control over their static site. For example:

- You want a structure which isn't provided easily by one of the many static site generators out there.
- Your site has weird/custom build steps (think transforming images, or building a single-page application as part of your site).
- You have complex templating needs that require a fully-fledged programming language to do sanely.

`nixss` isn't a static site _generator_---rather, it's a library that gives you the tools to make your own. Because of this, it won't force you into a specific structure, but it also won't hold your hand.

Using Nix as the configuration language for your static site means anything Nix can build could be a dependency for your website. For example, this site uses [ImageMagick][magick] to convert my SVG logo into PNGs of various sizes. It's just another Nix derivation, included in the build. Another example: I have [a page](/phrase-generator) which is an Elm web app. Again, there's a plain old Nix derivation to build the app, which gets bundled with the rest of my website.

Using a general-purpose language also means you can write arbitrarily complex logic to generate pages. For example, I have a bunch of recipes in a folder, each one with a tag ("breakfast", "main", etc.). The Nix derivation for the [/recipes](/recipes) page of my website takes all the recipes in the folder, groups them by tag, sorts them alphabetically, and then passes them to an index page template.

I also use Nix as a templating language, rather than something like [Mustache][mustache]. Having a single language simplifies things a lot, and Nix actually works surprisingly well for the job. For example, this is the template for the recipes index page:

```nixt
# Recipes

${foreach groups ({title, pages}: ''
## ${title}

${foreach pages ({title, url}: ''
- [${title}](${escape url})
'')}
'')}
```

Just imagine that the whole text of this file is wrapped in something like:

```nix
let
  env = {
    foreach = /*...*/;
    escape = /*...*/;
    /* etc. */
  };
in
  with env ''[THE FILE'S TEXT]''
```

Anyway, if you're interested, the library is available [on Codeberg][nixss], along with docs and a tutorial. As a concrete example, you may also want to take a look at [the `nixss` source code for this very website][lambein.xyz source].

## Preamble

Let's say you want to make a static website (for example, the one you're reading right now). You have a bunch of Markdown files, which you want to convert to HTML. There's also some static assets to copy into various places.

You could use one of the many existing static site generators out there, but you're opinionated. You want to do a bit more work, in exchange for some added flexibility.

The simplest possible static site is a unique page, `index.md`, which we want to turn into an `index.html`. For that, we can use the excellent [Pandoc][pandoc]:

```bash
pandoc --self-contained src/index.md out/index.html
```

Pandoc has [many options][pandoc manual] to choose from in order to tune this conversion to your exact taste. This is exactly what we want: a powerful tool that gives us the flexibility we're after.

Of course, your site will have many more files. Some we'll want to convert, some we'll only copy. Maybe we'll have several steps to these conversions, for example if we use a templating system or if we wanna combine multiple documents together.

If we stop to think about it, a static site generator is a build system: a program that orchestrates a directed graph of operations required to build some output. In this case, the output is a bunch of files that constitute a website.

To those comfortable with UNIX tools, `make` might be the simplest build system out there. If like me you find `make` scary, perhaps you'll want to use [`just`][just]---although it's not a build system---or even a simple `bash` script. Regardless, you might end up with something like this:

```make
all: output/index.html output/about.html

output/%.html: pages/%.md
    pandoc --self-contained $^ -o $@
```

I haven't tried this option very far. My impression is that it would work, but it would be annoying to scale and hard to get right. There are reasons `make` has lost a lot of turf to newer build systems.

Now, if you're comfortable with a programming language, I think you'd get better results writing a build script for your website with it. For example, in JavaScript, you could use [zx][zx] or [dax][dax] and write something like:

```js
#!/usr/bin/env -S deno run --allow-all
import $ from "@david/dax";

async function pandoc(input, output) {
  await $`pandoc --self-contained ${input} -o ${output}`
}

const mdFiles = await $`cd pages ; find -name '*.md'`.lines()
for (const file of mdFiles) {
  await pandoc(file, `output/${file}`.replace(/\.md$/, '.html'))
}
```

I would take this over `make` any day. Of course, this isn't a real build system, but I'm sure that with some extra libraries we can end up with something that caches results, collects garbage, and will work reliably.

For a while this is roughly what I had---albeit scrappier and in Rust---as the build system for my website. But why make a new build system when you can reuse an existing one?

## Introducing `nixss`

`nixss` (pronounced "nix" like you're a snake) is a library for the Nix programming language and build system, designed to help you build a static website.

In Nix, every build target is a derivation. A derivation is a set of inputs (i.e., files or other derivations) with a command to execute, and it outputs new files and directories. Nix makes it seamless to compose such derivations so your don't have to worry about caching and cleanup. It also builds them hermetically to ensure the result is reproducible.

What `nixss` provides is a library of functions to build derivations that represent pages and folders of a static site. Your whole site is a single derivation, composed of many others, themselves based on the source files you have on disk.

To begin, here's the example from earlier, written with `nixss`:

```nix
{nixss}: let
  inherit (nixss) util pandoc;

  pages = util.mapDirectory
    (pandoc.process (util.replaceExt "md" "html") {})
    ./pages;
in
  util.directory {
    filename = "www";
    src = pages;
  }
```

Let's break it down. We begin by importing `nixss` as an input to this Nix file, and we put its `util` and `pandoc` modules in the namespace.

```nix
{nixss}: let
  inherit (nixss) util pandoc;
```

Then, we use the `util.mapDirectory` function, which goes over each file in a directory and applies a function to it, returning a list.

```nix
  pages = util.mapDirectory
    (/* ... */)
    ./pages;
```

The function we apply is `pandoc.process`, which calls the `pandoc` CLI on its input file. It takes three arguments: an output filename, a set of `pandoc` CLI arguments, and the input filename (which is provided implicitly by `mapDirectory`).

```nix
    (pandoc.process (util.replaceExt "md" "html") {})
```

We don't have any CLI args, so we pass `{}`. And instead of a filename, we pass a function `util.replaceExt`. `pandoc.process` will use this to name the output based on the name of the input file, replacing the `.md` extension with `.html`.

The result of the `util.mapDirectory` is a list of pages, which we pass to a final function, `util.directory`, that takes a list of files, a name, and produces a folder with that name which contains all these files. This is our website.

```nix
  util.directory {
    filename = "www";
    src = pages;
  }
```


[nixss]: https://codeberg.org/xlambein/nixss
[lambein.xyz source]: https://github.com/xlambein/xlambein.github.io
[magick]: https://imagemagick.org/
[mustache]: https://mustache.github.io/
[pandoc]: https://pandoc.org/
[pandoc manual]: https://pandoc.org/MANUAL.html
[just]: https://just.systems/
[zx]: https://github.com/google/zx
[dax]: https://github.com/dsherret/dax
