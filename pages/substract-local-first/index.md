---
template: page
pubdate: 2026-09-15
tags:
  - idea
  - local-first
fediverse: https://sunny.garden/@xavier/117276353730061065
---

# Substract: ideas for a personal, local-first database 

I'm currently brainstorming/prototyping "Substract",[^1] a [triple store](https://en.wikipedia.org/wiki/Triplestore) [CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) to build personal, [local-first](https://www.inkandswitch.com/essay/local-first/) software. The ideas here aren't particularly original; this is just my own re-packaging of things I've been interested in for a while.

This blogpost gives an overview of how Substract works, or rather, how it will work. The project is only partly implemented, and subject to change. Feedback is very much welcome!

Long-term, I hope to use this to store my music collection, ebooks, RSS feeds, flash cards, task lists, guitar tabs I'm learning, and anything else I see fit.

## The facts store

Substract is a store of "facts", which are triples`(entity, attribute, value)`. If you're familiar with [Datomic](https://docs.datomic.com/client-tutorial/read.html#query) or [Datascript](https://github.com/tonsky/datascript#usage-examples), it's basically the same.

For example, here we have 6 facts in JSON notation. They all refer to the same (implicit) entity:

```json
{
	"track/title": "Galaxies",
	"track/artist": "Laura Veirs",
	"track/played": 1234,
	"track/rating": 5,
	"track/last-played": "2026-09-14T22:01:42",
	"track/file": "blob:13d6936411b5559e76739de18c922a080bb38ce6"
}
```

Concretely, the store is a log of operations:

- `insert(entity, attribute, value)`,
- `retract(entity, attribute, value)`,
- `clear(entity, attribute)` and
- `delete(entity)`.[^2]

A fact is present in the store iff the log has an `insert` for it, and has no corresponding `retract`, `clear`, or `delete` more recent than the `insert`.

Values are scalars: strings, integers, floats, booleans, or byte strings. More complex data is stored off-band, see "extensions" below.

