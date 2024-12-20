{
  title,
  content,
  servings ? null,
  sources ? [],
  escape,
  foreach,
  ifdef,
}: ''
  <article>
    <header>
      <h1>${title}</h1>

      ${
    if servings != null
    then ''
      <div class="article-info">
        ${ifdef servings ''Serves ${servings}.''}
      </div>
    ''
    else ""
  }
    </header>

    ${content}

    ${
    if sources != []
    then ''
      <h1>Sources</h1>
      <ul>
        ${foreach sources (source: ''<li><a href="${source}">${source}</a></li>'')}
      </ul>
    ''
    else ""
  }

  </article>
''
