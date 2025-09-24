---
template: page
pubdate: 2025-09-24
tags:
  - nixos
  - self-hosting
fediverse: https://sunny.garden/@xavier/115261062001197783
---

# My home media server is suspended most of the time

I thought I'd write about my home media server, since I have a peculiar setup I haven't seen elsewhere.

I have an old desktop computer, which used to be my main PC before I got to university and switched to using laptops. So, it's pretty old, but it still works well. After I got into NixOS, I decided I wanted to own a NAS, and maybe self-host some services on it. I quickly settled on using that old computer for it. I set it up with a couple of 4TB HDDs in RAID for data, and a 512GB SSD for the OS. I named the machine `theseus`.

To give you an idea of what I use it for, here's some of the services I have on it:

- [Jellyfin](https://jellyfin.org/), a media server, which my partner and I use to watch movies and TV shows on our TV
- [Immich](https://immich.app/), a photo server, which stores the photos I took with my phone
- [Navidrome](https://www.navidrome.org/), a music server, which I use mostly with [Symphonium](https://symfonium.app/) on my phone to listen to music on the go
- [Transmisson](https://transmissionbt.com/), a BitTorrent client, which we use to download _public domain content_
- [Borg](https://www.borgbackup.org/), a backup service, where `theseus` acts both as a server (backing up my laptop) and a client (backing up some of its data to the cloud)

## Wake up Jack

A problem with `theseus` is that it's a bit old and loud. It uses more electricity than I'd like, and the noise can be annoying. Furthermore, we don't actually need it to be running 24/7, since it's mostly there to store various kinds of data.

The solution I settled with is relies on WOL (wake-on-LAN), autosuspend, and a Raspberry Pi acting as reverse proxy.

The Raspberry Pi, an old model I had gathering dust in a drawer, now runs an Nginx reverse proxy that forwards traffic to `theseus`. I named it `girlboss`. So, if you browse `http://<GIRLBOSS URL>:8096`, `girlboss` will forward you to `http://<THESEUS URL>:8096`, which hosts Jellyfin.

Most of the time, `theseus` is asleep, and so the request quickly times out. However, instead of failing, `girlboss` detects this and sends a WOL packet. Wake-on-LAN is a mechanism you can use to---you guessed it---wake another computer in the same local area network. `theseus` and `girlboss` are on the same network, so the packet reaches the former and wakes it.

At this point, `girlboss` is still serving the HTTP request, waiting a few seconds for `theseus` to come online. When it does, the request is properly forwarded, and I see Jellyfin appear on my browser. Further requests are answered immediately, since `theseus` is no longer suspended.

I'd like for `theseus` to go back to sleep when I'm done with it. For this, I use [autosuspend](https://autosuspend.readthedocs.io/en/v9.0.0/), a Python daemon that automatically suspends (and wakes up) a computer. Most importantly, it lets you specify conditions under which a system should _not_ suspend---for example, if there's an active network connection on a given port, or if a user is logged in.

I have configured autosuspend to keep `theseus` running whenever:

- one of the web services has an active HTTP connection;
- someone is using Samba to access files on it;
- Transmisson is downloading;
- a Borg backup is running;
- someone is connected via SSH.

Otherwise, it'll stay on for a couple of minutes, and then go to sleep.

The result is that most of the time, this computer is suspended, using less electricity, and is completely silent. Whenever we actually need it, the server comes alive, and then eventually goes back into suspension. Technically, I could even have it shutdown automatically, since WOL also works for machines that are completely off, but of course waking up from that takes more time.

## Downside: nothing is built for this

There are definite drawbacks to this setup, mostly due to the fact that applications expect everything to be always on.

For example, Symphonium, the Android music player I use with Navidrome, regularly does a health check to make sure the server is still reachable. This request is not long enough to keep `theseus` on, so it automatically suspends after a couple of minutes, only to be woken back when the next health check comes in, a few seconds later. This only occurs when actively using Symphonium, but it's still quite annoying.

Another issue is that the Jellyfin app on our TV has a built-in timeout that is quite short. When it cannot reach the server after a couple of seconds, it gives up, requiring us to try again once `theseus` is done waking up.

Still, I'm quite happy with this. We've been using this server for well over two years, and for us the benefits far outweigh the drawbacks.

## How it's done done done

Of course, everything is configured with NixOS. I wouldn't administer a Linux machine without it. The full code is in [my NixOS repo](https://codeberg.org/xlambein/nixos).

The core WOL mechanism on `girlboss` is implemented in a [`mkWol` function](https://codeberg.org/xlambein/nixos/src/commit/44dff16e61b711dc4a6ed3262965b3295c744d1f/machines/girlboss/mkWol.nix) which patches a given Nginx virtualhost to send the WOL packet and wait whenever there's a timeout. [Here's an example](https://codeberg.org/xlambein/nixos/src/commit/44dff16e61b711dc4a6ed3262965b3295c744d1f/machines/girlboss/jellyfin.nix#L23) of how I use it with Jellyfin. It acts as wrapper around an otherwise normal virtualhost, making it very easy to slap on top of an existing Nginx config. The actual logic to send the WOL package is written in Lua, so [make sure you use OpenResty](https://codeberg.org/xlambein/nixos/src/commit/44dff16e61b711dc4a6ed3262965b3295c744d1f/machines/girlboss/nginx.nix#L11) instead of vanilla Nginx.

The only thing to do on `theseus` is [enable wake-on-LAN](https://codeberg.org/xlambein/nixos/src/commit/44dff16e61b711dc4a6ed3262965b3295c744d1f/machines/theseus/default.nix#L54). However, you also need to set up autosuspend. For that, I have [a global config](https://codeberg.org/xlambein/nixos/src/commit/44dff16e61b711dc4a6ed3262965b3295c744d1f/machines/theseus/autosuspend.nix) where I specify things like wait 2 minutes before sleep, or stay on when there's an SSH connection. And then, for each service, I have additional checks written alongside the configuration of the service itself. For example, [this file is my whole Jellyfin config](https://codeberg.org/xlambein/nixos/src/commit/44dff16e61b711dc4a6ed3262965b3295c744d1f/machines/theseus/jellyfin.nix), which sets up that service, and adds an autosuspend check on port 8096. This means, if I ever remove a service, it also removes the autosuspend check associated with it.

## Other notes

I use [Tailscale](https://tailscale.com/) to access `girlboss` and `theseus` whenever I'm outside of my home network. Honestly, it's a bit magic. I just wish they would [add support for custom subdomains](https://github.com/tailscale/tailscale/issues/1543).

Originally I set up [Avahi](https://avahi.org/) to let us access services through custom domains names like `jellyfin.local`. Unfortunately, it only works in the LAN, and it's not supported on most devices. My partner still uses them on their laptop, but that's it.

Since autosuspend can also schedule wake-ups, I configured it to wake `theseus` at 2AM every day to run backups. You can sync it with a systemd timer, it works quite well.

If one day I have enough motivation, I will replace my router with a custom one managed with NixOS, in which case I'll be able to put the reverse proxy there and retire `girlboss`.
