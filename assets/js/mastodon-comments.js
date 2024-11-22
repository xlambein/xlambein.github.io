const styles=`
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
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  color: var(--font-color);
  font-size: var(--font-size);
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

.mastodon-comment .author .date {
  margin-left: auto;
  font-size: small;
}

.mastodon-comment .content {
  margin: 15px 0px 0px 0px;
}

.mastodon-comment .attachments {
}

.mastodon-comment .attachments > * {
  margin: 10px 0px 0px 0px;
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
`;class MastodonComments extends HTMLElement{constructor(){super(),this.host=this.getAttribute("host"),this.user=this.getAttribute("user"),this.tootId=this.getAttribute("toot-id"),this.commentsLoaded=!1;const t=document.createElement("style");t.innerHTML=styles,document.head.appendChild(t)}connectedCallback(){this.innerHTML=`
      <h2>Fediverse comments</h2>

      <noscript>
        <em>Enable JavaScript to view Fediverse comments</em>
        \u{1F4EA}
      </noscript>

      <p>
        Use your Fediverse (e.g., Mastodon) account to 
        <a href="https://${this.host}/@${this.user}/${this.tootId}">
        <i class="fa fa-reply fa-fw"></i>
        comment on this post</a>.
      </p>
      
      <div id="mastodon-comments-list"></div>
    `;const t=document.getElementById("mastodon-comments-list"),e=this.getAttribute("style");e&&t.setAttribute("style",e),this.respondToVisibility(t,this.loadComments.bind(this))}escapeHtml(t){return(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}user_account(t){var e=`@${t.acct}`;if(t.acct.indexOf("@")===-1){var n=new URL(t.url);e+=`@${n.hostname}`}return e}render_toots(t,e,n){var a=t.filter(s=>s.in_reply_to_id===e).sort((s,o)=>s.created_at.localeCompare(o.created_at));a.forEach(s=>this.render_toot(t,s,n))}render_toot(t,e,n){e.account.display_name=this.escapeHtml(e.account.display_name),e.account.emojis.forEach(o=>{e.account.display_name=e.account.display_name.replace(`:${o.shortcode}:`,`<img src="${this.escapeHtml(o.static_url)}" alt="Emoji ${o.shortcode}" height="20" width="20" />`)});const a=`<div class="mastodon-comment" style="margin-left: calc(var(--comment-indent) * ${n})">
        <div class="author">
          <div class="avatar">
            <img src="${this.escapeHtml(e.account.avatar_static)}" height=60 width=60 alt="">
          </div>
          <div class="details">
            <a class="name" href="${e.account.url}" rel="nofollow">${e.account.display_name}</a>
            <a class="user" href="${e.account.url}" rel="nofollow">${this.user_account(e.account)}</a>
          </div>
          <a class="date" href="${e.url}" rel="nofollow">${e.created_at.substr(0,10)} ${e.created_at.substr(11,8)}</a>
        </div>
        <div class="content">${e.content}</div>
        <div class="attachments">
          ${e.media_attachments.map(o=>o.type==="image"?`<a href="${o.url}" rel="nofollow"><img src="${o.preview_url}" alt="${this.escapeHtml(o.description)}" /></a>`:o.type==="video"?`<video controls src="${o.url}" type="${o.mime_type}"></video>`:o.type==="gifv"?`<video controls autoplay loop muted playsinline src="${o.url}" type="${o.mime_type}"></video>`:o.type==="audio"?`<audio controls src="${o.url}" type="${o.mime_type}"></audio>`:`<a href="${o.url}" rel="nofollow">${o.type}</a>`).join("")}
        </div>
      </div>`;var s=document.createElement("div");s.innerHTML=typeof DOMPurify<"u"?DOMPurify.sanitize(a.trim()):a.trim(),document.getElementById("mastodon-comments-list").appendChild(s.firstChild),this.render_toots(t,e.id,n+1)}loadComments(){if(this.commentsLoaded)return;document.getElementById("mastodon-comments-list").innerHTML='<p class="no-comments"><em>Loading comments from the Fediverse...</em></p>';let t=this;fetch("https://"+this.host+"/api/v1/statuses/"+this.tootId+"/context").then(e=>e.json()).then(e=>{e.descendants&&Array.isArray(e.descendants)&&e.descendants.length>0?(document.getElementById("mastodon-comments-list").innerHTML="",t.render_toots(e.descendants,t.tootId,0)):document.getElementById("mastodon-comments-list").innerHTML='<p class="no-comments"><em>Be the first to leave a comment</em> \u{1F60C}</p>',t.commentsLoaded=!0})}respondToVisibility(t,e){var n={root:null},a=new IntersectionObserver((s,o)=>{s.forEach(r=>{r.intersectionRatio>0&&e()})},n);a.observe(t)}}customElements.define("mastodon-comments",MastodonComments);
