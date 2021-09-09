---
template: page
pubdate: 2021-01-04
tags:
  - game
  - web
  - rust
---

# Rust Against Humanity

A small web replica of the party game [Cards Against Humanity](https://www.cardsagainsthumanity.com).  It's mainly a learning project, to try and build a full-stack web app in Rust.  The backend is based on [warp](https://github.com/seanmonstar/warp), and the front-end is made with [Yew](https://yew.rs).  The two communicate via web sockets.

{{figure "rah-end-round.png"}}

It's been a fun project to make, but my general conclusion is that Yew is not a good framework for making games---it's really designed for web apps.  Baking web socket support back into it was a hassle, and I haven't figured out nice ways to handle game scenes or to render animations.

I haven't tested it online, but it works well on my local network.  The game is extremely rough on the edges, but all the essential features are here: you can join a game, select cards, play them, vote for an answer, and the score is tracked.  What's missing is stuff like end-game, keeping sessions between reload, instant messaging, and a good deal of design polish.

One of my favourite aspects of making a card game in Rust is that you can leverage the borrow checker to ensure that a card is never duplicated.  The deck owns all its cards, and when a player draws one, ownership is transferred to the player's hand.  After being played, a card is transferred to the discard pile.  With true linear types, we could further ensure that cards are never deleted, but afaik there's no way to support this at compile-time.

Another fun part of this project was writing the cards.  Many of them were taken directly from the original board game, but [Mandooks](https://mandooks.com) and I spent part of an evening coming up with original ones, mostly based on our friend group's inside jokes and references.  This made testing the game extremely funny.

As always, [source code is available on GitHub](https://github.com/xlambein/rust-against-humanity).

{{#figure "rah-player.png"}}
Card selection screen, for the players.
{{/figure}}

{{#figure "rah-czar.png"}}
Judgement screen, for the Card Czar.
{{/figure}}