The store is a CRDT: each actor writes to their log locally, and shares their updates with other actors. It uses a [hybrid logical clock](https://adamwulf.me/2021/05/distributed-clocks-and-crdts/) to determine which operation is most recent.

## Queries

You can query the Substract store similarly to Datomic, by matching components of the triples. For example (in pseudo-code):

```
find
  ?title, ?file
where
  [?track "track/title" ?title]
  fuzzy-match(?title, "predatory wasp")
  [?track "track/file" ?file]
```

where `?foo` is a variable, `[x y z]` matches a triple, and `bar(...)` is a custom predicate. The query above finds the title and file for each track whose title fuzzy matches "predatory wasp".

By default, queries will only consider the latest value in the log for a given attribute. This means a second insert to an entity+attribute will effectively replace the previous value, and retracting that insert will clear the attribute. This is usually what we want: if two concurrent actors change the title of a song, the song shouldn't end up with two titles.

Some attributes may actually accept multiple values. For example, tracks can have more than one artist. Here the semantics are reversed: if one actor inserts an artist name, and another actor inserts a different name, they should both be kept. Similarly, retracting one of these inserts will not clear the value.

We specify at query time whether we want, for a given attribute, a single value (default) or multiple values.

## Extensions

Substract allows for extensions that define new data types, which are stored off-band in separate stores.

In the JSON example earlier, we have a fact `"track/file": "blob:13d69364..."`. The value here is an ID that points to the "blob" store, a content-addressed store of arbitrary bytes. This is where you'd put things like music files, PDFs, ePubs, images, and so on.

Extensions register a name—in this case, `blob`—and a method for reading, writing, and synchronizing with peers. For blobs, it simply allows adding a new blob, and replicating it to peers that want it.

Another example is the `automerge` extension, which lets you store an [Automerge](https://automerge.org/) document off-band. It implements the usual Automerge operations and synchronization protocol.

## Synchronization

A user of Substract stores their data across multiple devices—this is the point. For example: a laptop, a phone, an ebook reader, and a relay server. The relay server acts as a bridge between devices, allowing them to synchronize without needing to be online at the same time. It also doubles as a backup.

Apps synchronize only the data that they need, by way of synchronization queries. For example, my ebook reader has no need for a music collection. It would use a synchronization query such as:

```
synchronize
	[?e *]
where
	[?e "collection" "books"]
```

Meaning, "synchronize all attributes (and their values) of entities whose collection is books". This query is sent to a peer (in practice, the relay server) when starting synchronization with them.

Similarly, my phone has space to store all my music metadata, but not the whole collection of FLACs and MP3s. I only want to synchronize the files for my liked songs, and stream the rest from the relay server as needed. For this, I can use a query like:

```
synchronize
	[?e ?a]
where
	[?e "collection" "music"]
	not-equal(?a, "track/file")
	
synchronize
	[?e *]
where
	[?e "collection" "music"]
	[?e "track/liked" true]
```

## Why not \[alternative\]?

I've been building local-first personal apps for a few years. Most of them need a database of sorts, and I was not happy with my options. Here are some alternatives I rejected:

**Just use the file system with e.g., [Syncthing](https://syncthing.net/).** The file system doesn't really work as a CRDT database. If you put a SQLite file in Syncthing, concurrent edits will overwrite _the whole database_. Syncthing, if you think of it as a CRDT, is quite a _coarse_ one, because the file system is essentially just a nested map of raw bytes, and fully ignores the structure of these bytes.[^3]

**[Automerge(-repo)](https://automerge.org/).** This is what I've used so far, and it works well enough, but I find the split into documents cumbersome. A document must reside fully in memory to be worked with and receive sync updates. They can grow so big that they take a long time to load and use up a lot of memory. It's often not clear in advance where you should split your data into smaller documents.

Overall the problem is that Automerge gives you documents, and I want a database. Still, Automerge is powerful, it's good to have the option to use it—hence the extension.

**[CR-SQLite](https://github.com/vlcn-io/cr-sqlite).** This is a cool project, but I don't actually want a structured database. Substract uses a triple store to allow for a loose data model, which has a lot less guarantees, but is more flexible.

**[NextGraph](https://nextgraph.org/).** Another interesting project, and it's a source of inspiration for Substract. It's quite a bit larger and ambitious than Substract, and is going in different directions.

**[Solid](https://solidproject.org/).** Not local-first (yet). I also don't really enjoy using it. 😅

## Examples of using Substract

Some ideas of apps that I'd like to build with Substract.

**Music player.** Metadata (artists, title, personal rating, times played, etc.) is in the facts store, while the audio and the cover image are in blobs. When I add a new album via the app on my laptop, the metadata and cover images are scraped from the files and everything is imported into Substract. Playlists use Automerge arrays to order songs.

**eBook reader ([KOReader](https://koreader.rocks/) extension).** For this one I've got a prototype working already. Like the music player, book metadata (author, title, progress & finished state) are in the facts store, while the ePub and the cover image are in blobs. I love having the reading progress synchronized: I will read bits of a book on my eReader, and later continue on my phone while I'm in the tram or something.

**RSS tracker.** All the subscribed feeds and their articles are in the facts store, alongside their read status. If needed, the HTML pages can be stored as blobs, if you'd rather have them available offline. The feeds can be updated by the clients, or you could have a small CRON on a server that does it for you.

## What about multi-user support?

🤷🏻 Haven't thought about it too much yet. For now, Substract is a single-user, multi-device thing. If you share your store with someone else, they have full access. To ensure relay servers can be used by multiple users, they shard their store per-user. Privacy, encryption? Trust your relay server, sorry.

In the future, I do want to support encryption and sharing read/write access with other people, but this is hard to get right. Maybe I can implement Substract on top of [Willow](https://willowprotocol.org/). 🤔



[^1]: Yep, with two "s". I often misspell "subtract" as "substract" because of the French "soustraire", which makes it look like the word "substrate". I find the typo funny, so I used it as a name.

[^2]: There are three deletion operations because, in a CRDT, the intent is important to properly reconcile concurrent edits. `clear`ing each attribute of an entity is not the same intent as `delete`ing the entity altogether, in that if a concurrent edit with an older timestamp added a new attribute, it will be kept in the former case, but dropped in the latter.

[^3]: I actually considered making a crude JSON CRDT using a "last-write-wins" file syncing service like Syncthing. To store a JSON document, you explode it such that each object/array is a folder where file lnames are the keys/indices, and the file contents are the JSON value. Recurse for nested object/arrays. It's a fun idea, but not a viable solution.
