function addTextElement(e){const t=document.createElement("div");t.contentEditable=!0,t.className="widget",t.style.fontSize=e,t.textContent="Edit me :-)",universe.appendChild(t),makeDraggable(makeState(t),t)}function addCheckboxElement(){const e=document.createElement("div");e.className="widget",e.innerHTML='<input type="checkbox">',e.addEventListener("change",function(){parse()}),universe.appendChild(e),makeDraggable(makeState(e),e)}function clamp(e,t,n){return e<t?t:e>n?n:e}function makeState(e){return{eventToCoordinates(t){return{x:t.clientX,y:t.clientY}},dragging:!1,_pos:{x:0,y:0},get pos(){return this._pos},set pos(t){const n=e.parentNode.getBoundingClientRect(),o=e.getBoundingClientRect();this._pos={x:clamp(t.x,0,n.width-o.width),y:clamp(t.y,0,n.height-o.height)},e.style.transform=`translate(${this._pos.x}px,${this._pos.y}px)`}}}function makeDraggable(e,t){function n(r){if(r.button!==0)return;let{x:s,y:c}=e.eventToCoordinates(r);e.dragging={dx:e.pos.x-s,dy:e.pos.y-c},t.style.userSelect="none",t.style.webkitUserSelect="none"}function o(r){e.dragging=null,t.style.userSelect="",t.style.webkitUserSelect=""}function i(r){if(!e.dragging)return;t.setPointerCapture(r.pointerId);let{x:s,y:c}=e.eventToCoordinates(r);e.pos={x:s+e.dragging.dx,y:c+e.dragging.dy}}t.addEventListener("pointerdown",n),t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o),t.addEventListener("pointermove",i),t.addEventListener("touchmove",r=>{e.dragging&&r.preventDefault()})}const observer=new MutationObserver((e,t)=>{parse()});function unobserve(){observer.disconnect()}function reobserve(){observer.observe(universe,{attributes:!0,childList:!0,subtree:!0,characterData:!0})}class ParseError{constructor(t,n){this.text=t,this.el=n}}function parse(){unobserve();const e=universe.querySelectorAll(".widget");universe.removeAttribute("data-error");for(const n of e)n.removeAttribute("data-error");const t=e.values().toArray().map(n=>{const o=n.getBoundingClientRect();return{el:n,x:o.x,y:o.y,width:o.width,height:o.height}});try{const n=parseTodoList(t);for(const o of n.tasks){const i=o.checkbox.childNodes.item(0).checked;o.text.classList.toggle("checked",i)}}catch(n){n.el?n.el.setAttribute("data-error",n.text):universe.setAttribute("data-error",n.text)}reobserve()}function parseTodoList(e){e.sort((i,r)=>i.y-r.y);const t=e.shift();if(t===void 0)throw new ParseError("Missing title");const n=parseTitle(t);let o=[];for(;e.length>0;)o.push(parseTask(e));return{title:n,tasks:o}}function parseTitle(e){if(parseTextSize(e)<24)throw new ParseError("Text is not a title (font size is less than 24px)",e.el);return e.el}function parseTask(e){const t=e.findIndex(r=>parses(parseText,r));if(t===-1)throw new ParseError("Missing text");const n=e[t];e.splice(t,1);let o=Array.from(e.entries().filter(([r,s])=>s.x<n.x).filter(([r,s])=>parses(parseCheckbox,s)));o.sort((r,s)=>distance(r[1],n)-distance(s[1],n));const i=o.shift();if(i===void 0)throw new ParseError("Missing checkbox for text",n.el);return e.splice(i[0],1),{checkbox:i[1].el,text:n.el}}function parses(e,t){try{return e(t),!0}catch{return!1}}function parseText(e){if(parseTextSize(e)>=24)throw new ParseError("Text is not regular (font size is not less than 24px)",e.el);return e}function parseCheckbox(e){if(e.el.childElementCount!=1)throw new ParseError("Extra or missing children",e.el);const t=e.el.childNodes.item(0);if(t===void 0)throw new ParseError("Not a checkbox",e.el);if(t.tagName!=="INPUT")throw new ParseError("Not a checkbox",e.el);if(t.type!=="checkbox")throw new ParseError("Not a checkbox",e.el);return e}function parseTextSize(e){if(parses(parseCheckbox,e))throw new ParseError("Expected text, found checkbox",e.el);let t=16;const n=e.el.style.fontSize.match("(.+)px");return n&&(t=+n[1]),t}function distance(e,t){Math.abs(Math.sqrt(e.x*e.x+e.y*e.y)-Math.sqrt(t.x*t.x+t.y*t.y))}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector("#universe");parse()});