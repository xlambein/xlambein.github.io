{
  title ? null,
  description ? "",
  template ? "page",
  content,
  include,
  escape,
}: ''
  <!doctype html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <title>${
    if title == null
    then ""
    else ''${escape title} &mdash; ''
  }Xavier Lambein's website</title>
    <meta name="description" content="${description}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="/assets/img/favicon.png">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css"
      integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=" crossorigin="anonymous"
      as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css"
      integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=" crossorigin="anonymous"></noscript>
    <link rel="me" href="https://vis.social/@xlambein" />
  </head>

  <body>
    <nav>
      <a href="/" tabindex="-1" aria-hidden="true"><img src="/assets/img/logo.svg" width="61.2" height="61.2" alt="website logo" id="logo" aria-hidden="true" tabindex="-1"></a>
      <a href="/">Home</a>
      <a href="/about/">About</a>
      <a href="/music/">Music</a>
    </nav>
    ${
    if template != null
    then include ./${template}.html.nix
    else content
  }
  </body>

  </html>
''
