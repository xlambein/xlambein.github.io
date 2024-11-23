// Source: https://github.com/dpecos/mastodon-comments
const styles = `
:root {
  --font-size: 1.0rem;
  --block-background-color: #fff1f1;
  --block-border-radius: 5px;
  --comment-indent: 20px;
}

#mastodon-stats {
  text-align: center;
  font-size: calc(var(--font-size) * 2)
}

#mastodon-comments-list {
  margin: 0 auto;
}

.mastodon-comment {
  background-color: var(--block-background-color);
  border-radius: var(--block-border-radius);
  border: var(--block-border-width) var(--block-border-color) solid;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  color: var(--font-color);
  font-size: var(--font-size);
  overflow: scroll;
}

.mastodon-comment p {
  margin-bottom: 0px;
}

.mastodon-comment .author {
  padding-top:0;
  display: flex;
  align-items: start;
}

.mastodon-comment .author a {
  text-decoration: none;
}

.mastodon-comment .author .avatar img {
  margin-right:1rem;
  min-width:60px;
  border-radius: 5px;
}

.mastodon-comment .author .details {
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.mastodon-comment .author .details-left {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.mastodon-comment .author .details .name {
  font-weight: bold;
}

.mastodon-comment .author .details .user {
  color: #5d686f;
  font-size: medium;
}

.mastodon-comment .author .details .date {
  font-size: small;
}

.mastodon-comment .content {
  margin-top: 15px;
}

.mastodon-comment .attachments {
}

.mastodon-comment .attachments > * {
  margin-top: 10px;
}

.mastodon-comment .attachments img {
  max-width: 100%;
}

.mastodon-comment .content p:first-child {
  margin-top:0;
  margin-bottom:0;
}

.mastodon-comment .status > div, #mastodon-stats > div {
  display: inline-block;
  margin-right: 15px;
}

.mastodon-comment .status a, #mastodon-stats a {
  color: #5d686f;
  text-decoration: none;
}

.mastodon-comment .status .replies.active a, #mastodon-stats .replies.active a {
  color: #003eaa;
}

.mastodon-comment .status .reblogs.active a, #mastodon-stats .reblogs.active a {
  color: #8c8dff;
}

.mastodon-comment .status .favourites.active a, #mastodon-stats .favourites.active a {
  color: #ca8f04;
}
`;

class MastodonComments extends HTMLElement {
  constructor() {
    super();

    this.host = this.getAttribute("host");
    this.user = this.getAttribute("user");
    this.tootId = this.getAttribute("toot-id");

    this.commentsLoaded = false;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = styles;
    document.head.appendChild(styleElem);
  }

  connectedCallback() {
    this.innerHTML = `
      <hr>
      <h1>Fediverse comments</h1>

      <noscript>
        <em>Enable JavaScript to view Fediverse comments</em>
        📪
      </noscript>

      <p>
        Use your Fediverse (e.g., Mastodon) account to 
        <a href="https://${this.host}/@${this.user}/${this.tootId}">
        <i class="fa fa-reply fa-fw"></i>
        comment on this post</a>.
      </p>
      
      <div id="mastodon-comments-list"></div>
    `;

    const comments = document.getElementById("mastodon-comments-list");
    const rootStyle = this.getAttribute("style");
    if (rootStyle) {
      comments.setAttribute("style", rootStyle);
    }
    this.respondToVisibility(comments, this.loadComments.bind(this));
  }

  escapeHtml(unsafe) {
    return (unsafe || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  user_account(account) {
    var result = `@${account.acct}`;
    if (account.acct.indexOf("@") === -1) {
      var domain = new URL(account.url);
      result += `@${domain.hostname}`;
    }
    return result;
  }

  render_toots(toots, in_reply_to, depth) {
    var tootsToRender = toots
      .filter((toot) => toot.in_reply_to_id === in_reply_to)
      .sort((a, b) => a.created_at.localeCompare(b.created_at));
    tootsToRender.forEach((toot) => this.render_toot(toots, toot, depth));
  }

  render_toot(toots, toot, depth) {
    toot.account.display_name = this.escapeHtml(toot.account.display_name);
    toot.account.emojis.forEach((emoji) => {
      toot.account.display_name = toot.account.display_name.replace(
        `:${emoji.shortcode}:`,
        `<img src="${this.escapeHtml(emoji.static_url)}" alt="Emoji ${
          emoji.shortcode
        }" height="20" width="20" />`,
      );
    });

    const mastodonComment = `<div class="mastodon-comment" style="margin-left: calc(var(--comment-indent) * ${depth})">
        <div class="author">
          <div class="avatar">
            <img src="${this.escapeHtml(
              toot.account.avatar_static,
            )}" height=60 width=60 alt="">
          </div>
          <div class="details">
            <div class="details-left">
              <a class="name" href="${toot.account.url}" rel="nofollow">${
                toot.account.display_name
              }</a>
              <a class="user" href="${
                toot.account.url
              }" rel="nofollow">${this.user_account(toot.account)}</a>
            </div>
            <a class="date" href="${
              toot.url
            }" rel="nofollow">${toot.created_at.substr(
              0,
              10,
            )} ${toot.created_at.substr(11, 8)}</a>
          </div>
        </div>
        <div class="content">${toot.content}</div>
        <div class="attachments">
          ${toot.media_attachments
            .map((attachment) => {
              if (attachment.type === "image") {
                return `<a href="${attachment.url}" rel="nofollow"><img src="${
                  attachment.preview_url
                }" alt="${this.escapeHtml(attachment.description)}" /></a>`;
              } else if (attachment.type === "video") {
                return `<video controls src="${attachment.url}" type="${attachment.mime_type}"></video>`;
              } else if (attachment.type === "gifv") {
                return `<video controls autoplay loop muted playsinline src="${attachment.url}" type="${attachment.mime_type}"></video>`;
              } else if (attachment.type === "audio") {
                return `<audio controls src="${attachment.url}" type="${attachment.mime_type}"></audio>`;
              } else {
                return `<a href="${attachment.url}" rel="nofollow">${attachment.type}</a>`;
              }
            })
            .join("")}
        </div>
      </div>`;

    var div = document.createElement("div");
    div.innerHTML =
      typeof DOMPurify !== "undefined"
        ? DOMPurify.sanitize(mastodonComment.trim())
        : mastodonComment.trim();
    document
      .getElementById("mastodon-comments-list")
      .appendChild(div.firstChild);

    this.render_toots(toots, toot.id, depth + 1);
  }

  loadComments() {
    if (this.commentsLoaded) return;

    document.getElementById("mastodon-comments-list").innerHTML =
      '<p class="no-comments"><em>Loading comments from the Fediverse...</em></p>';

    let _this = this;

    fetch(
      "https://" + this.host + "/api/v1/statuses/" + this.tootId + "/context",
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data["descendants"] &&
          Array.isArray(data["descendants"]) &&
          data["descendants"].length > 0
        ) {
          document.getElementById("mastodon-comments-list").innerHTML = "";
          _this.render_toots(data["descendants"], _this.tootId, 0);
        } else {
          document.getElementById("mastodon-comments-list").innerHTML =
            '<p class="no-comments"><em>Be the first to leave a comment</em> 😌</p>';
        }

        _this.commentsLoaded = true;
      });
  }

  respondToVisibility(element, callback) {
    var options = {
      root: null,
    };

    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          callback();
        }
      });
    }, options);

    observer.observe(element);
  }
}

customElements.define("mastodon-comments", MastodonComments);
