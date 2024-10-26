{
  nixss,
  lib,
  processFile,
  ...
}: let
  ol = with builtins; fromJSON (readFile ./openlibrary.json);
  book = isbn: let
    data = ol.books.${isbn};
  in {
    inherit (data) title;
    inherit isbn;
    authors = map ({key}: ol.authors.${key}) data.authors;
  };

  booksSrc = (builtins.fromTOML (builtins.readFile ./books.toml)).book;
  books = lib.reverseList (map ({isbn, ...} @ b: (book isbn) // b) booksSrc);

  index = processFile ((nixss.util.wrap ./index.md.nxt).withMetadata {
    inherit books;
  });
in
  nixss.util.directory {
    filename = "books";
    src = [index];
    metadata.title = "Books";
  }
