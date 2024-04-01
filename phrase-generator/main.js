(function(Bn){"use strict";function un(n,r,e){return e.a=n,e.f=r,e}function c(n){return un(2,n,function(r){return function(e){return n(r,e)}})}function S(n){return un(3,n,function(r){return function(e){return function(a){return n(r,e,a)}}})}function Z(n){return un(4,n,function(r){return function(e){return function(a){return function(t){return n(r,e,a,t)}}}})}function hn(n){return un(5,n,function(r){return function(e){return function(a){return function(t){return function(o){return n(r,e,a,t,o)}}}}})}function Kn(n){return un(6,n,function(r){return function(e){return function(a){return function(t){return function(o){return function(i){return n(r,e,a,t,o,i)}}}}}})}function Br(n){return un(7,n,function(r){return function(e){return function(a){return function(t){return function(o){return function(i){return function(u){return n(r,e,a,t,o,i,u)}}}}}}})}function te(n){return un(8,n,function(r){return function(e){return function(a){return function(t){return function(o){return function(i){return function(u){return function(s){return n(r,e,a,t,o,i,u,s)}}}}}}}})}function oe(n){return un(9,n,function(r){return function(e){return function(a){return function(t){return function(o){return function(i){return function(u){return function(s){return function(f){return n(r,e,a,t,o,i,u,s,f)}}}}}}}}})}function l(n,r,e){return n.a===2?n.f(r,e):n(r)(e)}function _(n,r,e,a){return n.a===3?n.f(r,e,a):n(r)(e)(a)}function x(n,r,e,a,t){return n.a===4?n.f(r,e,a,t):n(r)(e)(a)(t)}function b(n,r,e,a,t,o){return n.a===5?n.f(r,e,a,t,o):n(r)(e)(a)(t)(o)}function Cr(n,r,e,a,t,o,i){return n.a===6?n.f(r,e,a,t,o,i):n(r)(e)(a)(t)(o)(i)}function ie(n,r,e,a,t,o,i,u){return n.a===7?n.f(r,e,a,t,o,i,u):n(r)(e)(a)(t)(o)(i)(u)}function Ta(n,r,e,a,t,o,i,u,s){return n.a===8?n.f(r,e,a,t,o,i,u,s):n(r)(e)(a)(t)(o)(i)(u)(s)}function hu(n,r,e,a,t,o,i,u,s,f){return n.a===9?n.f(r,e,a,t,o,i,u,s,f):n(r)(e)(a)(t)(o)(i)(u)(s)(f)}function qn(n,r){for(var e,a=[],t=yr(n,r,0,a);t&&(e=a.pop());t=yr(e.a,e.b,0,a));return t}function yr(n,r,e,a){if(n===r)return!0;if(typeof n!="object"||n===null||r===null)return typeof n=="function"&&K(5),!1;if(e>100)return a.push(w(n,r)),!0;n.$<0&&(n=ur(n),r=ur(r));for(var t in n)if(!yr(n[t],r[t],e+1,a))return!1;return!0}var ka=c(qn),du=c(function(n,r){return!qn(n,r)});function V(n,r,e){if(typeof n!="object")return n===r?0:n<r?-1:1;if(typeof n.$>"u")return(e=V(n.a,r.a))||(e=V(n.b,r.b))?e:V(n.c,r.c);for(;n.b&&r.b&&!(e=V(n.a,r.a));n=n.b,r=r.b);return e||(n.b?1:r.b?-1:0)}var Ga=c(function(n,r){return V(n,r)<0}),Wa=c(function(n,r){return V(n,r)<1}),Va=c(function(n,r){return V(n,r)>0}),gu=c(function(n,r){return V(n,r)>=0}),Oa=c(function(n,r){var e=V(n,r);return e<0?Je:e?Ro:Oe}),dn=0,_u={$:"#0"};function w(n,r){return{a:n,b:r}}function bu(n,r){return{$:"#2",a:n,b:r}}function pu(n,r,e){return{a:n,b:r,c:e}}function Su(n,r,e){return{$:"#3",a:n,b:r,c:e}}function wu(n){return n}function Bu(n){return new String(n)}function rn(n,r){var e={};for(var a in n)e[a]=n[a];for(var a in r)e[a]=r[a];return e}var Ja=c(Yn);function Yn(n,r){if(typeof n=="string")return n+r;if(!n.b)return r;var e=nn(n.a,r);n=n.b;for(var a=e;n.b;n=n.b)a=a.b=nn(n.a,r);return e}var h={$:0},Cu={$:"[]"};function nn(n,r){return{$:1,a:n,b:r}}function yu(n,r){return{$:"::",a:n,b:r}}var Ua=c(nn);function $(n){for(var r=h,e=n.length;e--;)r=nn(n[e],r);return r}function Qn(n){for(var r=[];n.b;n=n.b)r.push(n.a);return r}var Ia=S(function(n,r,e){for(var a=[];r.b&&e.b;r=r.b,e=e.b)a.push(l(n,r.a,e.a));return $(a)}),Du=Z(function(n,r,e,a){for(var t=[];r.b&&e.b&&a.b;r=r.b,e=e.b,a=a.b)t.push(_(n,r.a,e.a,a.a));return $(t)}),Mu=hn(function(n,r,e,a,t){for(var o=[];r.b&&e.b&&a.b&&t.b;r=r.b,e=e.b,a=a.b,t=t.b)o.push(x(n,r.a,e.a,a.a,t.a));return $(o)}),Hu=Kn(function(n,r,e,a,t,o){for(var i=[];r.b&&e.b&&a.b&&t.b&&o.b;r=r.b,e=e.b,a=a.b,t=t.b,o=o.b)i.push(b(n,r.a,e.a,a.a,t.a,o.a));return $(i)}),Au=c(function(n,r){return $(Qn(r).sort(function(e,a){return V(n(e),n(a))}))}),Lu=c(function(n,r){return $(Qn(r).sort(function(e,a){var t=l(n,e,a);return t===Oe?0:t===Je?-1:1}))}),Na=[];function Eu(n){return[n]}function ja(n){return n.length}var za=S(function(n,r,e){for(var a=new Array(n),t=0;t<n;t++)a[t]=e(r+t);return a}),Ka=c(function(n,r){for(var e=new Array(n),a=0;a<n&&r.b;a++)e[a]=r.a,r=r.b;return e.length=a,w(e,r)}),Fu=c(function(n,r){return r[n]}),Ru=S(function(n,r,e){for(var a=e.length,t=new Array(a),o=0;o<a;o++)t[o]=e[o];return t[n]=r,t}),Pu=c(function(n,r){for(var e=r.length,a=new Array(e+1),t=0;t<e;t++)a[t]=r[t];return a[e]=n,a}),Tu=S(function(n,r,e){for(var a=e.length,t=0;t<a;t++)r=l(n,e[t],r);return r}),qa=S(function(n,r,e){for(var a=e.length-1;a>=0;a--)r=l(n,e[a],r);return r}),ku=c(function(n,r){for(var e=r.length,a=new Array(e),t=0;t<e;t++)a[t]=n(r[t]);return a}),Gu=S(function(n,r,e){for(var a=e.length,t=new Array(a),o=0;o<a;o++)t[o]=l(n,r+o,e[o]);return t}),Wu=S(function(n,r,e){return e.slice(n,r)}),Vu=S(function(n,r,e){var a=r.length,t=n-a;t>e.length&&(t=e.length);for(var o=a+t,i=new Array(o),u=0;u<a;u++)i[u]=r[u];for(var u=0;u<t;u++)i[u+a]=e[u];return i}),Ou=c(function(n,r){return r}),Ju=c(function(n,r){return console.log(n+": "+le(r)),r});function Uu(n,r){return function(e){K(8,n,r,e)}}function Iu(n,r,e){return function(a){K(9,n,r,e,a)}}function le(n){return"<internals>"}function Nu(n){return en(!1,n)}function en(n,r){if(typeof r=="function")return Zn(n,"<function>");if(typeof r=="boolean")return Gn(n,r?"True":"False");if(typeof r=="number")return Ya(n,r+"");if(r instanceof String)return Qa(n,"'"+ue(r,!0)+"'");if(typeof r=="string")return se(n,'"'+ue(r,!1)+'"');if(typeof r=="object"&&"$"in r){var e=r.$;if(typeof e=="number")return Zn(n,"<internals>");if(e[0]==="#"){var t=[];for(var a in r)a!=="$"&&t.push(en(n,r[a]));return"("+t.join(",")+")"}if(e==="Set_elm_builtin")return Gn(n,"Set")+Xn(n,".fromList")+" "+en(n,To(r));if(e==="RBNode_elm_builtin"||e==="RBEmpty_elm_builtin")return Gn(n,"Dict")+Xn(n,".fromList")+" "+en(n,ur(r));if(e==="Array_elm_builtin")return Gn(n,"Array")+Xn(n,".fromList")+" "+en(n,Go(r));if(e==="::"||e==="[]"){var t="[";for(r.b&&(t+=en(n,r.a),r=r.b);r.b;r=r.b)t+=","+en(n,r.a);return t+"]"}var t="";for(var o in r)if(o!=="$"){var i=en(n,r[o]),u=i[0],s=u==="{"||u==="("||u==="["||u==="<"||u==='"'||i.indexOf(" ")<0;t+=" "+(s?i:"("+i+")")}return Gn(n,e)+t}if(typeof DataView=="function"&&r instanceof DataView)return se(n,"<"+r.byteLength+" bytes>");if(typeof File<"u"&&r instanceof File)return Zn(n,"<"+r.name+">");if(typeof r=="object"){var t=[];for(var f in r){var v=f[0]==="_"?f.slice(1):f;t.push(Xn(n,v)+" = "+en(n,r[f]))}return t.length===0?"{}":"{ "+t.join(", ")+" }"}return Zn(n,"<internals>")}function ue(n,r){var e=n.replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/\v/g,"\\v").replace(/\0/g,"\\0");return r?e.replace(/\'/g,"\\'"):e.replace(/\"/g,'\\"')}function Gn(n,r){return n?"\x1B[96m"+r+"\x1B[0m":r}function Ya(n,r){return n?"\x1B[95m"+r+"\x1B[0m":r}function se(n,r){return n?"\x1B[93m"+r+"\x1B[0m":r}function Qa(n,r){return n?"\x1B[92m"+r+"\x1B[0m":r}function Xn(n,r){return n?"\x1B[37m"+r+"\x1B[0m":r}function Zn(n,r){return n?"\x1B[36m"+r+"\x1B[0m":r}function ju(n){return String.fromCharCode(n<10?48+n:55+n)}function K(n){throw new Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}function zu(n,r,e,a,t){switch(n){case 0:throw new Error(`What node should I take over? In JavaScript I need something like:

    Elm.Main.init({
        node: document.getElementById("elm-node")
    })

You need to do this with any Browser.sandbox or Browser.element program.`);case 1:throw new Error(`Browser.application programs cannot handle URLs like this:

    `+document.location.href+"\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.");case 2:var o=r;throw new Error(`Problem with the flags given to your Elm program on initialization.

`+o);case 3:var i=r;throw new Error("There can only be one port named `"+i+"`, but your program has multiple.");case 4:var i=r,u=e;throw new Error("Trying to send an unexpected type of value through port `"+i+"`:\n"+u);case 5:throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');case 6:var s=r;throw new Error("Your page is loading multiple Elm scripts with a module named "+s+". Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!");case 8:var s=r,f=e,m=a;throw new Error("TODO in module `"+s+"` "+ce(f)+`

`+m);case 9:var s=r,f=e,v=a,m=t;throw new Error("TODO in module `"+s+"` from the `case` expression "+ce(f)+`

It received the following value:

    `+le(v).replace(`
`,`
    `)+`

But the branch that handles it says:

    `+m.replace(`
`,`
    `));case 10:throw new Error("Bug in https://github.com/elm/virtual-dom/issues");case 11:throw new Error("Cannot perform mod 0. Division by zero error.")}}function ce(n){return n.aI.ai===n.aW.ai?"on line "+n.aI.ai:"on lines "+n.aI.ai+" through "+n.aW.ai}var Xa=c(function(n,r){return n+r}),Za=c(function(n,r){return n-r}),xa=c(function(n,r){return n*r}),nt=c(function(n,r){return n/r}),rt=c(function(n,r){return n/r|0}),Ku=c(Math.pow),et=c(function(n,r){return r%n}),qu=c(function(n,r){var e=r%n;return n===0?K(11):e>0&&n<0||e<0&&n>0?e+n:e}),Yu=Math.PI,Qu=Math.E,Xu=Math.cos,Zu=Math.sin,xu=Math.tan,ns=Math.acos,rs=Math.asin,es=Math.atan,as=c(Math.atan2);function at(n){return n}function ts(n){return n|0}function os(n){return n===1/0||n===-1/0}var tt=Math.ceil,ot=Math.floor,is=Math.round,ls=Math.sqrt,fe=Math.log,us=isNaN;function it(n){return!n}var lt=c(function(n,r){return n&&r}),ut=c(function(n,r){return n||r}),ss=c(function(n,r){return n!==r}),st=c(function(n,r){return n+r});function ct(n){var r=n.charCodeAt(0);return isNaN(r)?H:G(55296<=r&&r<=56319?w(n[0]+n[1],n.slice(2)):w(n[0],n.slice(1)))}var cs=c(function(n,r){return n+r});function ft(n){return n.length}var fs=c(function(n,r){for(var e=r.length,a=new Array(e),t=0;t<e;){var o=r.charCodeAt(t);if(55296<=o&&o<=56319){a[t]=n(r[t]+r[t+1]),t+=2;continue}a[t]=n(r[t]),t++}return a.join("")}),vs=c(function(n,r){for(var e=[],a=r.length,t=0;t<a;){var o=r[t],i=r.charCodeAt(t);t++,55296<=i&&i<=56319&&(o+=r[t],t++),n(o)&&e.push(o)}return e.join("")});function $s(n){for(var r=n.length,e=new Array(r),a=0;a<r;){var t=n.charCodeAt(a);55296<=t&&t<=56319?(e[r-a]=n[a+1],a++,e[r-a]=n[a-1],a++):(e[r-a]=n[a],a++)}return e.join("")}var ms=S(function(n,r,e){for(var a=e.length,t=0;t<a;){var o=e[t],i=e.charCodeAt(t);t++,55296<=i&&i<=56319&&(o+=e[t],t++),r=l(n,o,r)}return r}),vt=S(function(n,r,e){for(var a=e.length;a--;){var t=e[a],o=e.charCodeAt(a);56320<=o&&o<=57343&&(a--,t=e[a]+t),r=l(n,t,r)}return r}),$t=c(function(n,r){return r.split(n)}),mt=c(function(n,r){return r.join(n)}),ht=S(function(n,r,e){return e.slice(n,r)});function dt(n){return n.trim()}function hs(n){return n.replace(/^\s+/,"")}function ds(n){return n.replace(/\s+$/,"")}function gs(n){return $(n.trim().split(/\s+/g))}function gt(n){return $(n.split(/\r\n|\r|\n/g))}function _s(n){return n.toUpperCase()}function _t(n){return n.toLowerCase()}var bs=c(function(n,r){for(var e=r.length;e--;){var a=r[e],t=r.charCodeAt(e);if(56320<=t&&t<=57343&&(e--,a=r[e]+a),n(a))return!0}return!1}),bt=c(function(n,r){for(var e=r.length;e--;){var a=r[e],t=r.charCodeAt(e);if(56320<=t&&t<=57343&&(e--,a=r[e]+a),!n(a))return!1}return!0}),pt=c(function(n,r){return r.indexOf(n)>-1}),St=c(function(n,r){return r.indexOf(n)===0}),ps=c(function(n,r){return r.length>=n.length&&r.lastIndexOf(n)===r.length-n.length}),wt=c(function(n,r){var e=n.length;if(e<1)return h;for(var a=0,t=[];(a=r.indexOf(n,a))>-1;)t.push(a),a=a+e;return $(t)});function Bt(n){return n+""}function Ct(n){for(var r=0,e=n.charCodeAt(0),a=e==43||e==45?1:0,t=a;t<n.length;++t){var o=n.charCodeAt(t);if(o<48||57<o)return H;r=10*r+o-48}return t==a?H:G(e==45?-r:r)}function Ss(n){if(n.length===0||/[\sxbo]/.test(n))return H;var r=+n;return r===r?G(r):H}function yt(n){return Qn(n).join("")}function Dt(n){var r=n.charCodeAt(0);return 55296<=r&&r<=56319?(r-55296)*1024+n.charCodeAt(1)-56320+65536:r}function ws(n){return n<0||1114111<n?"\uFFFD":n<=65535?String.fromCharCode(n):(n-=65536,String.fromCharCode(Math.floor(n/1024)+55296,n%1024+56320))}function Mt(n){return n.toUpperCase()}function Bs(n){return n.toLowerCase()}function Cs(n){return n.toLocaleUpperCase()}function ys(n){return n.toLocaleLowerCase()}function Ht(n){return{$:0,a:n}}function Ds(n){return{$:1,a:n}}function Cn(n){return{$:2,b:n}}var Ms=Cn(function(n){return typeof n!="number"?U("an INT",n):-2147483647<n&&n<2147483647&&(n|0)===n||isFinite(n)&&!(n%1)?I(n):U("an INT",n)}),Hs=Cn(function(n){return typeof n=="boolean"?I(n):U("a BOOL",n)}),As=Cn(function(n){return typeof n=="number"?I(n):U("a FLOAT",n)}),Ls=Cn(function(n){return I(n)}),At=Cn(function(n){return typeof n=="string"?I(n):n instanceof String?I(n+""):U("a STRING",n)});function Es(n){return{$:3,b:n}}function Fs(n){return{$:4,b:n}}function Rs(n){return{$:5,c:n}}var Lt=c(function(n,r){return{$:6,d:n,b:r}}),Ps=c(function(n,r){return{$:7,e:n,b:r}});function Ts(n){return{$:8,b:n}}function sn(n,r){return{$:9,f:n,g:r}}var ks=c(function(n,r){return{$:10,b:r,h:n}});function Gs(n){return{$:11,g:n}}var Et=c(function(n,r){return sn(n,[r])}),Ft=S(function(n,r,e){return sn(n,[r,e])}),Ws=Z(function(n,r,e,a){return sn(n,[r,e,a])}),Vs=hn(function(n,r,e,a,t){return sn(n,[r,e,a,t])}),Os=Kn(function(n,r,e,a,t,o){return sn(n,[r,e,a,t,o])}),Js=Br(function(n,r,e,a,t,o,i){return sn(n,[r,e,a,t,o,i])}),Us=te(function(n,r,e,a,t,o,i,u){return sn(n,[r,e,a,t,o,i,u])}),Is=oe(function(n,r,e,a,t,o,i,u,s){return sn(n,[r,e,a,t,o,i,u,s])}),Ns=c(function(n,r){try{var e=JSON.parse(r);return j(n,e)}catch(a){return vn(l(Vr,"This is not valid JSON! "+a.message,r))}}),ve=c(function(n,r){return j(n,r)});function j(n,r){switch(n.$){case 2:return n.b(r);case 5:return r===null?I(n.c):U("null",r);case 3:return xn(r)?$e(n.b,r,$):U("a LIST",r);case 4:return xn(r)?$e(n.b,r,Rt):U("an ARRAY",r);case 6:var e=n.d;if(typeof r!="object"||r===null||!(e in r))return U("an OBJECT with a field named `"+e+"`",r);var f=j(n.b,r[e]);return X(f)?f:vn(l(Ue,e,f.a));case 7:var a=n.e;if(!xn(r))return U("an ARRAY",r);if(a>=r.length)return U("a LONGER array. Need index "+a+" but only see "+r.length+" entries",r);var f=j(n.b,r[a]);return X(f)?f:vn(l(Ie,a,f.a));case 8:if(typeof r!="object"||r===null||xn(r))return U("an OBJECT",r);var t=h;for(var o in r)if(r.hasOwnProperty(o)){var f=j(n.b,r[o]);if(!X(f))return vn(l(Ue,o,f.a));t=nn(w(o,f.a),t)}return I(tn(t));case 9:for(var i=n.f,u=n.g,s=0;s<u.length;s++){var f=j(u[s],r);if(!X(f))return f;i=i(f.a)}return I(i);case 10:var f=j(n.b,r);return X(f)?j(n.h(f.a),r):f;case 11:for(var v=h,m=n.g;m.b;m=m.b){var f=j(m.a,r);if(X(f))return f;v=nn(f.a,v)}return vn(Wo(tn(v)));case 1:return vn(l(Vr,n.a,r));case 0:return I(n.a)}}function $e(n,r,e){for(var a=r.length,t=new Array(a),o=0;o<a;o++){var i=j(n,r[o]);if(!X(i))return vn(l(Ie,o,i.a));t[o]=i.a}return I(e(t))}function xn(n){return Array.isArray(n)||typeof FileList<"u"&&n instanceof FileList}function Rt(n){return l(si,n.length,function(r){return n[r]})}function U(n,r){return vn(l(Vr,"Expecting "+n,r))}function yn(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return yn(n.b,r.b);case 6:return n.d===r.d&&yn(n.b,r.b);case 7:return n.e===r.e&&yn(n.b,r.b);case 9:return n.f===r.f&&me(n.g,r.g);case 10:return n.h===r.h&&yn(n.b,r.b);case 11:return me(n.g,r.g)}}function me(n,r){var e=n.length;if(e!==r.length)return!1;for(var a=0;a<e;a++)if(!yn(n[a],r[a]))return!1;return!0}var Pt=c(function(n,r){return JSON.stringify(r,null,n)+""});function js(n){return{$:0,a:n}}function zs(n){return n.a}function he(n){return n}function Ks(n){return n}function qs(){return[]}function Ys(){return{}}var Qs=S(function(n,r,e){return e[n]=r,e});function Xs(n){return c(function(r,e){return e.push(n(r)),e})}var Zs=null;function E(n){return{$:0,a:n}}function Tt(n){return{$:1,a:n}}function M(n){return{$:2,b:n,c:null}}var Dr=c(function(n,r){return{$:3,b:n,d:r}}),xs=c(function(n,r){return{$:4,b:n,d:r}});function kt(n){return{$:5,b:n}}var Gt=0;function nr(n){var r={$:0,e:Gt++,f:n,g:null,h:[]};return Hr(r),r}function de(n){return M(function(r){r(E(nr(n)))})}function ge(n,r){n.h.push(r),Hr(n)}var Wt=c(function(n,r){return M(function(e){ge(n,r),e(E(dn))})});function nc(n){return M(function(r){var e=n.f;e.$===2&&e.c&&e.c(),n.f=null,r(E(dn))})}var Mr=!1,_e=[];function Hr(n){if(_e.push(n),!Mr){for(Mr=!0;n=_e.shift();)Vt(n);Mr=!1}}function Vt(n){for(;n.f;){var r=n.f.$;if(r===0||r===1){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else if(r===2){n.f.c=n.f.b(function(e){n.f=e,Hr(n)});return}else if(r===5){if(n.h.length===0)return;n.f=n.f.b(n.h.shift())}else n.g={$:r===3?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}function Ot(n){return M(function(r){var e=setTimeout(function(){r(E(dn))},n);return function(){clearTimeout(e)}})}var rc=Z(function(n,r,e,a){return Ar(r,a,n.bV,n.cm,n.ch,function(){return function(){}})});function Ar(n,r,e,a,t,o){var i=l(ve,n,r?r.flags:void 0);X(i)||K(2);var u={},s=e(i.a),f=s.a,v=o(g,f),m=Ut(u,g);function g(d,p){var C=l(a,d,f);v(f=C.a,p),we(u,C.b,t(f))}return we(u,s.b,t(f)),m?{ports:m}:{}}var Jt;function ec(n){Jt.add(n)}var T={};function Ut(n,r){var e;for(var a in T){var t=T[a];t.a&&(e=e||{},e[a]=t.a(a,r)),n[a]=It(t,r)}return e}function be(n,r,e,a,t){return{b:n,c:r,d:e,e:a,f:t}}function It(n,r){var e={g:r,h:void 0},a=n.c,t=n.d,o=n.e,i=n.f;function u(s){return l(Dr,u,kt(function(f){var v=f.a;return f.$===0?_(t,e,v,s):o&&i?x(a,e,v.i,v.j,s):_(a,e,o?v.i:v.j,s)}))}return e.h=nr(l(Dr,u,n.b))}var Nt=c(function(n,r){return M(function(e){n.g(r),e(E(dn))})}),ac=c(function(n,r){return l(Wt,n.h,{$:0,a:r})});function rr(n){return function(r){return{$:1,k:n,l:r}}}function pe(n){return{$:2,m:n}}var tc=c(function(n,r){return{$:3,n,o:r}}),Se=[],Lr=!1;function we(n,r,e){if(Se.push({p:n,q:r,r:e}),!Lr){Lr=!0;for(var a;a=Se.shift();)jt(a.p,a.q,a.r);Lr=!1}}function jt(n,r,e){var a={};er(!0,r,a,null),er(!1,e,a,null);for(var t in n)ge(n[t],{$:"fx",a:a[t]||{i:h,j:h}})}function er(n,r,e,a){switch(r.$){case 1:var t=r.k,o=zt(n,t,a,r.l);e[t]=Kt(n,o,e[t]);return;case 2:for(var i=r.m;i.b;i=i.b)er(n,i.a,e,a);return;case 3:er(n,r.o,e,{s:r.n,t:a});return}}function zt(n,r,e,a){function t(i){for(var u=e;u;u=u.t)i=u.s(i);return i}var o=n?T[r].e:T[r].f;return l(o,t,a)}function Kt(n,r,e){return e=e||{i:h,j:h},n?e.i=nn(r,e.i):e.j=nn(r,e.j),e}function Be(n){T[n]&&K(3,n)}function oc(n,r){return Be(n),T[n]={e:qt,u:r,a:Yt},rr(n)}var qt=c(function(n,r){return r});function Yt(n){var r=[],e=T[n].u,a=Ot(0);T[n].b=a,T[n].c=S(function(i,u,s){for(;u.b;u=u.b)for(var f=r,v=e(u.a),m=0;m<f.length;m++)f[m](v);return a});function t(i){r.push(i)}function o(i){r=r.slice();var u=r.indexOf(i);u>=0&&r.splice(u,1)}return{subscribe:t,unsubscribe:o}}function ic(n,r){return Be(n),T[n]={f:Qt,u:r,a:Xt},rr(n)}var Qt=c(function(n,r){return function(e){return n(r(e))}});function Xt(n,r){var e=h,a=T[n].u,t=E(null);T[n].b=t,T[n].c=S(function(i,u,s){return e=u,t});function o(i){var u=l(ve,a,i);X(u)||K(4,n,u.a);for(var s=u.a,f=e;f.b;f=f.b)r(f.a(s))}return{send:o}}function Zt(n){Bn.Elm?Ce(Bn.Elm,n):Bn.Elm=n}function Ce(n,r){for(var e in r)e in n?e=="init"?K(6):Ce(n[e],r[e]):n[e]=r[e]}function lc(n){Bn.Elm?ye("Elm",Bn.Elm,n):Bn.Elm=n}function ye(n,r,e){for(var a in e)a in r?a=="init"?K(6,n):ye(n+"."+a,r[a],e[a]):r[a]=e[a]}var ar,O=typeof document<"u"?document:{};function Er(n,r){n.appendChild(r)}var uc=Z(function(n,r,e,a){var t=a.node;return t.parentNode.replaceChild(fn(n,function(){}),t),{}});function Fr(n){return{$:0,a:n}}var xt=c(function(n,r){return c(function(e,a){for(var t=[],o=0;a.b;a=a.b){var i=a.a;o+=i.b||0,t.push(i)}return o+=t.length,{$:1,c:r,d:Rr(e),e:t,f:n,b:o}})}),P=xt(void 0),no=c(function(n,r){return c(function(e,a){for(var t=[],o=0;a.b;a=a.b){var i=a.a;o+=i.b.b||0,t.push(i)}return o+=t.length,{$:2,c:r,d:Rr(e),e:t,f:n,b:o}})}),sc=no(void 0);function cc(n,r,e,a){return{$:3,d:Rr(n),g:r,h:e,i:a}}var fc=c(function(n,r){return{$:4,j:n,k:r,b:1+(r.b||0)}});function cn(n,r){return{$:5,l:n,m:r,k:void 0}}var vc=c(function(n,r){return cn([n,r],function(){return n(r)})}),$c=S(function(n,r,e){return cn([n,r,e],function(){return l(n,r,e)})}),mc=Z(function(n,r,e,a){return cn([n,r,e,a],function(){return _(n,r,e,a)})}),hc=hn(function(n,r,e,a,t){return cn([n,r,e,a,t],function(){return x(n,r,e,a,t)})}),dc=Kn(function(n,r,e,a,t,o){return cn([n,r,e,a,t,o],function(){return b(n,r,e,a,t,o)})}),gc=Br(function(n,r,e,a,t,o,i){return cn([n,r,e,a,t,o,i],function(){return Cr(n,r,e,a,t,o,i)})}),_c=te(function(n,r,e,a,t,o,i,u){return cn([n,r,e,a,t,o,i,u],function(){return ie(n,r,e,a,t,o,i,u)})}),bc=oe(function(n,r,e,a,t,o,i,u,s){return cn([n,r,e,a,t,o,i,u,s],function(){return Ta(n,r,e,a,t,o,i,u,s)})}),De=c(function(n,r){return{$:"a0",n,o:r}}),ro=c(function(n,r){return{$:"a1",n,o:r}}),Me=c(function(n,r){return{$:"a2",n,o:r}}),He=c(function(n,r){return{$:"a3",n,o:r}}),pc=S(function(n,r,e){return{$:"a4",n:r,o:{f:n,o:e}}});function Sc(n){return n=="script"?"p":n}function wc(n){return/^(on|formAction$)/i.test(n)?"data-"+n:n}function Bc(n){return n=="innerHTML"||n=="formAction"?"data-"+n:n}function eo(n){return/^javascript:/i.test(n.replace(/\s/g,""))?"":n}function Cc(n){return/^javascript:/i.test(n.replace(/\s/g,""))?'javascript:alert("This is an XSS vector. Please use ports or web components instead.")':n}function yc(n){return/^\s*(javascript:|data:text\/html)/i.test(n)?"":n}function Dc(n){return/^\s*(javascript:|data:text\/html)/i.test(n)?'javascript:alert("This is an XSS vector. Please use ports or web components instead.")':n}var Mc=c(function(n,r){return r.$==="a0"?l(De,r.n,ao(n,r.o)):r});function ao(n,r){var e=jr(r);return{$:r.$,a:e?_(ci,e<3?to:oo,Nr(n),r.a):l(Ir,n,r.a)}}var to=c(function(n,r){return w(n(r.a),r.b)}),oo=c(function(n,r){return{H:n(r.H),aJ:r.aJ,aG:r.aG}});function Rr(n){for(var r={};n.b;n=n.b){var e=n.a,a=e.$,t=e.n,o=e.o;if(a==="a2"){t==="className"?Ae(r,t,o):r[t]=o;continue}var i=r[a]||(r[a]={});a==="a3"&&t==="class"?Ae(i,t,o):i[t]=o}return r}function Ae(n,r,e){var a=n[r];n[r]=a?a+" "+e:e}function fn(n,r){var e=n.$;if(e===5)return fn(n.k||(n.k=n.m()),r);if(e===0)return O.createTextNode(n.a);if(e===4){for(var a=n.k,t=n.j;a.$===4;)typeof t!="object"?t=[t,a.j]:t.push(a.j),a=a.k;var o={j:t,p:r},i=fn(a,o);return i.elm_event_node_ref=o,i}if(e===3){var i=n.h(n.g);return Pr(i,r,n.d),i}var i=n.f?O.createElementNS(n.f,n.c):O.createElement(n.c);ar&&n.c=="a"&&i.addEventListener("click",ar(i)),Pr(i,r,n.d);for(var u=n.e,s=0;s<u.length;s++)Er(i,fn(e===1?u[s]:u[s].b,r));return i}function Pr(n,r,e){for(var a in e){var t=e[a];a==="a1"?io(n,t):a==="a0"?so(n,r,t):a==="a3"?lo(n,t):a==="a4"?uo(n,t):(a!=="value"&&a!=="checked"||n[a]!==t)&&(n[a]=t)}}function io(n,r){var e=n.style;for(var a in r)e[a]=r[a]}function lo(n,r){for(var e in r){var a=r[e];typeof a<"u"?n.setAttribute(e,a):n.removeAttribute(e)}}function uo(n,r){for(var e in r){var a=r[e],t=a.f,o=a.o;typeof o<"u"?n.setAttributeNS(t,e,o):n.removeAttributeNS(t,e)}}function so(n,r,e){var a=n.elmFs||(n.elmFs={});for(var t in e){var o=e[t],i=a[t];if(!o){n.removeEventListener(t,i),a[t]=void 0;continue}if(i){var u=i.q;if(u.$===o.$){i.q=o;continue}n.removeEventListener(t,i)}i=co(r,o),n.addEventListener(t,i,Tr&&{passive:jr(o)<2}),a[t]=i}}var Tr;try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Tr=!0}}))}catch{}function co(n,r){function e(a){var t=e.q,o=j(t.a,a);if(X(o)){for(var i=jr(t),u=o.a,s=i?i<3?u.a:u.H:u,f=i==1?u.b:i==3&&u.aJ,v=(f&&a.stopPropagation(),(i==2?u.b:i==3&&u.aG)&&a.preventDefault(),n),m,g;m=v.j;){if(typeof m=="function")s=m(s);else for(var g=m.length;g--;)s=m[g](s);v=v.p}v(s,f)}}return e.q=r,e}function fo(n,r){return n.$==r.$&&yn(n.a,r.a)}function Le(n,r){var e=[];return q(n,r,e,0),e}function k(n,r,e,a){var t={$:r,r:e,s:a,t:void 0,u:void 0};return n.push(t),t}function q(n,r,e,a){if(n!==r){var t=n.$,o=r.$;if(t!==o)if(t===1&&o===2)r=po(r),o=1;else{k(e,0,a,r);return}switch(o){case 5:for(var i=n.l,u=r.l,s=i.length,f=s===u.length;f&&s--;)f=i[s]===u[s];if(f){r.k=n.k;return}r.k=r.m();var v=[];q(n.k,r.k,v,0),v.length>0&&k(e,1,a,v);return;case 4:for(var m=n.j,g=r.j,d=!1,p=n.k;p.$===4;)d=!0,typeof m!="object"?m=[m,p.j]:m.push(p.j),p=p.k;for(var C=r.k;C.$===4;)d=!0,typeof g!="object"?g=[g,C.j]:g.push(C.j),C=C.k;if(d&&m.length!==g.length){k(e,0,a,r);return}(d?!vo(m,g):m!==g)&&k(e,2,a,g),q(p,C,e,a+1);return;case 0:n.a!==r.a&&k(e,3,a,r.a);return;case 1:Ee(n,r,e,a,$o);return;case 2:Ee(n,r,e,a,mo);return;case 3:if(n.h!==r.h){k(e,0,a,r);return}var y=kr(n.d,r.d);y&&k(e,4,a,y);var L=r.i(n.g,r.g);L&&k(e,5,a,L);return}}}function vo(n,r){for(var e=0;e<n.length;e++)if(n[e]!==r[e])return!1;return!0}function Ee(n,r,e,a,t){if(n.c!==r.c||n.f!==r.f){k(e,0,a,r);return}var o=kr(n.d,r.d);o&&k(e,4,a,o),t(n,r,e,a)}function kr(n,r,e){var a;for(var t in n){if(t==="a1"||t==="a0"||t==="a3"||t==="a4"){var o=kr(n[t],r[t]||{},t);o&&(a=a||{},a[t]=o);continue}if(!(t in r)){a=a||{},a[t]=e?e==="a1"?"":e==="a0"||e==="a3"?void 0:{f:n[t].f,o:void 0}:typeof n[t]=="string"?"":null;continue}var i=n[t],u=r[t];i===u&&t!=="value"&&t!=="checked"||e==="a0"&&fo(i,u)||(a=a||{},a[t]=u)}for(var s in r)s in n||(a=a||{},a[s]=r[s]);return a}function $o(n,r,e,a){var t=n.e,o=r.e,i=t.length,u=o.length;i>u?k(e,6,a,{v:u,i:i-u}):i<u&&k(e,7,a,{v:i,e:o});for(var s=i<u?i:u,f=0;f<s;f++){var v=t[f];q(v,o[f],e,++a),a+=v.b||0}}function mo(n,r,e,a){for(var t=[],o={},i=[],u=n.e,s=r.e,f=u.length,v=s.length,m=0,g=0,d=a;m<f&&g<v;){var p=u[m],C=s[g],y=p.a,L=C.a,D=p.b,J=C.b,W=void 0,R=void 0;if(y===L){d++,q(D,J,t,d),d+=D.b||0,m++,g++;continue}var N=u[m+1],ln=s[g+1];if(N){var Ra=N.a,kn=N.b;R=L===Ra}if(ln){var Pa=ln.a,ae=ln.b;W=y===Pa}if(W&&R){d++,q(D,ae,t,d),Wn(o,t,y,J,g,i),d+=D.b||0,d++,Vn(o,t,y,kn,d),d+=kn.b||0,m+=2,g+=2;continue}if(W){d++,Wn(o,t,L,J,g,i),q(D,ae,t,d),d+=D.b||0,m+=1,g+=2;continue}if(R){d++,Vn(o,t,y,D,d),d+=D.b||0,d++,q(kn,J,t,d),d+=kn.b||0,m+=2,g+=1;continue}if(N&&Ra===Pa){d++,Vn(o,t,y,D,d),Wn(o,t,L,J,g,i),d+=D.b||0,d++,q(kn,ae,t,d),d+=kn.b||0,m+=2,g+=2;continue}break}for(;m<f;){d++;var p=u[m],D=p.b;Vn(o,t,p.a,D,d),d+=D.b||0,m++}for(;g<v;){var wr=wr||[],C=s[g];Wn(o,t,C.a,C.b,void 0,wr),g++}(t.length>0||i.length>0||wr)&&k(e,8,a,{w:t,x:i,y:wr})}var Fe="_elmW6BL";function Wn(n,r,e,a,t,o){var i=n[e];if(!i){i={c:0,z:a,r:t,s:void 0},o.push({r:t,A:i}),n[e]=i;return}if(i.c===1){o.push({r:t,A:i}),i.c=2;var u=[];q(i.z,a,u,i.r),i.r=t,i.s.s={w:u,A:i};return}Wn(n,r,e+Fe,a,t,o)}function Vn(n,r,e,a,t){var o=n[e];if(!o){var i=k(r,9,t,void 0);n[e]={c:1,z:a,r:t,s:i};return}if(o.c===0){o.c=2;var u=[];q(a,o.z,u,t),k(r,9,t,{w:u,A:o});return}Vn(n,r,e+Fe,a,t)}function Re(n,r,e,a){On(n,r,e,0,0,r.b,a)}function On(n,r,e,a,t,o,i){for(var u=e[a],s=u.r;s===t;){var f=u.$;if(f===1)Re(n,r.k,u.s,i);else if(f===8){u.t=n,u.u=i;var v=u.s.w;v.length>0&&On(n,r,v,0,t,o,i)}else if(f===9){u.t=n,u.u=i;var m=u.s;if(m){m.A.s=n;var v=m.w;v.length>0&&On(n,r,v,0,t,o,i)}}else u.t=n,u.u=i;if(a++,!(u=e[a])||(s=u.r)>o)return a}var g=r.$;if(g===4){for(var d=r.k;d.$===4;)d=d.k;return On(n,d,e,a,t+1,o,n.elm_event_node_ref)}for(var p=r.e,C=n.childNodes,y=0;y<p.length;y++){t++;var L=g===1?p[y]:p[y].b,D=t+(L.b||0);if(t<=s&&s<=D&&(a=On(C[y],L,e,a,t,D,i),!(u=e[a])||(s=u.r)>o))return a;t=D}return a}function Pe(n,r,e,a){return e.length===0?n:(Re(n,r,e,a),tr(n,e))}function tr(n,r){for(var e=0;e<r.length;e++){var a=r[e],t=a.t,o=ho(t,a);t===n&&(n=o)}return n}function ho(n,r){switch(r.$){case 0:return go(n,r.s,r.u);case 4:return Pr(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return tr(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var o=r.s,a=0;a<o.i;a++)n.removeChild(n.childNodes[o.v]);return n;case 7:for(var o=r.s,e=o.e,a=o.v,t=n.childNodes[a];a<e.length;a++)n.insertBefore(fn(e[a],r.u),t);return n;case 9:var o=r.s;if(!o)return n.parentNode.removeChild(n),n;var i=o.A;return typeof i.r<"u"&&n.parentNode.removeChild(n),i.s=tr(n,o.w),n;case 8:return _o(n,r);case 5:return r.s(n);default:K(10)}}function go(n,r,e){var a=n.parentNode,t=fn(r,e);return t.elm_event_node_ref||(t.elm_event_node_ref=n.elm_event_node_ref),a&&t!==n&&a.replaceChild(t,n),t}function _o(n,r){var e=r.s,a=bo(e.y,r);n=tr(n,e.w);for(var t=e.x,o=0;o<t.length;o++){var i=t[o],u=i.A,s=u.c===2?u.s:fn(u.z,r.u);n.insertBefore(s,n.childNodes[i.r])}return a&&Er(n,a),n}function bo(n,r){if(n){for(var e=O.createDocumentFragment(),a=0;a<n.length;a++){var t=n[a],o=t.A;Er(e,o.c===2?o.s:fn(o.z,r.u))}return e}}function Gr(n){if(n.nodeType===3)return Fr(n.textContent);if(n.nodeType!==1)return Fr("");for(var r=h,e=n.attributes,a=e.length;a--;){var t=e[a],o=t.name,i=t.value;r=nn(l(He,o,i),r)}for(var u=n.tagName.toLowerCase(),s=h,f=n.childNodes,a=f.length;a--;)s=nn(Gr(f[a]),s);return _(P,u,r,s)}function po(n){for(var r=n.e,e=r.length,a=new Array(e),t=0;t<e;t++)a[t]=r[t].b;return{$:1,c:n.c,d:n.d,e:a,f:n.f,b:n.b}}var So,wo=So||Z(function(n,r,e,a){return Ar(r,a,n.bV,n.cm,n.ch,function(t,o){var i=n.cn,u=a.node,s=Gr(u);return Te(o,function(f){var v=i(f),m=Le(s,v);u=Pe(u,s,m,t),s=v})})}),Bo,Co=Bo||Z(function(n,r,e,a){return Ar(r,a,n.bV,n.cm,n.ch,function(t,o){var i=n.aH&&n.aH(t),u=n.cn,s=O.title,f=O.body,v=Gr(f);return Te(o,function(m){ar=i;var g=u(m),d=P("body")(h)(g.bE),p=Le(v,d);f=Pe(f,v,p,t),v=d,ar=0,s!==g.ck&&(O.title=s=g.ck)})})}),yo=typeof cancelAnimationFrame<"u"?cancelAnimationFrame:function(n){clearTimeout(n)},Jn=typeof requestAnimationFrame<"u"?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)};function Te(n,r){r(n);var e=0;function a(){e=e===1?0:(Jn(a),r(n),1)}return function(t,o){n=t,o?(r(n),e===2&&(e=1)):(e===0&&Jn(a),e=2)}}function Hc(n){var r=n.b8,e=n.b9,a=function(){a.a(r(Wr()))};return Co({aH:function(t){return a.a=t,an.addEventListener("popstate",a),an.navigator.userAgent.indexOf("Trident")<0||an.addEventListener("hashchange",a),c(function(o,i){if(!i.ctrlKey&&!i.metaKey&&!i.shiftKey&&i.button<1&&!o.target&&!o.hasAttribute("download")){i.preventDefault();var u=o.href,s=Wr(),f=sa(u).a;t(e(f&&s.bh===f.bh&&s.a1===f.a1&&s.be.a===f.be.a?vi(f):fi(u)))}})},bV:function(t){return _(n.bV,t,Wr(),a)},cn:n.cn,cm:n.cm,ch:n.ch})}function Wr(){return sa(O.location.href).a||K(1)}var Ac=c(function(n,r){return l(pn,In,M(function(){r&&history.go(r),n()}))}),Lc=c(function(n,r){return l(pn,In,M(function(){history.pushState({},"",r),n()}))}),Ec=c(function(n,r){return l(pn,In,M(function(){history.replaceState({},"",r),n()}))}),ke={addEventListener:function(){},removeEventListener:function(){}},Dn=typeof document<"u"?document:ke,an=typeof window<"u"?window:ke,Fc=S(function(n,r,e){return de(M(function(a){function t(o){nr(e(o))}return n.addEventListener(r,t,Tr&&{passive:!0}),function(){n.removeEventListener(r,t)}}))}),Rc=c(function(n,r){var e=j(n,r);return X(e)?G(e.a):H});function Pc(){return typeof O.hidden<"u"?{bS:"hidden",bH:"visibilitychange"}:typeof O.mozHidden<"u"?{bS:"mozHidden",bH:"mozvisibilitychange"}:typeof O.msHidden<"u"?{bS:"msHidden",bH:"msvisibilitychange"}:typeof O.webkitHidden<"u"?{bS:"webkitHidden",bH:"webkitvisibilitychange"}:{bS:"hidden",bH:"visibilitychange"}}function Tc(){return M(function(n){var r=Jn(function(){n(E(Date.now()))});return function(){yo(r)}})}function kc(){return M(function(n){n(E(Date.now()))})}function or(n,r){return M(function(e){Jn(function(){var a=document.getElementById(n);e(a?E(r(a)):Tt($i(n)))})})}function Do(n){return M(function(r){Jn(function(){r(E(n()))})})}var Gc=c(function(n,r){return or(r,function(e){return e[n](),dn})});function Wc(){return{bm:Ge(),bu:{bx:an.pageXOffset,by:an.pageYOffset,bw:Dn.documentElement.clientWidth,a0:Dn.documentElement.clientHeight}}}function Ge(){var n=Dn.body,r=Dn.documentElement;return{bw:Math.max(n.scrollWidth,n.offsetWidth,r.scrollWidth,r.offsetWidth,r.clientWidth),a0:Math.max(n.scrollHeight,n.offsetHeight,r.scrollHeight,r.offsetHeight,r.clientHeight)}}var Vc=c(function(n,r){return Do(function(){return an.scroll(n,r),dn})});function Oc(n){return or(n,function(r){return{bm:{bw:r.scrollWidth,a0:r.scrollHeight},bu:{bx:r.scrollLeft,by:r.scrollTop,bw:r.clientWidth,a0:r.clientHeight}}})}var Jc=S(function(n,r,e){return or(n,function(a){return a.scrollLeft=r,a.scrollTop=e,dn})});function Uc(n){return or(n,function(r){var e=r.getBoundingClientRect(),a=an.pageXOffset,t=an.pageYOffset;return{bm:Ge(),bu:{bx:a,by:t,bw:Dn.documentElement.clientWidth,a0:Dn.documentElement.clientHeight},bM:{bx:a+e.left,by:t+e.top,bw:e.width,a0:e.height}}})}function Ic(n){return l(pn,In,M(function(r){O.location.reload(n)}))}function Nc(n){return l(pn,In,M(function(r){try{an.location=n}catch{O.location.reload(!1)}}))}var jc=Cn(function(n){return typeof File<"u"&&n instanceof File?I(n):U("a FILE",n)});function zc(n){return n.name}function Kc(n){return n.type}function qc(n){return n.size}function Yc(n){return ga(n.lastModified)}var We;function Ve(){return We||(We=document.createElement("a"))}var Qc=S(function(n,r,e){return M(function(a){var t=new Blob([e],{type:r});if(navigator.msSaveOrOpenBlob){navigator.msSaveOrOpenBlob(t,n);return}var o=Ve(),i=URL.createObjectURL(t);o.href=i,o.download=n,ir(o),URL.revokeObjectURL(i)})});function Xc(n){return M(function(r){var e=Ve();e.href=n,e.download="",e.origin===location.origin||(e.target="_blank"),ir(e)})}function Zc(n){return new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}function ir(n){if(typeof MouseEvent=="function")n.dispatchEvent(new MouseEvent("click"));else{var r=document.createEvent("MouseEvents");r.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),document.body.appendChild(n),n.dispatchEvent(r),document.body.removeChild(n)}}var Y;function Mo(n){return M(function(r){Y=document.createElement("input"),Y.type="file",Y.accept=l(gn,",",n),Y.addEventListener("change",function(e){r(E(e.target.files[0]))}),ir(Y)})}function xc(n){return M(function(r){Y=document.createElement("input"),Y.type="file",Y.multiple=!0,Y.accept=l(gn,",",n),Y.addEventListener("change",function(e){var a=$(e.target.files);r(E(w(a.a,a.b)))}),ir(Y)})}function Ho(n){return M(function(r){var e=new FileReader;return e.addEventListener("loadend",function(){r(E(e.result))}),e.readAsText(n),function(){e.abort()}})}function nf(n){return M(function(r){var e=new FileReader;return e.addEventListener("loadend",function(){r(E(new DataView(e.result)))}),e.readAsArrayBuffer(n),function(){e.abort()}})}function rf(n){return M(function(r){var e=new FileReader;return e.addEventListener("loadend",function(){r(E(e.result))}),e.readAsDataURL(n),function(){e.abort()}})}var Ao=c(function(n,r){return n&r}),ef=c(function(n,r){return n|r}),Lo=c(function(n,r){return n^r});function af(n){return~n}var tf=c(function(n,r){return r<<n}),of=c(function(n,r){return r>>n}),Eo=c(function(n,r){return r>>>n});function Fo(n){return M(function(r){r(E(n(Date.now())))})}var lf=c(function(n,r){return M(function(e){var a=setInterval(function(){nr(r)},n);return function(){clearInterval(a)}})});function uf(){return M(function(n){n(E(l(Ui,-new Date().getTimezoneOffset(),h)))})}function sf(){return M(function(n){try{var r=Vi(Intl.DateTimeFormat().resolvedOptions().timeZone)}catch{var r=Oi(new Date().getTimezoneOffset())}n(E(r))})}var Oe=1,Ro=2,Je=0,F=Ua,lr=S(function(n,r,e){n:for(;;){if(e.$===-2)return r;var a=e.b,t=e.c,o=e.d,i=e.e,u=n,s=_(n,a,t,_(lr,n,r,i)),f=o;n=u,r=s,e=f;continue n}}),ur=function(n){return _(lr,S(function(r,e,a){return l(F,w(r,e),a)}),h,n)},Po=function(n){return _(lr,S(function(r,e,a){return l(F,r,a)}),h,n)},To=function(n){var r=n;return Po(r)},sr=qa,ko=S(function(n,r,e){var a=e.c,t=e.d,o=c(function(i,u){if(i.$){var f=i.a;return _(sr,n,u,f)}else{var s=i.a;return _(sr,o,u,s)}});return _(sr,o,_(sr,n,r,t),a)}),Go=function(n){return _(ko,F,h,n)},vn=function(n){return{$:1,a:n}},Vr=c(function(n,r){return{$:3,a:n,b:r}}),Ue=c(function(n,r){return{$:0,a:n,b:r}}),Ie=c(function(n,r){return{$:1,a:n,b:r}}),I=function(n){return{$:0,a:n}},Wo=function(n){return{$:2,a:n}},cf=1,Vo=Xa,G=function(n){return{$:0,a:n}},H={$:1},Oo=bt,ff=lt,vf=Ja,Jo=Pt,cr=Bt,gn=c(function(n,r){return l(mt,n,Qn(r))}),Uo=c(function(n,r){return $(l($t,n,r))}),Ne=function(n){return l(gn,`
    `,l(Uo,`
`,n))},_n=S(function(n,r,e){n:for(;;)if(e.b){var a=e.a,t=e.b,o=n,i=l(n,a,r),u=t;n=o,r=i,e=u;continue n}else return r}),je=function(n){return _(_n,c(function(r,e){return e+1}),0,n)},Io=Ia,$f=Wa,mf=Za,No=S(function(n,r,e){n:for(;;)if(V(n,r)<1){var a=n,t=r-1,o=l(F,r,e);n=a,r=t,e=o;continue n}else return e}),jo=c(function(n,r){return _(No,n,r,h)}),zo=c(function(n,r){return _(Io,n,l(jo,0,je(r)-1),r)}),fr=Dt,ze=function(n){var r=fr(n);return 97<=r&&r<=122},Ke=function(n){var r=fr(n);return r<=90&&65<=r},hf=ut,Ko=function(n){return ze(n)||Ke(n)},qo=function(n){var r=fr(n);return r<=57&&48<=r},Yo=function(n){return ze(n)||Ke(n)||qo(n)},tn=function(n){return _(_n,F,h,n)},qe=ct,Qo=c(function(n,r){return`

(`+(cr(n+1)+(") "+Ne(Xo(r))))}),Xo=function(n){return l(Zo,n,h)},Zo=c(function(n,r){n:for(;;)switch(n.$){case 0:var e=n.a,i=n.b,a=function(){var C=qe(e);if(C.$===1)return!1;var y=C.a,L=y.a,D=y.b;return Ko(L)&&l(Oo,Yo,D)}(),t=a?"."+e:"['"+(e+"']"),s=i,f=l(F,t,r);n=s,r=f;continue n;case 1:var o=n.a,i=n.b,u="["+(cr(o)+"]"),s=i,f=l(F,u,r);n=s,r=f;continue n;case 2:var v=n.a;if(v.b)if(v.b.b){var m=function(){return r.b?"The Json.Decode.oneOf at json"+l(gn,"",tn(r)):"Json.Decode.oneOf"}(),p=m+(" failed in the following "+(cr(je(v))+" ways:"));return l(gn,`

`,l(F,p,l(zo,Qo,v)))}else{var i=v.a,s=i,f=r;n=s,r=f;continue n}else return"Ran into a Json.Decode.oneOf with no possibilities"+function(){return r.b?" at json"+l(gn,"",tn(r)):"!"}();default:var g=n.a,d=n.b,p=function(){return r.b?"Problem with the value at json"+(l(gn,"",tn(r))+`:

    `):`Problem with the given value:

`}();return p+(Ne(l(Jo,4,d))+(`

`+g))}}),Q=32,Or=Z(function(n,r,e,a){return{$:0,a:n,b:r,c:e,d:a}}),Jr=Na,Ye=tt,df=nt,Qe=c(function(n,r){return fe(r)/fe(n)}),gf=at,Ur=Ye(l(Qe,2,Q)),xo=x(Or,0,Ur,Jr,Jr),Xe=za,ni=function(n){return{$:1,a:n}},_f=c(function(n,r){return n(r)}),bf=c(function(n,r){return r(n)}),ri=ka,ei=ot,Ze=ja,pf=Va,xe=c(function(n,r){return V(n,r)>0?n:r}),Sf=xa,ai=function(n){return{$:0,a:n}},na=Ka,ti=c(function(n,r){n:for(;;){var e=l(na,Q,n),a=e.a,t=e.b,o=l(F,ai(a),r);if(t.b){var i=t,u=o;n=i,r=u;continue n}else return tn(o)}}),oi=function(n){var r=n.a;return r},ii=c(function(n,r){n:for(;;){var e=Ye(r/Q);if(e===1)return l(na,Q,n).a;var a=l(ti,n,h),t=e;n=a,r=t;continue n}}),li=c(function(n,r){if(r.h){var e=r.h*Q,a=ei(l(Qe,Q,e-1)),t=n?tn(r.k):r.k,o=l(ii,t,r.h);return x(Or,Ze(r.j)+e,l(xe,5,a*Ur),o,r.j)}else return x(Or,Ze(r.j),Ur,Jr,r.j)}),wf=rt,Bf=Ga,ui=hn(function(n,r,e,a,t){n:for(;;){if(r<0)return l(li,!1,{k:a,h:e/Q|0,j:t});var o=ni(_(Xe,Q,r,n)),i=n,u=r-Q,s=e,f=l(F,o,a),v=t;n=i,r=u,e=s,a=f,t=v;continue n}}),Cf=et,si=c(function(n,r){if(n<=0)return xo;var e=n%Q,a=_(Xe,e,n-e,r),t=n-e-Q;return b(ui,r,t,n,h,a)}),yf=0,X=function(n){return!n.$},Ir=Et,ci=Ft,Nr=Ht,jr=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},fi=function(n){return{$:1,a:n}},vi=function(n){return{$:0,a:n}},bn=function(n){return n},$i=bn,Df=0,Mf=1,ra=Kn(function(n,r,e,a,t,o){return{aY:o,a1:r,bc:a,be:e,bh:n,bi:t}}),mi=pt,ea=ft,vr=ht,$n=c(function(n,r){return n<1?r:_(vr,n,ea(r),r)}),$r=wt,Un=function(n){return n===""},mr=c(function(n,r){return n<1?"":_(vr,0,n,r)}),aa=Ct,ta=hn(function(n,r,e,a,t){if(Un(t)||l(mi,"@",t))return H;var o=l($r,":",t);if(o.b){if(o.b.b)return H;var i=o.a,u=aa(l($n,i+1,t));if(u.$===1)return H;var s=u;return G(Cr(ra,n,l(mr,i,t),s,r,e,a))}else return G(Cr(ra,n,t,H,r,e,a))}),oa=Z(function(n,r,e,a){if(Un(a))return H;var t=l($r,"/",a);if(t.b){var o=t.a;return b(ta,n,l($n,o,a),r,e,l(mr,o,a))}else return b(ta,n,"/",r,e,a)}),ia=S(function(n,r,e){if(Un(e))return H;var a=l($r,"?",e);if(a.b){var t=a.a;return x(oa,n,G(l($n,t+1,e)),r,l(mr,t,e))}else return x(oa,n,H,r,e)}),la=c(function(n,r){if(Un(r))return H;var e=l($r,"#",r);if(e.b){var a=e.a;return _(ia,n,G(l($n,a+1,r)),l(mr,a,r))}else return _(ia,n,H,r)}),ua=St,sa=function(n){return l(ua,"http://",n)?l(la,0,l($n,7,n)):l(ua,"https://",n)?l(la,1,l($n,8,n)):H},In=function(n){n:for(;;){var r=n,e=r;n=e;continue n}},Hf=bn,mn=E,hi=mn(0),ca=Z(function(n,r,e,a){if(a.b){var t=a.a,o=a.b;if(o.b){var i=o.a,u=o.b;if(u.b){var s=u.a,f=u.b;if(f.b){var v=f.a,m=f.b,g=e>500?_(_n,n,r,tn(m)):x(ca,n,r,e+1,m);return l(n,t,l(n,i,l(n,s,l(n,v,g))))}else return l(n,t,l(n,i,l(n,s,r)))}else return l(n,t,l(n,i,r))}else return l(n,t,r)}else return r}),hr=S(function(n,r,e){return x(ca,n,r,0,e)}),Mn=c(function(n,r){return _(hr,c(function(e,a){return l(F,n(e),a)}),h,r)}),Hn=Dr,zr=c(function(n,r){return l(Hn,function(e){return mn(n(e))},r)}),di=S(function(n,r,e){return l(Hn,function(a){return l(Hn,function(t){return mn(l(n,a,t))},e)},r)}),gi=function(n){return _(hr,di(F),mn(h),n)},fa=Nt,_i=c(function(n,r){var e=r;return de(l(Hn,fa(n),e))}),bi=S(function(n,r,e){return l(zr,function(a){return 0},gi(l(Mn,_i(n),r)))}),pi=S(function(n,r,e){return mn(0)}),Si=c(function(n,r){var e=r;return l(zr,n,e)});T.Task=be(hi,bi,pi,Si);var wi=rr("Task"),pn=c(function(n,r){return wi(l(zr,n,r))}),Bi=wo,va=function(n){return{$:4,a:n}},Ci=function(n){return{$:3,a:n}},yi=function(n){return{$:1,a:n}},$a=function(n){return{$:5,a:n}},Di=yt,Mi=S(function(n,r,e){var a=c(function(t,o){if(o.b){var i=o.a;return l(F,l(n,t,i),o)}else return h});return tn(_(_n,a,$([r]),e))}),Hi=vt,Ai=function(n){return _(Hi,F,h,n)},Li=Mt,Ei=function(n){return l($n,1,Di(_(Mi,c(function(r,e){return e===" "||e==="-"?Li(r):r})," ",Ai(n))))},Fi=`Aberto
Accio
Aguamenti
Alohomora
Avada Kedavra
Bat-Bogey Hex
Bubble-Head Charm
Caterwauling Charm
Cheering Charm
Colloportus
Confringo
Confundo
Crucio
Descendo
Diffindo
Disillusionment Charm
Engorgio
Episkey
Evanesco
Expecto Patronum
Expelliarmus
Finestra
Homenum Revelio
Impedimenta
Imperio
Impervius
Incendio
Levicorpus
Liberacorpus
Locomotor
Lumos
Morsmordre
Muffliato
Nox
Obliviate
Permanent Sticking Charm
Petrificus Totalus
Portus
Priori Incantato
Protego
Reducto
Rennervate
Relashio
Rennervate
Reparo
Revelio
Rictusempra
Riddikulus
Scourgify
Sectumsempra
Silencio
Sonorus
Stupefy
Taboo
Tergeo
Unbreakable Vow
Wingardium Leviosa
Appare Vestigium
Avenseguim
Finite
Nebulus
Protego Diabolica
Surgito
Papyrus Reparo`,Ri=`Abyss
Achad Tarlang
Adorn
Adurant
Aelin-uial
Aeluin
Afros
Agar
Agathurush
Aglarond
Aglon
Akallab\xEAth
Aldal\xF3m\xEB
Aldburg
Almaren
Alqualond\xEB
Aman
Ambar\xF3na
Amon Amarth
Amon Anwar
Amon Darthir
Amon D\xEEn
Amon Ereb
Amon Ethir
Amon Gwareth
Amon Hen
Amon Lanc
Amon Lhaw
Amon Obel
Amon R\xFBdh
Amon S\xFBl
Amon Uilos
Anach
Anad\xFBn\xEA
Ancient West
Andafalass\xEB
Andor
Andram
Andrast
Andrath
Androth
Anduin
And\xFAne Pelo
And\xFAni\xEB
Andustar
Anfalas
Anfauglith
Angamando
Angband
Anghabar
Angmar
Angren
Angrenost
Annon-in-Gelydh
Ann\xFAminas
An\xF3rien
Antaro
Araman
Arandor
Archet
Arda
Ard-galen
Argonath
Armenelos
Arnach
Arnor
Aros
Arossiach
Arthedain
Arthor na Challonnas
Arthor na Forlonnas
Arth\xF3rien
Arvernien
Ascar
Ash Mountains
Astulat
Atalant\xEB
Athrad Angren
Avall\xF3n\xEB
Avathar
Azanulbizar
Bag End
Bagshot Row
Balar
Bamfurlong
Bar-en-Danwedh
Bar-en-Nibin-noeg
Bar-in-M\u0177l\u200E
Bar-erib
Barad-d\xFBr
Barad Eithel
Barad Nimras
Baranduin
Barazinbar
Barrow-downs
Barrowfield
Battle Pit
Battle Plain
Bay of Balar
Bay of Belfalas
Bay of And\xFAni\xEB
Bay of Eldamar
Bay of Eldanna
Bay of R\xF3menna
Belegaer
Belegost
Beleriand
Belfalas
Bent Seas
Beorn's House
Bindbale Wood
Birchwoods of Nimbrethil
Black Crack
Black Gate
Black Land
Black Pit
Black Pits
Blackroot
Blessed Realm
Blue Mountains
Bombadil's House
Bonfire Glade
Bony ridge
The Bounds
Branda-n\xEEn
Brandywine Bridge
Bree
Bree Hill
Bree-land
Breredon
Brethil
Bridge of Esgalduin
Bridge of Mitheithel
Bridge of Khazad-d\xFBm
Bridge of Stonebows
Bridgefields
Brilthor
Brithiach
Brithombar
Brithon
Brockenbores
Brodda's hall
Brown Lands
Bruinen
Buck Hill
Buckland
Buckland Gate
Buckland Road
Bucklebury
Bucklebury Ferry
Bucklebury Ford
Budge Ford
Budgeford
Bundushath\xFBr
Bywater
Bywater Pool
Bywater Road
Cabed-en-Aras
Cair Andros
Calacirya
Calacirian
Calembel
Calenardhon
Calenhad
Calmindon
Cape Balar
Cape of Andrast
Cape of Forochel
Carach Angren
Caradhras
Caragd\xFBr
Caras Galadhon
Carchost
Cardolan
Carn D\xFBm
Carnen
Carrock
Causeway Forts
Caverns of Helm's Deep
Caverns of Narog
Caves of Androth
Caves of Menegroth
Celduin
Celebdil
Celebrant
Celebros
Celon
Celos
Central Highlands
Cerin Amroth
Chamber of Mazarbul
Chambers of Fire
Chetwood
Chill Gulf
Ciril
Cirith D\xFAath
Cirith Forn en Andrath
Cirith Gorgor
Cirith Ninniach
Cirith Thoronath
Cirith Ungol
Citadel of Stars
City of the Corsairs
Cloudyhead
Cobas Haven
C\xF4f Belfalas
Coldfells
Combe
Cormallen
Corollair\xEB
Coron Oiolair\xEB
Court of the Fountain
Cracks of Doom
Crickhollow
Crissaegrim
Cristhorn
Crossings of Teiglin
Cross-roads
Cuivi\xE9nen
C\xFBl B\xEEn
C\xFBl Veleg
C\xFBm-nan-Arasaith
Dagorlad
Dale
Dark Door
Dark Gate
Dark Land
Dark Lands
Dark Mountains
Dark Tower
Dead Marshes
Deadmen's Dike
Death Down
Deathless Lands
Deeping
Deephallow
Deeping Coomb
Deeping-road
Deeping Stream
Deeping Wall
Deer's Leap
Deld\xFAwath
Derndingle
Desert of Lostladen
Desolation of Smaug
Desolation of the Morannon
Dimbar
Dimholt
Dimrill Dale
Dimrill Gate
Dimrill Stair
Dimrost
Dingle
Dol Amroth
Dol Baran
Dol Guldur
Dol Tarlang
Dome of Stars
Doors of Night
Doors of Durin
Dor Caranthir
Dor-C\xFAarthol
Dor Daedeloth
Dor D\xEDnen
Dor-en-Ernil
Dor Firn-i-Guinar
Dor-l\xF3min
Dor-Nu-Fauglith
Doriath
Dorthonion
Dorwinion
Downlands
Drowns
Drengist
Dr\xFAadan Forest
Dr\xFAwaith Iaur
Dry River
Duilwen
Dungortheb
Dunharrow
D\xFAnharg
Dunland
Durin's Bridge
Durin's Tower
Durthang
Dwaling
Dwarf-Road
Dwarrowdelf
Dwimorberg
Dwimordene
Eagles' Eyrie
East Beleriand
East Bight
East Emnet
Eastern Eriador
East Farthing
Eastfold
East-gate
East-lands
East L\xF3rien
East March
East Road
East Wall of Rohan
Eastwood
Echad i Sedryn
Echoing Hills
Echoriath
Edge of the Wild
Edhellond
Edoras
Egladil
Eglador
Eglamar
Eglarest
Eilenach
Eilenaer
Eithel Ivrin
Eithel N\xEDnui
Eithel Sirion
Ekkaia
Eldalond\xEB the Green
Eldamar
Elennan\xF3r\xEA
Elerr\xEDna
Elostirion
Elros' Tower
Elvenhome
Elwing's tower
Emeri\xEB
Emyn Arnen
Emyn Beraid
Emyn Duir
Emyn Eglain
Emyn Muil
Emyn-nu-Fuin
Emyn Uial
Enchanted Isles
Enchanted River
Encircling Mountains
Encircling Sea
Endless Stair
Endor
Ened
Enedwaith
Entwade
River Entwash
Entwash Vale
Entwood
\xC9oth\xE9od
Ephel Brandir
Ephel D\xFAath
Erebor
Erech
Ered Engrin
Ered Gorgoroth
Ered Lindon
Ered Lithui
Ered L\xF3min
Ered Mithrin
Ered Nimrais
Ered Wethrin
Eregion
Erelas
Erendis
Eress\xEBa
Eriador
Erui
Eryn Fuir
Eryn Galen
Eryn Vorn
Esgalduin
Esgaroth
Estolad
Ethir Anduin
Ethraid Engrin
Ethring
Ettendales
Ettenmoors
Evereven
Everholt
Evernight
Ezellohar
Falas
Falls of Esgalduin
Falls of Irvin
Falls of Rauros
Falls of Sirion
Fangorn Forest
Fanuidhol
Far Downs
Far Harad
Far Shore
Far West
Faskalan
Faskala-n\xFAmen
Fen Hollen
Fen of Serech
Fenmarch
Fens of Sirion
Ferry Lane
Field of Celebrant
Field of Cormallen
Fingolfin's Cairn
Firienholt
Firien Wood
First Deep
First Hall
Firth of Drengist
Firth of R\xF3menna
Foen
Folde
Ford of Brithiach
Ford of Bruinen
Ford of Stones
Fords of Isen
Forest Gate
Forest of Brethil
Forest of Neldoreth
Forest of Region
Forest River
Forest Road
Forgotten Villages
Forlindon
Forlond
Formenos
Fornarthan
Fornost Erain
Forochel
Forodwaith
Forostar
Forsaken Inn
F\xF4s' Almir
Fountain of Tin\xFAviel
Fox Downs
Framsburg
Frogmorton
Front Gate
Front Porch
Gabilgathod
Gamwich
Gap of Calenardhon
Gap of Rohan
Gardens of L\xF3rien
Gate of the Dead
Gate of the Noldor
Gate Stream
Gates of Morning
Gates of Sirion
Gelion
Gilrain
Ginglith
Girdle of Arda
Girdle of Melian
Girdley Island
Gladden Fields
Gladden River
Glanduin
Glanh\xEDr
Glithui
Glittering Caves
Goblin-gate
Goblin-town
Golden Gates
Golden Wood
Gollum's Lake
Gondolin
Gondor
Gorbelgod
Gorge of Aglon
Gorgoroth
Gorgoroth
great East Road
Great Fens
Great Gulf
Great Hall of Thr\xE1in
Great Lakes
Great Lands
Great Mound
Great Plains
Great Rift
Great River
Great Shelf
Great Smials
Great Southern Forests
Great West Road
Great Willow
Greater Gelion
Green Dragon
Green Hill Country
Green Hills
Green Hills
Greenfields
Greenholm
Greenway
Greenwood the Great
Grey Havens
Grey Mountains
Grey Mountains
Grey Wood
Greyflood
Greylin
Grinding Ice
Grindwall
Gruir
Guarded Plain
Gulf of Lh\xFBn
Gundabad
Gwathl\xF3
Hadhodrond
Haeren
Haerast
Halifirien
Hall of Brodda
Hall of Fire
Halls of Aul\xEB
Halls of Durin
Halls of Mandos
Hanstov\xE1nen
Harad
Harad Road
Hardbottle
Harlindon
Harlond
Harnen
Harondor
Harrowdale
Haudh-en-Elleth
Haudh-en-Ndengin
Haudh-en-Nirnaeth
Haudh in Gwan\xFBr
Haunted Mountain
Haunted Pass
Haven of the Eldar
Haven of the Swans
Havens of Mithlond
Havens of Sirion
Haven of Umbar
Hay Gate
Haysend
Heats of the South
Hedge
Helcar
Helcarax\xEB
Helevorn
Helm's Deep
Helm's Dike
Helm's Gate
Henneth Ann\xFBn
Hidden Ferries
Hidden Way
High Court
High Faroth
High Hay
High Pass
Hild\xF3rien
Hill of Awe
Hill of Guard
Hill of Hearing
Hill of Himring
Hill of Ilmarin
Hill of Oromet
Hill of Seeing
Hill of Spies
Hill of the Ear
Hill of the Eye
Hill
Hills of Eglamar
Hills of Evendim
Hills of Scary
Himlad
Himring
H\xEDrilorn
Hisil\xF3m\xEB
Hithaeglir
Hither Lands
Hither Shore
Hithlum
Hoarwell
Hobbiton
Hobbiton Hill
Hobbiton Road
Hollin
Hollin Gate
Hollin Ridge
Hornburg
Hornrock
House of Orom\xEB
House of the Hundred Chimneys
House of the Kings
House of the Stewards
House of Tulkas
Houses of Healing
House of the Dead
Huts of the raft-elves
Hyarastorni
Hyarmentir
Hyarnustar
Hyarrostar
Iant Iaur
Icebay of Forochel
Ice of the North
Idril's secret way
i Drann
Illuin
Ilmarin
Imlad Morgul
Imladris
Imloth Melui
Imrath Gondraith
Inner Seas
Inland Sea
Inland Sea of Helcar
\xCDrensaga
Iron Fortress
Iron Hills
Iron Mountains
Isen
Isengard
Isenmouthe
Ishmalog
Isle of Almaren
Isle of Balar
Isle of Elenna
Isle of Eress\xEBa
Isle of Meneltarma
Isle of Werewolves
Isles of the West
Ithilien
Ivrin
Ivrin's Well
Ivy Bush
N/A
Kalorm\xEB
Karningul
Kelos
Khand
Khazad-d\xFBm
Kheled-z\xE2ram
Kibil-n\xE2la
Kingdom of the South
Kingdom under the Mountain
King's Court
King's House
Kingsland
Kingsland
Kings' Norbury
Kiril
Kirith Ungol
K\xF4r
Kortirion
Ladros
Lake Helevorn
Lake Mithrim
Lake Nenuial
Lake-town
Lamedon
Lammoth
Lampwrights' Street
Land of Bow-Helm
Land of the Dead that Live
Lands Under the Wave
Lands Without
Langflood
Langstrand
Langwell
Lanthir Lamath
Last Bridge
Last Homely House
Last Mountain
Last Shore
Laurelind\xF3renan
Lebennin
Lefnui
Legolin
Lh\xFBn
Linaewen
Lindon
Lind\xF3rinan
Linhir
Lisgardh
Lithir
Lithlad
Little Delving
Little Gelion
Lockholes
Loeg Ningloron
Lond Daer Enedh
Lone-lands
Lonely Isle
Lonely Mountain
Longbottom
Long Cleeve
Long Lake
Long Marshes
Long Wall
L\xF3rellin
L\xF3rien
L\xF3rinand
Losgar
Lossarnach
Lost Isle
Lostladen
Lothlann
Lothl\xF3rien
Loudwater
Lower Halls
Lugb\xFArz
Lune
Luvailin
Maggot's Farm
Maggot's Lane
Maglor's Gap
Mahanaxar
Malduin
Mandos
Mansions of Aul\xEB
March of Maedhros
Marish
Mark
Mar-nu-Falmar
Market-pool
Marshes of Nevrast
Meduseld
Men-i-Naugrim
Menegroth
Meneltarma
Mere of Dead Faces
Meres of Twilight
Merethrond
Mering Stream
Methed-en-glad
Methedras
Michel Delving
Middle-earth
Midgewater Marshes
Mill
Minas Anor
Minas Ithil
Minas Morgul
Minas Tirith
Minas Tirith
Mindeb
Mindolluin
Mindon Eldali\xE9va
Minhiriath
Min-Rimmon
Mirkwood
Mirrormere
Misty Mountains
Mithe
Mithe Steps
Mitheithel
Mithlond
Mithrim
Mittalmar
Moors of the Neweglu
Moors of the Nibin-noeg
Morannon
Mordor
Morgai
Morgul Pass
Morgul-road
Morgulduin
Moria
Mornan
Morthond
Mound of Avarice
Mound of Dunlendings
Mound of Riders
Mounds of Mundburg
Mount Dolmed
Mount Doom
Mount Everwhite
Mount Fang
Mount Gram
Mount Gundabad
Mount Mindolluin
Mount of the Pine Trees
Mount Rerir
Mount Taras
Mountain of Fire
Mountains of Aman
Mountains of Angmar
Mountains of Lune
Mountains of Mirkwood
Mountains of Mithrim
Mountains of Shadow
Mountains of Shadow
Mountains of Terror
Mountains of the East
Mouths of Anduin
Mouths of Entwash
Mouths of Sirion
Mundburg
Naith
Nameless Land
Nan Curun\xEDr
Nan Dungortheb
Nan Elmoth
Nan-tathren
Nanduhirrion
Narchost
Nardol
Nargothrond
Narog
Narrows of the Forest
Near Harad
Needlehole
Neldoreth
Nen Echui
Nen Girith
Nen Hithoel
Nen Lalaith
Nenning
Nenuial
Nether Dark
Nevrast
Nevrast
New Haven
New Lands
Newbury
Nienna
Nimbrethil
Nimrodel
Nindalf
Nindamos
Ninglor
N\xEEn-in-Eilph
N\xEDsimaldar
N\xEDsinen
Nivrim
Nobottle
Nogrod
Noirinan
Noman-lands
Norbury
North Cape
North Downs
North Farthing
North Gate
North Ithilien
North Kingdom
North Marches
North Moors
North Road
North Road of Ithilien
North Stair
North Undeep
Northerland
Northern Dark
Northern Waste
Novrod
N\xFAath 
N\xFAmendor
N\xFAmenor
Nunduin\xEB
Nurn
Oatbarton
Obel Halad
Ocean
Oioloss\xEB
Oiom\xFAr\xEB
Old Bridge
Old Ford
Old Forest
Old Forest Road
Old Grange
Old Guesthouse
Old Mill
Old P\xFAkel land
Old Road
Old South Road
Old South Road
Old Winyards
Old World
Ondolind\xEB
Ondoluncanando
Ondon\xF3r\xEB
Ondosto
Onodl\xF3
Orc-holds
Orfalch Echor
Ormal
Orocarni
Orod-na-Th\xF4n
Orodruin
Oromet
Orrostar
Orthanc
Osgiliath
Ossiriand
Ost-in-Edhil
Otherworld
Outer Dark or Outer Darkness
Outer Lands
Outer Sea
Outlands
Overbourn
Overbourn Marshes
Overhill
Palisor
Parth Celebrant
Parth Galen
Party Field
Pass of Aglon
Pass of Anach
Pastures of Yavanna
Paths of the Dead
Pelargir
Pelennor
Pel\xF3ri
Ph\xFBrunargian
Pillars of the King
Pincup
Pine-mountain
Pinnath Gelin
Place of the Fountain
Pool of Bywater
Pool-side
Pools of Ivrin
Poros
Prancing Pony
Qerkaringa
Quarry
Radhrim
Rainbow Cleft
Ramdal
Rammas Echor
Ras Mewrim
Ras Morthil
Rath Celerdain
Rath D\xEDnen
Rathl\xF3riel
Rauros
Ravenhill
Ravines of Teiglin
Redhorn
Redhorn Gate
Redwater
Region
Region of Everlasting Cold
Reunited Kingdom
Rhimdath
Rhosgobel
Rhovanion
Rhudaur
Rh\xFBn
Min-Rimmon
Ring of Doom
Ring of Isengard
Ringil
Ringil
Ringl\xF3
Ringwil
Rivendell
River Running
Rivil
Rivil's Well
Rochand
R\xF3menna
R\xFBnaer
Rushdown
Rushock Bog
Rushy
Sammath Naur
Sandyman's Mill
Sarn Athrad
Sarn Ford
Sarn Gebir
Sauron's Isle
Sauron's Road
Sauron's Temple
Scary
Sea
Sea of Helcar
Sea of N\xFArnen
Sea of Rh\xFBn
Sea of Ringil
Seat of Hearing
Seat of Seeing
Sea-ward Tower
Second Hall
Serni
Seven Gates of Gondolin
Seventh Level
Shadowmere
Shadowy Isles
Shadowy Mountains
Shadowy Mountains
Shadowy Seas
Shadowy Spring
Sharabhund
Shath\xFBr
Shelob's Lair
Shire
Shirebourn
Side-door
Silverlode
Silvertine
Sindan\xF3rie
Sirannon
Siril
Sirion
Sirith
S\xEEr Ninglor
Slag-hills
Snowbourn
Sorontil
South Downs
South Farthing
South Gondor
South Ithilien
South Kingdom
South Lane
South Road
South Road
South Undeep
Southward Road
Spider's Ring
Staddle
Stair Falls
Stair of the Hold
Standelf
Starkhorn
Steward's Door
Stock
Stock Road
Stockbrook
Stonewain Valley
Stoningland
Straight Road
Straight Stair
Straits of the World
Sundering Seas
Sunlands
Sunlendings
S\xFBthburg
S\xFBza
Swanfleet
Taeglin
Talath Dirnen
Talath Rh\xFBnen
Taniquetil
Tanyasalp\xEB
Tar-Minastir
Tarlang's Neck
Tarmasundar
Tarn Aeluin
Tarnost
Tasarinan
Tauremorna
Tauremornal\xF3m\xEB
Taur e-Ndaedelos
Taur-en-Faroth
Taur-im-Duinath
Taur-na-Foen
Taur-Na-Neldor
Taur-nu-Fuin
Taur-nu-Fuin
Tavrobel
Temple of Sauron
Thalos
Thangorodrim
Tharbad
Thargelion
Thistle Brook
Thorin's Halls
Thousand Caves
Three-Farthing Stone
Thrihyrne
Tighfield
Tindrock
Tirion
Tirith Aear
Tol Brandir
Tol Eress\xEBa
Tol Fuin
Tol Galen
Tol-in-Gaurhoth
Tol Morwen
Tol Sirion
Tol Uinen
Tolfalas
Tomb of the Kings
Tongue
Tookbank
Tookland
Torech Ungol
Tower Hills
Tower of Cirith Ungol
Tower of Ecthelion
Tower of Ingw\xEB
Tower of the King
Tower of the Stone
Towers of the Teeth
Town Hole
Treebeard's Hill
Treegarth of Orthanc
Troll's Cave
Trollshaws
Tuckborough
Tumhalad
Tumladen of Gondolin
Tumladen of Gondor
Tumunzahar
T\xFAna
Twenty-First Hall of the North-end
Twilight Meres
Two Watchers
Tyrn Gorthad
Udul
Ud\xFBn
Ud\xFBn of Mordor
Umbar
Umboth-muilin
Undeeps
Undergate
Underhill
Under-way
Underharrow
Undertowers
Undying Lands
Ungoliant's Lair
Ulmonan
Upbourn
Uttermost West
Utumno
Vale of Sirion
Valandor
Valimar
Valmar
Valinor
Verna
Vinyalond\xEB
Vinyamar
Void
Waking Water
Wall's End
Walls of Moria
Walls of the Night
Walls of the Sun
Walls of the World
Wargs' Clearing
Waste
Watchwood
Water-valley
Water of Awakening
Way of Escape
Way of Running Waters
Waymeet
Weather Hills
Weathertop
Wellinghall
Wells of Ivrin
Wells of Varda
West-door
West-gate of Bree
West-gate of Moria
West-mark
West Beleriand
West of the World
West Pass
West Road
Westemnet
Westermanton
Western Sea
Western Shore
Westernesse
Westfarthing
Westfold
Westfold Vale
Westlands
Westmarch
Wetwang
Whispering Wood
White Downs
White House of Erendis
White Mountain
White Mountains
White Tower
White Towers
Whitfurrows
Whitwell
Wild Wood
Wilderland
Willowbottom
Windle-reach
Winding Stair
Window-Curtain
Window of the West
Withered Heath
Withered Wold
Withywindle Valley
Withywindle River
Withy-path
Withy-weir
Wizard's Isle
Wizard's Vale
Wold of Rohan
Wood of Anwar
Woods of Orom\xEB
Woodhall
Woodland Realm
Woody End
The Yale
Yellow Mountains
Y\xF4z\xE2yan
Zirakzigil`,Pi=`Ach\xEAne
Achet
Agimont
Ah\xE9r\xE9e
Aische-en-Refail
Aisemont
Alle
Andenelle
Andenne
Andoy
Anh\xE9e
Annevoie-Rouillon
Anseremme
Anth\xE9e
Arbre
Arsimont
Arville
Assesse
Aublain
Auvelais
Ave-et-Auffe
Awagne
Bagimont
Baillamont
Baillonville
Bal\xE2tre
Bambois
Barcenal
Baronville
Barsy
Barvaux-Condroz
Bassines
Bauche
Baudecet
Beauraing
Beez
Belgrade
Bellefontaine
Belvaux
Berz\xE9e
Besinne
Beuzet
Biert
Biert-le-Roi
Bierwart
Biesme
Biesmer\xE9e
Bi\xE8vre
Bioul
Blaimont
Bohan
Bohisseaux
Boign\xE9e
Bois-de-Villers
Boisseilles
Bolinne
Boneffe
Boninne
Bonneville
Bonsin
Bormenville
Bossi\xE8re
Bothey
Bouge
Bourseigne-Neuve
Bourseigne-Vieille
Bousalle
Boussu-en-Fagne
Bouvignes
Bovesse
Bragard
Braibant
Branchon
Briquemont
Br\xFBly-de-Pesche
Brumagne
Bruy\xE8res
Buissonville
Buresse
Buzet
Buzin
Castillon
Celles
Cerfontaine
Chairi\xE8re
Champion
Chansin
Chapois
Chardeneux
Chastr\xE8s
Chaumont
Chevetogne
Ciergnon
Ciney
Clair-Ch\xEAne
Clermont
Cognel\xE9e
Conjoux
Conneux
Corbion
Corenne
Cornimont
Corroy
Corroy-le-Ch\xE2teau
Cortil-Wodon
Courri\xE8re
Coutisse
Couvin
Croix
Crupet
Cul-des-Sarts
Custinne
Dailly
Daussois
Daussoulx
Dave
Den\xE9e
Devant-les-Bois
Dhuy
Dinant
Dion
Doische
Donveau
Dorinne
Dourbes
Doyon
Durnal
Dr\xE9hance
\xC9ghez\xE9e
\xC9meville
\xC9mines
Emptinal
Emptinne
Enhet
\xC9prave
Ermeton-sur-Biert
Ernage
Erpent
\xC9velette
\xC9vrehailles
Fagnolle
Failon
Fairoul
Fala\xEBn
Falisolle
Falmagne
Falmignoul
Faulx-les-Tombes
Fays
Felenne
Fenffe
Ferage
Feschaux
Finnevaux
Flavion
Flawinne
Flor\xE9e
Floreffe
Florennes
Floriffoux
Flostoy
Focant
Fonds-de-l'Eau
Fontenelle
Forville
Forz\xE9e
Fosses-la-Ville
Foy-Notre-Dame
Fraire
Fraire-la-Crotteuse
Francesse
Franchimont
Franc-Waret
Frandeux
Frani\xE8re
Franquen\xE9e
Frasnes-lez-Couvin
Fre\xFFr
Fris\xE9e
Froidfontaine
Froidmont
Fter
Furfooz
Furnaux
Gedinne
Gelbress\xE9e
Gembloux
Gemenne
Gendron
G\xE9nimont
Gerin
Gerlimpont
G\xE9ronsart
Gesves
Gimn\xE9e
Gochen\xE9e
Godinne
Goesnes
Golzinne
Gonoy
Gonrieux
Gourdinne
Goyet
Gozin
Graide
Gramptinne
Grand-Leez
Grand-Manil
Graux
Gribelle
Gros Buisson
Gros-Fays
Groynne
Haid
Haillot
Halloy
Haltinne
Hambraine
Hamerenne
Hamois
Ham-sur-Sambre
Hanret
Han-sur-Lesse
Hanzinelle
Hanzinne
Harlue
Hasti\xE8re-Lavaux
Hasti\xE8re-par-del\xE0
Haut-Bois
Haut-le-Wastia
Haut-Vent
Havelange
Haversin
Havrenne
Heer
Hemptinne
Hemptinne
Herbefays
Herhet
H\xE9risson
Hermeton-sur-Meuse
H\xE9rock
Heure
Hingeon
Hogne
Honnay
Hontoir
Houdremont
Hour
Houx
Houyet
Hubaille
Hublet
Hulsonniaux
Hun
Ingremez
Inzemont
Isnes
Ivoy
Jallet
Jamagne
Jambes
Jamblinne
Jamiolle
Jann\xE9e
Jassogne
Javingue
Jemelle
Jemeppe-sur-Sambre
Jeneffe
Jet
Jodion
Keumi\xE9e
La Bouchaille
La Butte
Lafor\xEAt
La Forge
La Galopperie
Laloux
Landenne
Laneffe
La Pisselotte
La Platinerie
La Ronce
La Tauminerie
Lautenne
La Vall\xE9e
Lavaux-Sainte-Anne
Lavis
Le Br\xFBly
Le Fraity
Leignon
Le Mesnil
Lenne
Le Pachy
Le Roux
Les Basses
Les Boscailles
Les Bruy\xE8res
Les Communes
Lessive
Les Trieux
Lesve
Leuze
Lez-Fontaine
Libois
Liernu
Ligny
Linciaux
Liroux
Lisogne
Lissoir
Lives-sur-Meuse
Longchamps
Lonz\xE9e
Louette-Saint-Denis
Louette-Saint-Pierre
Loyers
Lumsonry
Lustin
Maffe
Mahoux
Maibelle
Maillen
Maison
Maisoncelle
Maizeret
Malonne
Malvoisin
Marche-les-Dames
Marchovelette
Maredret
Maredsous
Mariembourg
Marteau
Martouzin-Neuville
Matagne-la-Grande
Matagne-la-Petite
Matignolle
Maulenne
Maurenne
Maz\xE9e
Mazy
M\xE9an
Mehaigne
Membre
Merlemont
Mertenne
Mesnil-\xC9glise
Mesnil-Saint-Blaise
Mettet
Meux
Mianoye
Miavoye
Mi\xE9cret
Mohiville
Moignel\xE9e
Monceau-en-Ardenne
Moniat
Mont
Montegnet
Mont-Gauthier
Moress\xE9e
Morialm\xE9
Mornimont
Morville
Moustier-sur-Sambre
Mouzaive
Mozet
Nafraiture
Najauge
Nalamont
Nam\xEAche
Namur
Naninne
Naom\xE9
Natoye
Navaugle
Nefz\xE9e
Nettinne
Neuve-Cour
Neuville
N\xE9vremont
Nismes
Niverl\xE9e
Noiseux
Noville-les-Bois
Noville-sur-Mehaigne
Ohey
Oignies-en-Thi\xE9rache
Oizy
Olloy-sur-Viroin
Omez\xE9e
Onhaye
Onoz
Orchimont
Oret
Ossogne
Ostemer\xE9e
Patignies
Pernelle
Perwez
Pesche
Pessoux
Petigny
Petit-Doische
Petite-Chapelle
Petite Hour
Petit-Fays
Petit-Waret
Philippeville
Plan\xE7on
Pondr\xF4me
Pontaury
Pont-de-Pierres
Pontillas
Porcheresse
Pr\xE9e
Presgaux
Profondeville
Pry
Purnode
Pussemange
Regniessart
R\xE9simont
Reuleau
Reux
Revogne
Rhisnes
Rienne
Rissart
Rivi\xE8re
Rochefort
Rogn\xE9e
Roly
Romedenne
Romer\xE9e
Ronchinne
Ronvaux
Ros\xE9e
Rostenne
Rouvroy
Saint-Aubin
Saint-Denis
Saint-G\xE9rard
Saint-Germain
Saint-Lambert
Saint-Marc
Saint-Martin
Saint-Mort
Saint-Servais
Salet
Samart
Sart-Bernard
Sart-Custinne
Sart-d'Avril
Sart-en-Fagne
Sart-Eustache
Sart-Saint-Laurent
Sautour
Sauveni\xE8re
Schaltin
Sclayn
Scry
Scy
Seilles
Senenne
Senzeille
Serinchamps
Seron
Serville
Sevry
Silenrieux
Sinsin
Six-Planes
Skeuvre
Soinne
Somal
Sombreffe
Somme-Leuze
Sommi\xE8re
Somtet
Somz\xE9e
Sor\xE9e
Sorinne-la-Longue
Sorinnes
Sosoye
Soulme
Soumoy
Sovet
Sovimont
Soye
Spontin
Spy
Stave
St\xE9e
Strud
Suarl\xE9e
Sugny
Surice
Tahier
Tamines
Tarcienne
Taviers
Taviet
Temploux
Thanville
Thon-Samson
Thy-le-Bauduin
Thy-le-Ch\xE2teau
Thynes
Tillier
Tongrenelle
Tongrinne
Treignes
Trieu
Trieu-des-Sarts
Trisogne
Troka
Trussogne
Try-Pochaux
Upigny
Vaucelles
Vedrin
Velaine
Velaine-sur-Sambre
Vencimont
Ver
Verl\xE9e
Verte-Place
Vezin
Vichenet
Vieille-Maison
Vierves-sur-Viroin
Vieux-Sautour
Villers-Deux-\xC9glises
Villers-en-Fagne
Villers-le-Gambon
Villers-lez-Heest
Villers-sur-Lesse
Vincon
Viscourt
Vitrival
Vivier-Annon
Vodec\xE9e
Vodel\xE9e
Vogen\xE9e
Von\xEAche
Vresse
Wagn\xE9e
Waillet
Walcourt
Wancennes
Wanlin
Waret-la-Chauss\xE9e
Warisoulx
Warnant
Waulsort
Wavreille
Weillen
W\xE9pion
Wez-de-Chine
Wierde
Wiesme
Willerzie
Winenne
Ychippe
Yves-Gomez\xE9e
Yvoir`,Ti=`Abbott
Abernathy
Abilene
Ackerly
Addison
Adrian
Agua Dulce
Alamo
Alamo Heights
Alba
Albany
Aledo
Alice
Allen
Alma
Alpine
Alto
Alton
Alvarado
Alvin
Alvord
Amarillo
Ames
Amherst
Anahuac
Anderson
Andrews
Angleton
Angus
Anna
Annetta
Annetta North
Annetta South
Annona
Anson
Anthony
Anton
Appleby
Aquilla
Aransas Pass
Archer City
Arcola
Argyle
Arlington
Arp
Asherton
Aspermont
Athens
Atlanta
Aubrey
Aurora
Austin
Austwell
Avery
Avinger
Azle
Bailey
Bailey's Prairie
Baird
Balch Springs
Balcones Heights
Ballinger
Balmorhea
Bandera
Bangs
Bardwell
Barry
Barstow
Bartlett
Bartonville
Bastrop
Bay City
Bayou Vista
Bayside
Baytown
Bayview
Beach City
Bear Creek
Beasley
Beaumont
Beckville
Bedford
Bedias
Bee Cave
Beeville
Bellaire
Bellevue
Bellmead
Bells
Bellville
Belton
Benavides
Benbrook
Benjamin
Berryville
Bertram
Beverly Hills
Bevil Oaks
Big Lake
Big Sandy
Big Spring
Big Wells
Bishop
Bishop Hills
Blackwell
Blanco
Blanket
Bloomburg
Blooming Grove
Blossom
Blue Mound
Blue Ridge
Blum
Boerne
Bogata
Bonham
Bonney
Booker
Borger
Bovina
Bowie
Boyd
Brackettville
Brady
Brazoria
Brazos Bend
Brazos Country
Breckenridge
Bremond
Brenham
Briarcliff
Briaroaks
Bridge City
Bridgeport
Broaddus
Bronte
Brookshire
Brookside Village
Browndell
Brownfield
Brownsboro
Brownsville
Brownwood
Bruceville-Eddy
Bryan
Bryson
Buckholts
Buda
Buffalo
Buffalo Gap
Buffalo Springs
Bullard
Bulverde
Bunker Hill Village
Burkburnett
Burke
Burleson
Burnet
Burton
Byers
Bynum
Cactus
Caddo Mills
Caldwell
Callisburg
Calvert
Cameron
Camp Wood
Campbell
Canadian
Caney City
Canton
Canyon
Carbon
Carl's Corner
Carmine
Carrizo Springs
Carrollton
Carthage
Cashion Community
Castle Hills
Castroville
Cedar Hill
Cedar Park
Celeste
Celina
Center
Centerville
Chandler
Channing
Charlotte
Chester
Chico
Childress
Chillicothe
China
China Grove
Chireno
Christine
Cibolo
Cisco
Clarendon
Clarksville
Clarksville City
Claude
Clear Lake Shores
Cleburne
Cleveland
Clifton
Clint
Clute
Clyde
Coahoma
Cockrell Hill
Coffee City
Coldspring
Coleman
College Station
Colleyville
Collinsville
Colmesneil
Colorado City
Columbus
Comanche
Combes
Combine
Commerce
Como
Conroe
Converse
Cool
Coolidge
Cooper
Coppell
Copper Canyon
Copperas Cove
Corinth
Corpus Christi
Corrigan
Corsicana
Cottonwood
Cottonwood Shores
Cotulla
Coupland
Cove
Covington
Coyote Flats
Crandall
Crane
Cranfills Gap
Crawford
Creedmoor
Cresson
Crockett
Crosbyton
Cross Plains
Cross Roads
Cross Timber
Crowell
Crowley
Crystal City
Cuero
Cumby
Cuney
Cushing
Cut and Shoot
Daingerfield
Daisetta
Dalhart
Dallas
Dalworthington Gardens
Danbury
Darrouzett
Dawson
Dayton
Dayton Lakes
De Kalb
De Leon
Dean
Decatur
DeCordova
Deer Park
Del Rio
Dell City
Denison
Denton
Denver City
Deport
DeSoto
Detroit
Devers
Devine
Diboll
Dickens
Dickinson
Dilley
Dimmitt
DISH
Dodd City
Dodson
Domino
Donna
Dorchester
Double Oak
Douglassville
Draper
Dripping Springs
Driscoll
Dublin
Dumas
Duncanville
Eagle Lake
Eagle Pass
Early
Earth
East Bernard
East Mountain
East Tawakoni
Eastland
Easton
Ector
Edcouch
Eden
Edgecliff Village
Edgewood
Edinburg
Edmonson
Edna
Edom
El Campo
El Cenizo
El Lago
El Paso
Eldorado
Electra
Elgin
Elkhart
Elmendorf
Elsa
Emhouse
Emory
Enchanted Oaks
Encinal
Ennis
Escobares
Estelline
Euless
Eureka
Eustace
Evant
Everman
Fair Oaks Ranch
Fairchilds
Fairfield
Fairview
Falfurrias
Falls City
Farmers Branch
Farmersville
Farwell
Fate
Fayetteville
Ferris
Flatonia
Florence
Floresville
Flower Mound
Floydada
Follett
Forest Hill
Forney
Forsan
Fort Stockton
Fort Worth
Franklin
Frankston
Fredericksburg
Freeport
Freer
Friendswood
Friona
Frisco
Fritch
Frost
Fruitvale
Fulshear
Fulton
Gainesville
Galena Park
Gallatin
Galveston
Ganado
Garden Ridge
Garland
Garrett
Garrison
Gary City
Gatesville
George West
Georgetown
Gholson
Giddings
Gilmer
Gladewater
Glen Rose
Glenn Heights
Godley
Goldsmith
Goldthwaite
Goliad
Golinda
Gonzales
Goodlow
Goodrich
Gordon
Goree
Gorman
Graford
Graham
Granbury
Grand Prairie
Grand Saline
Grandfalls
Grandview
Granger
Granite Shoals
Granjeno
Grapeland
Grapevine
Grays Prairie
Greenville
Gregory
Grey Forest
Groesbeck
Groom
Groves
Groveton
Gruver
Gun Barrel City
Gunter
Gustine
Hackberry
Hale Center
Hallettsville
Hallsburg
Hallsville
Haltom City
Hamilton
Hamlin
Happy
Hardin
Harker Heights
Harlingen
Hart
Haskell
Haslet
Hawk Cove
Hawkins
Hawley
Hays
Hearne
Heath
Hebron
Hedley
Hedwig Village
Helotes
Hemphill
Hempstead
Henderson
Henrietta
Hereford
Hewitt
Hickory Creek
Hico
Hidalgo
Hideaway
Higgins
Highland Haven
Highland Park
Highland Village
Hill Country Village
Hillcrest
Hillsboro
Hilshire Village
Hitchcock
Holiday Lakes
Holland
Holliday
Hollywood Park
Hondo
Honey Grove
Hooks
Horizon City
Horseshoe Bay
Houston
Howardwick
Howe
Hubbard
Hudson
Hudson Oaks
Hughes Springs
Humble
Hunters Creek Village
Huntington
Huntsville
Hurst
Hutchins
Hutto
Huxley
Idalou
Impact
Indian Lake
Industry
Ingleside
Ingleside on the Bay
Ingram
Iola
Iowa Colony
Iowa Park
Iraan
Iredell
Irving
Italy
Itasca
Ivanhoe
Jacinto City
Jacksboro
Jacksonville
Jamaica Beach
Jarrell
Jasper
Jayton
Jefferson
Jersey Village
Jewett
Joaquin
Johnson City
Jolly
Jones Creek
Jonestown
Josephine
Joshua
Jourdanton
Junction
Justin
Karnes City
Katy
Kaufman
Keene
Keller
Kemah
Kemp
Kempner
Kendleton
Kenedy
Kenefick
Kennard
Kennedale
Kerens
Kermit
Kerrville
Kilgore
Killeen
Kingsbury
Kingsville
Kirby
Kirbyville
Kirvin
Knollwood
Knox City
Kosse
Kountze
Kress
Krugerville
Krum
Kurten
Kyle
La Feria
La Grange
La Grulla
La Joya
La Marque
La Porte
La Vernia
La Villa
La Ward
LaCoste
Lacy-Lakeview
Ladonia
Lago Vista
Laguna Vista
Lake Bridgeport
Lake City
Lake Dallas
Lake Jackson
Lake Tanglewood
Lake Worth
Lakeport
Lakeside
Lakeside
Lakeside City
Lakeview
Lakeway
Lakewood Village
Lamesa
Lampasas
Lancaster
Laredo
Latexo
Lavon
Lawn
League City
Leakey
Leander
Leary
Lefors
Leon Valley
Leona
Leonard
Leroy
Levelland
Lewisville
Lexington
Liberty
Liberty Hill
Lincoln Park
Lindale
Linden
Lindsay
Lipan
Little Elm
Little River-Academy
Littlefield
Live Oak
Liverpool
Livingston
Llano
Lockhart
Lockney
Log Cabin
Lometa
Lone Oak
Lone Star
Longview
Loraine
Lorena
Lorenzo
Los Fresnos
Los Indios
Los Ybanez
Lott
Lovelady
Lowry Crossing
Lubbock
Lucas
Lueders
Lufkin
Luling
Lumberton
Lyford
Lytle
Mabank
Madisonville
Magnolia
Malakoff
Malone
Manor
Mansfield
Manvel
Marble Falls
Marfa
Marietta
Marion
Marlin
Marquez
Marshall
Mart
Martindale
Mason
Matador
Mathis
Maud
Maypearl
McAllen
McCamey
McGregor
McKinney
McLean
McLendon-Chisholm
Meadow
Meadowlakes
Meadows Place
Megargel
Melissa
Melvin
Memphis
Menard
Mercedes
Meridian
Merkel
Mertens
Mertzon
Mesquite
Mexia
Miami
Midland
Midlothian
Midway
Milano
Mildred
Miles
Milford
Miller's Cove
Millican
Millsap
Mineola
Mineral Wells
Mingus
Mission
Missouri City
Mobeetie
Mobile City
Monahans
Mont Belvieu
Montgomery
Moody
Moore Station
Moran
Morgan
Morgan's Point
Morgan's Point Resort
Morton
Moulton
Mount Calm
Mount Enterprise
Mount Pleasant
Mount Vernon
Mountain City
Muenster
Muleshoe
Mullin
Munday
Murchison
Murphy
Mustang
Mustang Ridge
Nacogdoches
Naples
Nash
Nassau Bay
Natalia
Navarro
Navasota
Nazareth
Nederland
Needville
Nevada
New Berlin
New Boston
New Braunfels
New Chapel Hill
New Deal
New Fairview
New Home
New Hope
New London
New Summerfield
New Waverly
Newark
Newcastle
Newton
Neylandville
Niederwald
Nixon
Nocona
Nolanville
Nome
Noonday
Nordheim
Normangee
North Cleveland
North Richland Hills
Northlake
Novice
O'Brien
O'Donnell
Oak Grove
Oak Leaf
Oak Point
Oak Ridge
Oak Ridge
Oak Ridge North
Oak Valley
Oakwood
Odem
Odessa
Oglesby
Old River-Winfree
Olmos Park
Olney
Olton
Omaha
Onalaska
Opdyke West
Orange
Orange Grove
Orchard
Ore City
Overton
Ovilla
Oyster Creek
Paducah
Paint Rock
Palacios
Palestine
Palisades
Palm Valley
Palmer
Palmhurst
Palmview
Pampa
Panhandle
Panorama Village
Pantego
Paradise
Paris
Parker
Pasadena
Pattison
Patton Village
Payne Springs
Pearland
Pearsall
Pecan Gap
Pecan Hill
Pecos
Pelican Bay
Penelope
Penitas
Perryton
Petersburg
Petrolia
Petronila
Pflugerville
Pharr
Pilot Point
Pine Forest
Pine Island
Pinehurst
Pineland
Piney Point Village
Pittsburg
Plains
Plainview
Plano
Plantersville
Pleak
Pleasant Valley
Pleasanton
Plum Grove
Point
Point Blank
Point Comfort
Point Venture
Ponder
Port Aransas
Port Arthur
Port Isabel
Port Lavaca
Port Neches
Portland
Post
Post Oak Bend City
Poteet
Poth
Pottsboro
Powell
Poynor
Prairie View
Premont
Presidio
Primera
Princeton
Progreso
Progreso Lakes
Prosper
Providence Village
Putnam
Pyote
Quanah
Queen City
Quinlan
Quintana
Quitaque
Quitman
Ralls
Rancho Viejo
Ranger
Rankin
Ransom Canyon
Ravenna
Raymondville
Red Lick
Red Oak
Redwater
Refugio
Reklaw
Reno
Reno
Retreat
Rhome
Rice
Richardson
Richland
Richland Hills
Richland Springs
Richmond
Richwood
Riesel
Rio Bravo
Rio Grande City
Rio Hondo
Rio Vista
Rising Star
River Oaks
Riverside
Roanoke
Roaring Springs
Robert Lee
Robinson
Robstown
Roby
Rochester
Rockdale
Rockport
Rocksprings
Rockwall
Rocky Mound
Rogers
Rollingwood
Roma
Roman Forest
Ropesville
Roscoe
Rose City
Rose Hill Acres
Rosebud
Rosenberg
Ross
Rosser
Rotan
Round Mountain
Round Rock
Round Top
Rowlett
Roxton
Royse City
Rule
Runaway Bay
Runge
Rusk
Sabinal
Sachse
Sadler
Saginaw
Salado
San Angelo
San Antonio
San Augustine
San Benito
San Diego
San Elizario
San Felipe
San Juan
San Leanna
San Marcos
San Patricio
San Perlita
San Saba
Sanctuary
Sandy Oaks
Sandy Point
Sanford
Sanger
Sansom Park
Santa Anna
Santa Clara
Santa Fe
Santa Rosa
Savoy
Schertz
Schulenburg
Scotland
Scottsville
Scurry
Seabrook
Seadrift
Seagoville
Seagraves
Sealy
Seguin
Selma
Seminole
Seven Oaks
Seven Points
Seymour
Shady Shores
Shallowater
Shamrock
Shavano Park
Shenandoah
Shepherd
Sherman
Shiner
Shoreacres
Silsbee
Silverton
Simonton
Sinton
Skellytown
Slaton
Smiley
Smithville
Smyer
Snook
Snyder
Socorro
Somerset
Somerville
Sonora
Sour Lake
South Houston
South Mountain
South Padre Island
Southlake
Southmayd
Southside Place
Spearman
Splendora
Spofford
Spring Branch
Spring Valley Village
Springlake
Springtown
Spur
St. Hedwig
St. Jo
St. Paul
Stafford
Stagecoach
Stamford
Stanton
Staples
Star Harbor
Stephenville
Sterling City
Stinnett
Stockdale
Stratford
Strawn
Streetman
Sudan
Sugar Land
Sullivan City
Sulphur Springs
Sun Valley
Sundown
Sunnyvale
Sunray
Sunrise Beach Village
Sunset Valley
Surfside Beach
Sweeny
Sweetwater
Taft
Tahoka
Talco
Talty
Tatum
Taylor
Taylor Lake Village
Taylor Landing
Teague
Tehuacana
Temple
Tenaha
Terrell
Terrell Hills
Texarkana
Texas City
Texhoma
Texline
The Colony
The Hills
Thompsons
Thorndale
Thornton
Thorntonville
Thrall
Three Rivers
Throckmorton
Tiki Island
Timbercreek Canyon
Timpson
Tioga
Tira
Toco
Todd Mission
Tolar
Tom Bean
Tomball
Tool
Toyah
Trent
Trenton
Trinidad
Trinity
Trophy Club
Troup
Troy
Tulia
Turkey
Tuscola
Tye
Tyler
Uhland
Uncertain
Union Grove
Union Valley
Universal City
University Park
Uvalde
Valentine
Valley Mills
Valley View
Van
Van Alstyne
Van Horn
Vega
Venus
Vernon
Victoria
Vidor
Vinton
Volente
Von Ormy
Waco
Waelder
Wake Village
Waller
Wallis
Walnut Springs
Warren City
Waskom
Watauga
Waxahachie
Weatherford
Webberville
Webster
Weimar
Weinert
Weir
Wellington
Wellman
Wells
Weslaco
West
West Columbia
West Lake Hills
West Orange
West Tawakoni
West University Place
Westbrook
Westlake
Weston
Weston Lakes
Westover Hills
Westworth Village
Wharton
Wheeler
White Deer
White Oak
White Settlement
Whiteface
Whitehouse
Whitesboro
Whitewright
Whitney
Wichita Falls
Wickett
Willis
Willow Park
Wills Point
Wilmer
Wilson
Wimberley
Windcrest
Windom
Windthorst
Winfield
Wink
Winnsboro
Winona
Winters
Wixon Valley
Wolfe City
Wolfforth
Woodbranch
Woodcreek
Woodloch
Woodsboro
Woodson
Woodville
Woodway
Wortham
Wylie
Yantis
Yoakum
Yorktown
Zavalla`,on={$:-2},Kr=on,Af=1,B=hn(function(n,r,e,a,t){return{$:-1,a:n,b:r,c:e,d:a,e:t}}),Lf=0,An=hn(function(n,r,e,a,t){if(t.$===-1&&!t.a){var o=t.a,i=t.b,u=t.c,s=t.d,f=t.e;if(a.$===-1&&!a.a){var v=a.a,m=a.b,g=a.c,d=a.d,p=a.e;return b(B,0,r,e,b(B,1,m,g,d,p),b(B,1,i,u,s,f))}else return b(B,n,i,u,b(B,0,r,e,a,s),f)}else if(a.$===-1&&!a.a&&a.d.$===-1&&!a.d.a){var C=a.a,m=a.b,g=a.c,y=a.d,L=y.a,D=y.b,J=y.c,W=y.d,R=y.e,p=a.e;return b(B,0,m,g,b(B,1,D,J,W,R),b(B,1,r,e,p,t))}else return b(B,n,r,e,a,t)}),ma=Oa,qr=S(function(n,r,e){if(e.$===-2)return b(B,0,n,r,on,on);var a=e.a,t=e.b,o=e.c,i=e.d,u=e.e,s=l(ma,n,t);switch(s){case 0:return b(An,a,t,o,_(qr,n,r,i),u);case 1:return b(B,a,t,r,i,u);default:return b(An,a,t,o,i,_(qr,n,r,u))}}),ha=S(function(n,r,e){var a=_(qr,n,r,e);if(a.$===-1&&!a.a){var t=a.a,o=a.b,i=a.c,u=a.d,s=a.e;return b(B,1,o,i,u,s)}else{var f=a;return f}}),ki=function(n){return _(_n,c(function(r,e){var a=r.a,t=r.b;return _(ha,a,t,e)}),Kr,n)},da=ki($([w("namur",w("Belgium - Namur province",Pi)),w("texas",w("U.S. - Texas",Ti)),w("hpspells",w("Harry Potter Spells",Fi)),w("lotr",w("Lord of the Rings Locations",Ri)),w("zcustom",w("Custom...",""))])),Ef=bn,ga=bn,Gi=c(function(n,r){return l(pn,r,Mo(n))}),Ff=bn,Yr=c(function(n,r){return{$:0,a:n,b:r}}),Rf=Eo,dr=function(n){var r=n.a,e=n.b;return l(Yr,r*1664525+e>>>0,e)},Wi=function(n){var r=dr(l(Yr,0,1013904223)),e=r.a,a=r.b,t=e+n>>>0;return dr(l(Yr,t,a))},Vi=function(n){return{$:0,a:n}},Oi=function(n){return{$:1,a:n}},Ji=c(function(n,r){return{$:0,a:n,b:r}}),Ui=Ji,Ii=Fo(ga),Ni=function(n){var r=n;return r},ji=l(Hn,function(n){return mn(Wi(Ni(n)))},Ii),zi=c(function(n,r){var e=n;return e(r)}),_a=S(function(n,r,e){if(r.b){var a=r.a,t=r.b,o=l(zi,a,e),i=o.a,u=o.b;return l(Hn,function(s){return _(_a,n,t,u)},l(fa,n,i))}else return mn(e)}),Ki=S(function(n,r,e){return mn(e)}),Pf=bn,Qr=c(function(n,r){var e=r;return function(a){var t=e(a),o=t.a,i=t.b;return w(n(o),i)}}),qi=c(function(n,r){var e=r;return l(Qr,n,e)});T.Random=be(ji,_a,Ki,qi);var Yi=rr("Random"),Qi=c(function(n,r){return Yi(l(Qr,n,r))}),Xr=c(function(n,r){n:for(;;){if(r.$===-2)return H;var e=r.b,a=r.c,t=r.d,o=r.e,i=l(ma,n,e);switch(i){case 0:var u=n,s=t;n=u,r=s;continue n;case 1:return G(a);default:var u=n,s=o;n=u,r=s;continue n}}}),Ln=c(function(n,r){if(r.$)return H;var e=r.a;return G(n(e))}),Xi=pe,Sn=Xi(h),Zi=it,Nn=S(function(n,r,e){return n(r(e))}),xi=c(function(n,r){return _(hr,c(function(e,a){return n(e)?l(F,e,a):a}),h,r)}),nl=gt,rl=_t,el=dt,al=function(n){return l(xi,l(Nn,Zi,Un),l(Mn,el,nl(rl(n))))},ba=c(function(n,r){var e=r;return function(a){var t=e(a),o=t.a,i=t.b,u=n(o),s=u;return s(i)}}),jn=function(n){return function(r){return w(n,r)}},pa=S(function(n,r,e){return l(ba,function(a){return r(a)?jn(G(a)):n===1?jn(H):_(pa,n-1,r,e)},e)}),tl=function(n){return _(lr,S(function(r,e,a){return l(F,e,a)}),h,n)},ol=function(n){var r=n.b;return tl(r)},il=function(n){if(n.b){var r=n.a,e=n.b;return G(w(r,e))}else return H},Tf=function(n){return-n},gr=function(n){return n<0?-n:n},kf=Ao,Gf=Lo,Sa=function(n){var r=n.a,e=(r^r>>>(r>>>28)+4)*277803737;return(e>>>22^e)>>>0},ll=c(function(n,r){return function(e){var a=dr(e),t=gr(r-n),o=Sa(a),i=Sa(e),u=(134217727&o)*1,s=(67108863&i)*1,f=(s*134217728+u)/9007199254740992,v=f*t+n;return w(v,dr(a))}}),ul=S(function(n,r,e){n:for(;;){var a=n.a,t=n.b;if(r.b){var o=r.a,i=r.b;if(V(e,gr(a))<1)return t;var u=o,s=i,f=e-gr(a);n=u,r=s,e=f;continue n}else return t}}),sl=function(n){return _(_n,Vo,0,n)},cl=c(function(n,r){var e=function(t){var o=t.a;return gr(o)},a=e(n)+sl(l(Mn,e,r));return l(Qr,l(ul,n,r),l(ll,0,a))}),En=c(function(n,r){if(r.$)return n;var e=r.a;return e}),fl=function(n){var r=l(Mn,function(e){var a=e.a,t=e.b;return w(t,a)},ol(n));return l(En,jn(H),l(Ln,function(e){var a=e.a,t=e.b;return l(cl,a,t)},il(r)))},vl=st,$l=function(n){return l(vl,n,"")},ml=c(function(n,r){return n<1?"":_(vr,-n,ea(r),r)}),hl=function(n){var r=n.aj,e=n.am,a=function(t){var o=l(ml,r,t),i=l(Xr,o,e);if(i.$===1)return jn(t);var u=i.a;return l(ba,function(s){if(s.$===1)return jn(t);var f=s.a;return a(Yn(t,$l(f)))},fl(u))};return a("")},wa=function(n){var r=n.b;return r},dl=Ho,gl=function(n){return{aj:n,am:Kr}},_l=c(function(n,r){var e=function(a){var t=_(vr,l(xe,0,a-n),a,r),o=l(Ln,oi,qe(l($n,a,r)));return o.$===1?$([w(t,o)]):l(F,w(t,o),e(a+1))};return e(0)}),Wf=bn,bl=function(n){return{b:Kr,v:n}},pl=function(n){return 1+l(En,0,l(Ln,fr,n))},Sl=function(n){n:for(;;)if(n.$===-1&&n.d.$===-1){var r=n.d,e=r;n=e;continue n}else return n},Ba=function(n){if(n.$===-1&&n.d.$===-1&&n.e.$===-1)if(n.e.d.$===-1&&!n.e.d.a){var r=n.a,e=n.b,a=n.c,t=n.d,o=t.a,i=t.b,u=t.c,s=t.d,f=t.e,v=n.e,m=v.a,g=v.b,d=v.c,p=v.d,C=p.a,y=p.b,L=p.c,D=p.d,J=p.e,W=v.e;return b(B,0,y,L,b(B,1,e,a,b(B,0,i,u,s,f),D),b(B,1,g,d,J,W))}else{var r=n.a,e=n.b,a=n.c,R=n.d,o=R.a,i=R.b,u=R.c,s=R.d,f=R.e,N=n.e,m=N.a,g=N.b,d=N.c,p=N.d,W=N.e;return b(B,1,e,a,b(B,0,i,u,s,f),b(B,0,g,d,p,W))}else return n},Ca=function(n){if(n.$===-1&&n.d.$===-1&&n.e.$===-1)if(n.d.d.$===-1&&!n.d.d.a){var r=n.a,e=n.b,a=n.c,t=n.d,o=t.a,i=t.b,u=t.c,s=t.d,f=s.a,v=s.b,m=s.c,g=s.d,d=s.e,p=t.e,C=n.e,y=C.a,L=C.b,D=C.c,J=C.d,W=C.e;return b(B,0,i,u,b(B,1,v,m,g,d),b(B,1,e,a,p,b(B,0,L,D,J,W)))}else{var r=n.a,e=n.b,a=n.c,R=n.d,o=R.a,i=R.b,u=R.c,N=R.d,p=R.e,ln=n.e,y=ln.a,L=ln.b,D=ln.c,J=ln.d,W=ln.e;return b(B,1,e,a,b(B,0,i,u,N,p),b(B,0,L,D,J,W))}else return n},wl=Br(function(n,r,e,a,t,o,i){if(o.$===-1&&!o.a){var u=o.a,s=o.b,f=o.c,v=o.d,m=o.e;return b(B,e,s,f,v,b(B,0,a,t,m,i))}else{n:for(;;)if(i.$===-1&&i.a===1)if(i.d.$===-1)if(i.d.a===1){var g=i.a,d=i.d,p=d.a;return Ca(r)}else break n;else{var C=i.a,y=i.d;return Ca(r)}else break n;return r}}),_r=function(n){if(n.$===-1&&n.d.$===-1){var r=n.a,e=n.b,a=n.c,t=n.d,o=t.a,i=t.d,u=n.e;if(o===1)if(i.$===-1&&!i.a){var s=i.a;return b(B,r,e,a,_r(t),u)}else{var f=Ba(n);if(f.$===-1){var v=f.a,m=f.b,g=f.c,d=f.d,p=f.e;return b(An,v,m,g,_r(d),p)}else return on}else return b(B,r,e,a,_r(t),u)}else return on},zn=c(function(n,r){if(r.$===-2)return on;var e=r.a,a=r.b,t=r.c,o=r.d,i=r.e;if(V(n,a)<0)if(o.$===-1&&o.a===1){var u=o.a,s=o.d;if(s.$===-1&&!s.a){var f=s.a;return b(B,e,a,t,l(zn,n,o),i)}else{var v=Ba(r);if(v.$===-1){var m=v.a,g=v.b,d=v.c,p=v.d,C=v.e;return b(An,m,g,d,l(zn,n,p),C)}else return on}}else return b(B,e,a,t,l(zn,n,o),i);else return l(Bl,n,ie(wl,n,r,e,a,t,o,i))}),Bl=c(function(n,r){if(r.$===-1){var e=r.a,a=r.b,t=r.c,o=r.d,i=r.e;if(qn(n,a)){var u=Sl(i);if(u.$===-1){var s=u.b,f=u.c;return b(An,e,s,f,o,_r(i))}else return on}else return b(An,e,a,t,o,l(zn,n,i))}else return on}),Cl=c(function(n,r){var e=l(zn,n,r);if(e.$===-1&&!e.a){var a=e.a,t=e.b,o=e.c,i=e.d,u=e.e;return b(B,1,t,o,i,u)}else{var s=e;return s}}),ya=S(function(n,r,e){var a=r(l(Xr,n,e));if(a.$)return l(Cl,n,e);var t=a.a;return _(ha,n,t,e)}),yl=S(function(n,r,e){var a=e,t=l(Nn,l(Nn,Ln(function(o){return w(n,o)}),r),Ln(wa));return rn(a,{b:_(ya,a.v(n),t,a.b)})}),Dl=c(function(n,r){var e=n.a,a=n.b,t=function(o){return G(_(yl,a,function(i){return G(l(En,0,i)+1)},l(En,bl(pl),o)))};return _(ya,e,t,r)}),Ml=c(function(n,r){var e=r.aj,a=r.am;return{aj:e,am:_(_n,Dl,a,l(_l,e,n))}}),Da=c(function(n,r){if(n.b){var e=n.a,a=n.b;return l(Da,a,l(Ml,e,r))}else return r}),Hl=c(function(n,r){return l(Da,r,gl(n))}),Al=c(function(n,r){n:for(;;)if(r.b){var e=r.a,a=r.b;if(n(e))return!0;var t=n,o=a;n=t,r=o;continue n}else return!1}),Ll=c(function(n,r){return!(n.X&&l(Al,ri(r),n.ad))}),Ma=c(function(n,r){switch(n.$){case 0:var e=function(){var p=r.S;if(p.$===1){var C=al(r.V),y=l(En,1,aa(r.af));return w(C,l(Hl,y,C))}else{var L=p.a;return w(r.ad,L)}}(),a=e.a,t=e.b,o=rn(r,{ad:a,S:G(t)}),i=l(Qi,yi,_(pa,100,Ll(o),hl(t)));return w(o,i);case 1:var u=n.a;if(u.$===1)return w(rn(r,{al:!0}),Sn);var s=u.a,f=r.W?Ei(s):s;return w(rn(r,{al:!1,an:l(F,f,r.an)}),Sn);case 2:return w(r,l(Gi,$(["text/plain"]),Ci));case 3:var v=n.a;return w(r,l(pn,$a,dl(v)));case 4:var m=n.a;return w(rn(r,{V:l(En,"",l(Ln,wa,l(Xr,m,da))),ag:m,S:H}),Sn);case 5:var g=n.a;return w(rn(r,{V:g,ag:"zcustom",S:H}),Sn);case 6:var d=n.a;return w(rn(r,{af:d,S:H}),Sn);case 7:return w(rn(r,{W:!r.W}),Sn);default:return w(rn(r,{X:!r.X}),Sn)}}),El=function(n){var r={ad:h,V:"",af:"3",ag:"",al:!1,W:!0,X:!0,an:h,S:H};return l(Ma,va("namur"),r)},Fl=pe,Rl=Fl(h),Pl=function(n){return Rl},Tl={$:2},kl={$:0},Gl=function(n){return{$:6,a:n}},Wl={$:7},Vl={$:8},Ol=P("a"),Jl=P("br"),Ha=P("button"),Ul=he,Aa=c(function(n,r){return l(Me,n,Ul(r))}),La=Aa("checked"),Ea=P("div"),Zr=P("em"),br=P("fieldset"),Il=he,wn=c(function(n,r){return l(Me,n,Il(r))}),Fn=wn("htmlFor"),Nl=P("h1"),jl=function(n){return l(wn,"href",eo(n))},Rn=wn("id"),xr=P("input"),Pn=P("label"),pr=P("legend"),zl=wn("min"),Kl=function(n){return{$:0,a:n}},Fa=De,ql=c(function(n,r){return l(Fa,n,Kl(r))}),Sr=function(n){return l(ql,"click",Nr(n))},Yl=function(n){return w(n,!0)},Ql=function(n){return{$:1,a:n}},Xl=c(function(n,r){return l(Fa,n,Ql(r))}),Zl=Lt,xl=c(function(n,r){return _(hr,Zl,r,n)}),nu=At,ru=l(xl,$(["target","value"]),nu),ne=function(n){return l(Xl,"input",l(Ir,Yl,l(Ir,n,ru)))},eu=P("option"),z=P("p"),au=function(n){return l(He,"rows",cr(n))},tu=P("select"),ou=Aa("selected"),iu=function(n){return $([n])},lu=ro,Tn=lu,uu=wn("target"),su=Fr,A=su,cu=P("textarea"),re=wn("type"),fu=wn("value"),ee=fu,vu=c(function(n,r){return n?$([r]):h}),$u=function(n){return l(Ea,$([l(Tn,"padding","1em")]),$([l(Nl,h,$([A("Phrase Generator")])),l(br,h,$([l(pr,h,$([A("Corpus")])),l(z,h,$([A("A corpus is the list of words and phrases that the model will learn from, and try to emulate.")])),l(z,h,$([l(Pn,$([Fn("presets")]),$([A("Select an existing corpus: ")])),l(tu,$([Rn("presets"),ne(va)]),l(Mn,function(r){var e=r.a,a=r.b,t=a.a;return l(eu,$([ee(e),ou(qn(e,n.ag))]),$([A(t)]))},ur(da)))])),l(z,h,$([l(Pn,$([Fn("load-from-file")]),$([A("Or load one from a file: ")])),l(Ha,$([Rn("load-from-file"),Sr(Tl)]),$([A("Load corpus from file")]))])),l(z,h,$([l(Pn,$([Fn("corpus")]),$([A("Or modify the current one right here: ")])),l(Jl,h,h),l(cu,$([Rn("corpus"),au(7),ne($a),ee(n.V)]),h)]))])),l(br,h,$([l(pr,h,$([A("Model (N-Gram)")])),l(z,h,$([A("This model generates phrases character-by-character.  It uses the previous "),l(Zr,h,$([A("N")])),A(" characters to make a decision about the next one, based on what it learnt from the corpus.")])),l(z,h,$([l(Pn,$([Fn("param-n")]),$([l(Zr,h,$([A("N")])),A(" = ")])),l(xr,$([Rn("param-n"),re("number"),l(Tn,"width","2.5em"),l(Tn,"text-align","right"),zl("1"),ee(n.af),ne(Gl)]),h)])),l(z,h,$([A("Smaller "),l(Zr,h,$([A("N")])),A(" gives more diversity, but the results will also be more nonsensical.")]))])),l(br,h,$([l(pr,h,$([A("Post-processing")])),l(z,h,$([l(xr,$([Rn("param-capitalize"),re("checkbox"),La(n.W),Sr(Wl)]),h),l(Pn,$([Fn("param-capitalize")]),$([A(" Capitalize results")]))])),l(z,h,$([l(xr,$([Rn("param-exclude-corpus"),re("checkbox"),La(n.X),Sr(Vl)]),h),l(Pn,$([Fn("param-exclude-corpus")]),$([A(" Exclude results that exist in the corpus")]))]))])),l(br,h,Yn($([l(pr,h,$([A("Results")])),l(z,h,$([l(Ha,$([Sr(kl)]),$([A("Generate!")]))]))]),Yn(l(vu,n.al,l(z,$([l(Tn,"color","darkred")]),$([A("Could not generate something not in the corpus.  Maybe try a less constrained model?")]))),l(Mn,l(Nn,l(Nn,Ea(h),iu),A),n.an)))),l(z,$([l(Tn,"font-size","0.9em"),l(Tn,"text-align","right")]),$([l(Ol,$([jl("https://github.com/xlambein/phrase-generator"),uu("_blank")]),$([A("Source code on GitHub :>")]))]))]))},mu=Bi({bV:El,ch:Pl,cm:Ma,cn:$u});Zt({Main:{init:mu(Nr(0))(0)}})})(this);
