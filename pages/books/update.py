#! /usr/bin/env nix-shell
#! nix-shell -i python3 -p python3Packages.requests python3Packages.toml

import requests
import json
import toml
import os
import sys

TOML_FILE = "books.toml"
OUTPUT_FILE = "openlibrary.json"


# Function to read the TOML file and extract ISBNs
def read_isbns(toml_file):
    data = toml.load(toml_file)
    return [book["isbn"] for book in data["book"]]


# Function to load existing data from JSON file
def load_existing_data(output_file):
    if os.path.exists(output_file):
        with open(output_file, "r") as f:
            return json.load(f)
    return {"books": {}, "authors": {}}


# Function to fetch book data from OpenLibrary API
def fetch_book_data(isbn):
    print(f"fetching book data for '{isbn}'", file=sys.stderr)
    url = f"https://openlibrary.org/isbn/{isbn}.json"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()


# Function to fetch author data from OpenLibrary API
def fetch_author_data(author_id):
    print(f"fetching book data for '{author_id}'", file=sys.stderr)
    url = f"https://openlibrary.org{author_id}.json"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()["name"]


# Main function to fetch and merge data
def fetch_books_and_authors():
    # Load existing data
    existing_data = load_existing_data(OUTPUT_FILE)
    existing_books = existing_data["books"]
    existing_authors = existing_data["authors"]

    # Read ISBNs from the TOML file
    isbns = read_isbns(TOML_FILE)
    new_books = {}
    new_authors = {}

    for isbn in isbns:
        if isbn not in existing_books:
            # Fetch book data
            book_data = fetch_book_data(isbn)
            if book_data:
                new_books[isbn] = {
                    "title": book_data.get("title"),
                    "authors": book_data.get("authors"),
                    "number_of_pages": book_data.get("number_of_pages"),
                    "publish_date": book_data.get("publish_date"),
                }

                # Fetch author data
                for author in book_data.get("authors", []):
                    author_id = author["key"]
                    if author_id not in existing_authors:
                        author_name = fetch_author_data(author_id)
                        if author_name:
                            new_authors[author_id] = author_name

    # Merge existing and new data
    merged_books = {**existing_books, **new_books}
    merged_authors = {**existing_authors, **new_authors}

    # Save updated data to the JSON file
    with open(OUTPUT_FILE, "w") as f:
        json.dump({"books": merged_books, "authors": merged_authors}, f, indent=4)


if __name__ == "__main__":
    fetch_books_and_authors()
