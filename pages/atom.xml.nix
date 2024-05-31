{
  projects,
  foreach,
  escape,
}: let
  domain = "lambein.xyz";
  root = "https://${domain}";
  toDatetime = date: "${date}T00:00:00Z";
  urlToAbsolute = url:
    if builtins.match "^http.*" url == null
    then "${root}/${url}"
    else url;
  makeId = url: pubdate:
    if builtins.match "^http.*" url == null
    then "tag:${domain},${pubdate}:/${url}"
    else url;
in ''
  <?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">

    <title>Xavier Lambein's website</title>
    <link href="${root}" />
    <updated>${toDatetime (builtins.head projects).pubdate}</updated>
    <author>
      <name>Xavier Lambein</name>
    </author>
    <id>${root}</id>
    <icon>/assets/img/favicon.png</icon>
    ${foreach projects (project:
    with project; ''
      ''\
        <entry>
          <title>${escape title}</title>
          <link href="${urlToAbsolute url}" />
          <id>${makeId url pubdate}</id>
          <updated>${toDatetime pubdate}</updated>
        </entry>
    '')}
  </feed>
''
