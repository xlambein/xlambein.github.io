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

      <div class="article-info">
        ${ifdef pubdate ''<time class="pubdate">${pubdate}</time>''}
        <ul class="tags">${foreach tags (tag: ''<li>${escape tag}</li>'')}</ul>
      </div>
    </header>

    ${content}
  </article>
''
