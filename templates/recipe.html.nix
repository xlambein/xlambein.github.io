{
  title,
  content,
  servings ? null,
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
  </article>
''
