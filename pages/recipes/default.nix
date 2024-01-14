{
  nixss,
  processFile,
  ...
}: let
  recipePaths =
    builtins.filter
    (path: nixss.util.getExt path == "md")
    (builtins.map (filename: ./${filename}) (builtins.attrNames (builtins.readDir ./.)));
  pageToDirectory = page:
    nixss.util.directoryWithIndex {
      filename = nixss.util.removeExt "html" page.name;
      src = [(page.rename "index.html")];
    };
  recipes =
    builtins.map
    pageToDirectory
    (builtins.map (
        path:
          processFile ((nixss.util.wrap path).withMetadata {
            template = "recipe";
          })
      )
      recipePaths);
  recipesByFirstTag = builtins.groupBy (recipe: builtins.head recipe.metadata.tags) recipes;
  group = title: pages: {
    inherit title;
    pages =
      builtins.map (page: {
        title = page.metadata.title;
        url = page.name;
      })
      pages;
  };
  groups = [
    (group "Breakfasts & Snacks" recipesByFirstTag.breakfast)
    (group "Sides & Small Dishes" recipesByFirstTag.side)
    (group "Drinks" recipesByFirstTag.drink)
    (group "Soups" recipesByFirstTag.soup)
    (group "Main Courses" recipesByFirstTag.main)
  ];
  index = processFile ((nixss.util.wrap ./index.md.nxt).withMetadata {
    inherit groups;
  });
in
  nixss.util.directory {
    filename = "recipes";
    src = recipes ++ [index];
    metadata.title = "Recipes";
  }
