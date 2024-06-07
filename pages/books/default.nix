{
  nixss,
  processFile,
  ...
}: let
  author = olid: with builtins; fromJSON (readFile (fetchurl "https://openlibrary.org/authors/${olid}.json"));
  book = isbn:
    with builtins; let
      data = fromJSON (readFile (fetchurl "https://openlibrary.org/isbn/${isbn}.json"));
    in {
      inherit (data) title;
      inherit isbn;
      authors = map ({key}: let
        olid = head (match "/authors/(OL.+)" key);
      in
        (author olid).name)
      data.authors;
    };

  booksSrc = (builtins.fromTOML (builtins.readFile ./books.toml)).book;
  books = map ({isbn, ...} @ b: (book isbn) // b) booksSrc;

  index = processFile ((nixss.util.wrap ./index.md.nxt).withMetadata {
    inherit books;
  });
in
  nixss.util.directory {
    filename = "books";
    src = [index];
    metadata.title = "Books";
  }
