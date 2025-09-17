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

      <div class="article-info">
        Scale ingredients:
        <label><input type="radio" name="scale" onclick="javascript:scaleAll(1)" checked />1</label>
        <label><input type="radio" name="scale" onclick="javascript:scaleAll(2)" />2</label>
        <label><input type="radio" name="scale" onclick="javascript:scaleAll(3)" />3</label>
        <label><input type="radio" name="scale" onclick="javascript:scaleAll(4)" />4</label>
      </div>
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

  <script>
    const reQuantity = /^\d+(?:\/\d+)?/d;

    function gcd(a, b) {
      a = Math.abs(a);
      b = Math.abs(b);
      if (b > a) {const temp = a; a = b; b = temp;}
      while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
      }
    }

    function scale(text, factor) {
      const match = reQuantity.exec(text);
      if (match === null) return;

      const quantity = match[0];

      let scaled;
      if (Number.isNaN(+quantity)) {
        let [n, d] = quantity.split("/");
        n = +n * factor;
        d = +d;
        const g = gcd(n, d);
        n = n / g;
        d = d / g;
        scaled = "" + n;
        if (d != 1) scaled = scaled + "/" + d
      } else {
        scaled = "" + (factor * (+quantity));
      }

      return scaled + text.substr(quantity.length);
    }

    const lis = document.querySelector("article").querySelectorAll("ul>li");

    function prepareForScale() {
      for (const li of lis) {
        li.setAttribute("data-text", li.textContent);
      }
    }

    prepareForScale();

    function scaleLi(li, factor) {
      const text = li.getAttribute("data-text");
      const scaled = scale(text, factor);
      if (scaled === undefined) return;
      li.textContent = scaled;
    }

    function scaleAll(factor) {
      for (const li of lis) scaleLi(li, factor);
    }
  </script>
''
