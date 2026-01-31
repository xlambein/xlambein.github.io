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
  booksByYear = lib.sort (a: b: builtins.lessThan b.year a.year) (lib.mapAttrsToList (year: books: {inherit year books;}) (lib.groupBy ({readDate, ...}: builtins.head (builtins.split "-" readDate)) books));

  index = processFile ((nixss.wrap ./index.md.nxt).withMetadata {
    inherit booksByYear;
  });
in
  nixss.directory {
    filename = "books";
    src = [index];
    metadata.title = "Books";
  }
