{
  nixss,
  processFile,
  lib,
  ...
}:
with builtins; let
  process = path: let
    text' = readFile path;
    matches = builtins.elemAt (builtins.split "<h1>(.+)</h1>(.+)" text') 1;
    title = builtins.elemAt matches 0;
    text = builtins.elemAt matches 1;
  in
    nixss.util.text {
      filename = nixss.util.removeExt "html" (nixss.util.filenameOf path);
      inherit text;
      metadata = {inherit title;};
    };

  poemPaths =
    filter
    (path: nixss.util.getExt path == "html")
    (map (filename: ./${filename}) (attrNames (readDir ./.)));
  poems = lib.reverseList (map process poemPaths);

  index = processFile ((nixss.util.wrap ./index.md.nxt).withMetadata {
    poems =
      map (poem: {
        id = elemAt (split "[[:digit:]]+-" poem.filename) 2;
        title = poem.metadata.title;
        text = poem.text;
      })
      poems;
  });
in
  nixss.util.directory {
    filename = "poems";
    src = [index];
    metadata.title = "Poems";
  }
