{
  nixss,
  processFile,
  ...
}: let
  recipePaths =
    builtins.filter
    (path: nixss.getExt path == "md")
    (builtins.map (filename: ./${filename}) (builtins.attrNames (builtins.readDir ./.)));
  pageToDirectory = page:
    nixss.directoryWithIndex {
      filename = nixss.removeExt "html" page.name;
      src = [(page.rename "index.html")];
    };
  recipes =
    builtins.map
    pageToDirectory
    (builtins.map (
        path:
          processFile ((nixss.wrap path).withMetadata {
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
  index = processFile ((nixss.wrap ./index.md.nxt).withMetadata {
    inherit groups;
  });
in
  nixss.directory {
    filename = "recipes";
    src = recipes ++ [index];
    metadata.title = "Recipes";
  }
