{
  lib,
  nixss,
  callPackage,
  pandoc,
  runCommandLocal,
  librsvg,
}: let
  nixtEnv = final: prev: {
    figure = src: caption: let
      caption' =
        if caption != ""
        then "<figcaption>${caption}</figcaption>"
        else "";
    in ''<figure><img src="${src}">${caption'}</figure>'';
  };

  assetExts = ["css" "gif" "jpg" "pdf" "png" "svg" "webm"];

  md2html = nixss.pandoc.process {
    # TODO: +implicit_figures, which makes [caption](image.png) into a figure
    # TODO: +link_attributes, which allows [foo](bar.html){#id .class width=50%}
    # TODO: +emoji for :emojis:
    from = "gfm+smart";
    to = "html";
    shift-heading-level-by = -1;
    wrap = "preserve";
  } (nixss.util.replaceExt "md" "html");

  # Get the code highlight CSS from pandoc
  codeCss = let
    template = builtins.toFile "highlighting-css.template" "$highlighting-css$";
    sample = builtins.toFile "sample.md" ''
      ```rust
      fn main() {}
      ```
    '';
    css = runCommandLocal "code.css" {buildInputs = [pandoc];} ''
      pandoc --template=${template} ${sample} | grep 'code span' > $out
    '';
  in
    css;

  pngLogo = size: let
    w = builtins.toString size.w;
    h = builtins.toString size.h;
  in
    runCommandLocal "logo-${w}x${h}.png" {buildInputs = [librsvg];} ''
      rsvg-convert -w ${w} -h ${h} ${./assets/img/logo.svg} -o $out
    '';

  # Combine the assets directory with the code highlight CSS
  assets = nixss.util.derivation {
    filename = "assets";
    drv = runCommandLocal "assets" {} ''
      mkdir -p $out/{css,img}
      cp -drs ${./assets}/. $out
      ln -s ${codeCss} $out/css/code.css
      ln -s ${pngLogo {
        w = 32;
        h = 32;
      }} $out/img/favicon.png
      ln -s ${pngLogo {
        w = 200;
        h = 200;
      }} $out/img/logo.png
    '';
  };

  feed = nixss.template.process {inherit projects;} ./pages/atom.xml.nix;

  renderInTemplate = nixss.template.instantiate ./templates/base.html.nix {};

  tidyHtml = nixss.html-tidy.process {
    indent = "auto";
    wrap = "80";
    # forkawesome uses empty elements for icons, so we need to keep those
    drop-empty-elements = "no";
  };

  processFile =
    nixss.util.mapExt
    (path:
      # Process sub-directories, copy assets, ignore the rest
        if lib.pathIsDirectory path
        then processDir path
        else if builtins.elem (nixss.util.getExt path) assetExts
        then path
        else null)
    {
      "nxt" = nixss.util.chain [
        (nixss.nixt.process nixtEnv)
        processFile
      ];
      "md" = nixss.util.chain [
        md2html
        processFile
      ];
      "html" = nixss.util.chain [
        renderInTemplate
        tidyHtml
      ];
    };

  processDir = path:
    if lib.pathIsDirectory path
    then
      if builtins.pathExists /${path}/default.nix
      then callPackage path {inherit nixss processFile;}
      else
        nixss.util.directoryWithIndex {
          filename = builtins.baseNameOf path;
          src = nixss.util.mapDirectory processFile path;
        }
    else null;

  pages = nixss.util.mapDirectory processDir ./pages;

  remoteProjects = [
    {
      title = "Twit-Commit, a Git Commit-based Social Network";
      url = "https://github.com/xlambein/twit-commit";
      pubdate = "2019-07-14";
      tags = ["0$ idea" "bash"];
    }
    {
      title = "Typo Corrector";
      url = "https://github.com/xlambein/typo-corrector";
      pubdate = "2021-01-14";
      tags = ["1,000,000$ idea" "program" "rust"];
    }
    {
      title = "`temps`, a Minimalist CLI Time Tracker";
      url = "https://github.com/xlambein/temps";
      pubdate = "2021-09-16";
      tags = ["program" "rust"];
    }
    {
      title = "Huemility: Philips Hue Schedules for Dumb Homes";
      url = "https://codeberg.org/xlambein/huemility";
      pubdate = "2023-04-13";
      tags = ["program" "rust" "nix"];
    }
  ];

  localProjects =
    builtins.map
    (drv: {
      title = drv.metadata.title or drv.name or drv;
      url = drv.name;
      pubdate = drv.metadata.pubdate or "";
      tags = drv.metadata.tags or [];
    })
    (lib.filter (page: !(builtins.elem page.name ["about" "music" "recipes"])) pages);

  # Projects sorted by pubdate
  projects =
    builtins.sort
    (l: r: l.pubdate or "" > r.pubdate or "")
    (localProjects ++ remoteProjects);

  index = let
    src = (nixss.util.wrap ./pages/index.md.nxt).withMetadata {
      inherit projects;
    };
  in
    processFile src;
in
  nixss.util.directoryWithIndex {
    filename = "www";
    src =
      [
        assets
        index
        feed
        (nixss.util.text {
          filename = ".nojekyll";
          text = "";
        })
      ]
      ++ pages;
  }
