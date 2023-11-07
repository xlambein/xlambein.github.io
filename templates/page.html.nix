{
  title,
  content,
  pubdate ? null,
  tags ? [],
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
''
