{
  title,
  content,
  pubdate ? null,
  tags ? [],
  fediverse ? "",
  escape,
  foreach,
  ifdef,
}: ''
  <article>
    <header>
      <h1>${escape title}</h1>

      ${
    if tags != [] && pubdate != null
    then ''
      <div class="article-info">
        ${ifdef pubdate ''<time class="pubdate">${pubdate}</time>''}
        <ul class="tags">${foreach tags (tag: ''<li>${escape tag}</li>'')}</ul>
      </div>
    ''
    else ""
  }
    </header>

    ${content}
  </article>

  ${
    if fediverse == null
    then ""
    else
      with fediverse; ''
        <script type="module" src="/assets/js/mastodon-comments.js"></script>
        <mastodon-comments host="${host}" user="${user}" toot-id="${tootId}"></mastodon-comments>
      ''
  }
''
