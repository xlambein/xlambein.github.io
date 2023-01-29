{
  lib,
  nixss,
  callPackage,
}: let
  nixtEnv = final: prev: {
    figure = src: caption: let
      caption' =
        if caption != ""
        then "<figcaption>${caption}</figcaption>"
        else "";
    in ''<figure><img src="${src}">${caption'}</figure>'';
  };

  assetExts = ["css" "gif" "jpg" "pdf" "png" "svg"];

  md2html = nixss.pandoc.process {
    # TODO: +implicit_figures, which makes [caption](image.png) into a figure
    # TODO: +link_attributes, which allows [foo](bar.html){#id .class width=50%}
    # TODO: +emoji for :emojis:
    from = "gfm+smart";
    to = "html";
    shift-heading-level-by = -1;
    wrap = "preserve";
  } (nixss.util.replaceExt "md" "html");

  renderInTemplate = nixss.template.instantiate ./templates/base.html.nix {};

  tidyHtml = nixss.html-tidy.process {
    indent = "auto";
    wrap = "80";
    # forkawesome uses empty elements for icons, so we need to keep those
    drop-empty-elements = "no";
  };

  processProjectFile =
    nixss.util.mapExt
    (path:
      if lib.pathIsDirectory path
      then processProjectDir path
      else if builtins.elem (nixss.util.getExt path) assetExts
      then path
      else null)
    {
      "nxt" = nixss.util.chain [
        (nixss.nixt.process nixtEnv)
        processProjectFile
      ];
      "md" = nixss.util.chain [
        md2html
        processProjectFile
      ];
      "html" = nixss.util.chain [
        renderInTemplate
        tidyHtml
      ];
    };

  processProjectDir = path:
    if lib.pathIsDirectory path
    then
      if builtins.pathExists /${path}/default.nix
      then callPackage path {}
      else
        nixss.util.gather
        (builtins.baseNameOf path)
        (nixss.util.processDirectory processProjectFile path)
    else null;

  pages = nixss.util.processDirectory processProjectDir ./pages;

  externalProjects = [
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
  ];

  localProjects =
    builtins.map
    (drv: {
      title = drv.metadata.title or drv.name or drv;
      url = drv.name;
      pubdate = drv.metadata.pubdate or "";
      tags = drv.metadata.tags or [];
    })
    (lib.filter (page: !(builtins.elem page.name ["about" "music"])) pages);

  # Projects sorted by pubdate
  projects =
    builtins.sort
    (l: r: l.pubdate or "" > r.pubdate or "")
    (localProjects ++ externalProjects);

  index = let
    src = (nixss.util.wrap ./pages/index.md.nxt).withMetadata {
      inherit projects;
    };
  in
    processProjectFile src;

  assets = nixss.util.wrap ./assets;
in
  nixss.util.gather "www" ([
      assets
      index
    ]
    ++ pages)
