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
      <h2>Sources</h2>
      <ul>
        ${foreach sources (source: "<li>${source}</li>")}
      </ul>
    ''
    else ""
  }

  </article>
''
