---
template: page
---

# Hi 👋

My name is Xavier, I'm an artist and programmer from Brussels 🇧🇪.  I [make music](/music/) and do all sorts of coding projects &amp; experiments, some of which you'll find here.

I have many interests, including games&nbsp;👾, music&nbsp;🎼, programming languages&nbsp;&#955;, and human-computer interaction&nbsp;🖱.  If you'd like to chat about any of these subjects, or about something else, don't hesitate to [reach out](/about).

I might also be available for freelance/part time jobs, so if you'd like to work with me, do get in touch.

## Projects

{{#each projects}}
<div class="page-ref">
    <a href="{{this.url}}" class="page-url">{{{this.title}}}</a>
    <!-- <br> -->
    <div class="page-info">
        <span class="page-pubdate">{{this.pubdate}}</span>
        <span class="page-tags">
            {{#each this.tags}}
            {{this}}
            {{#unless @last}} / {{/unless}}
            {{/each}}
        </span>
    </div>
</div>
{{/each}}

