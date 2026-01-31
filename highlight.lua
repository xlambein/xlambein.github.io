local log = require 'pandoc.log'

function trim(s)
  return (string.gsub(s, "^%s*(.-)%s*$", "%1"))
end

-- Source: https://mojoauth.com/escaping/html-escaping-in-lua/
function escape_html(input)
  return input
    :gsub("&", "&amp;")    -- Replace & with &amp;
    :gsub("<", "&lt;")     -- Replace < with &lt;
    :gsub(">", "&gt;")     -- Replace > with &gt;
    :gsub('"', "&quot;")   -- Replace " with &quot;
    :gsub("'", "&apos;")   -- Replace ' with &apos;
end

function Writer (doc, opts)
  local filter = {
    CodeBlock = function (cb)
      local lang = cb.classes[1] or ""
      local text = cb.text
      if lang ~= "" then
        local ok, output = pcall(function()
          return pandoc.pipe("arborium", {"--lang", lang, "--html"}, text)
        end)
        if ok then
          text = output
        else
          text = escape_html(text)
          log.warn(tostring(output))
        end
      else
        text = escape_html(text)
      end
      text = trim(text)
      local delimited = '<pre><code class="' .. lang .. '">' .. text .. '</code></pre>'
      return pandoc.RawBlock('html', delimited)
    end
  }
  return pandoc.write(doc:walk(filter), 'html', opts)
end

Template = pandoc.template.default 'html'
