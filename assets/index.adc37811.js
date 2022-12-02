(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function it(e){return e=Object.create(e),"HTMLElement"in e||Object.defineProperty(e,"HTMLElement",{value:class{constructor(){throw Error("Current context does not support defining custom elements")}}}),"document"in e||Object.defineProperty(e,"document",{value:{importNode:()=>{throw Error("Current context does not support importing nodes")}}}),e}const a=typeof window=="object"?window:it(globalThis),ke=new Map;function be(e){let t=ke.get(e);return t===void 0&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),ke.set(e,t)),t}function at(e,t,n={}){return e.dispatchEvent(new a.CustomEvent(t,{bubbles:!1,...n}))}function Ie(e){return`<${String(e.tagName).toLowerCase()}>`}function B(e,t){e.nodeType===a.Node.ELEMENT_NODE&&(t(e),e.shadowRoot&&B(e.shadowRoot,t));const n=a.document.createTreeWalker(e,a.NodeFilter.SHOW_ELEMENT,null,!1);for(;n.nextNode();){const o=n.currentNode;t(o),o.shadowRoot&&B(o.shadowRoot,t)}}const ye=Promise.resolve(),lt=new WeakMap,de=B.name==="walkInShadow",K=new Set;function we(e){K.size||ye.then(dt),K.add(e)}function ct(e){K.delete(e)}function dt(){for(const e of K)try{e()}catch(t){console.error(t)}K.clear()}const te=new WeakMap,V=new Set;function Fe(e){const t=new Set,n=t.values();for(;e;){if(e.resolved=!1,e.deps){for(const o of e.deps)o.contexts.delete(e);e.deps.clear()}if(e.contexts)for(const o of e.contexts)V.has(o)||(t.add(o),e.contexts.delete(o));e.observe&&we(e.observe),e=n.next().value}}function oe(e,t){let n=te.get(e);n||(n=new Map,te.set(e,n));let o=n.get(t);return o||(o={key:t,target:e,value:void 0,lastValue:void 0,resolved:!1,contexts:void 0,deps:void 0,observe:void 0},n.set(t,o)),o}let L=null;function Ve(e,t,n){const o=oe(e,t);if(L&&(o.contexts||(o.contexts=new Set),L.deps||(L.deps=new Set),o.contexts.add(L),L.deps.add(o)),o.resolved)return o.value;const s=L;try{if(V.has(o))throw Error(`Circular get invocation is forbidden: '${t}'`);L=o,V.add(o),o.value=n(e,o.value),o.resolved=!0,L=s,V.delete(o)}catch(r){throw L=s,V.delete(o),L&&(L.deps.delete(o),o.contexts.delete(L)),r}return o.value}function ft(e,t,n,o){const s=oe(e,t),r=n(e,o,s.value);r!==s.value&&(s.value=r,Fe(s))}function He(e,t,n,o){const s=oe(e,t);return s.observe=()=>{const r=Ve(e,t,n);r!==s.lastValue&&(o(e,r,s.lastValue),s.lastValue=r)},we(s.observe),()=>{ct(s.observe),s.observe=void 0,s.lastValue=void 0}}const X=new Set;function ut(e){X.size||setTimeout(()=>{for(const t of X)if(!t.contexts||t.contexts.size===0){if(t.deps)for(const o of t.deps)o.contexts.delete(t);te.get(t.target).delete(t.key)}X.clear()}),X.add(e)}function Be(e,t){Fe(e),t.clearValue&&(e.value=void 0,e.lastValue=void 0),t.deleteEntry&&ut(e)}function Ke(e,t,n={}){const o=oe(e,t);Be(o,n)}function pt(e,t={}){const n=te.get(e);if(n)for(const o of n.values())Be(o,t)}function xe(e,t){return{get:t?n=>{const o=e(n),s=n.shadowRoot||n.attachShadow({mode:"open",delegatesFocus:e.delegatesFocus||!1});return()=>(o(n,s),s)}:n=>{const o=e(n);return()=>(o(n,n),n)},observe(n,o){o()}}}function ht(e,t){const n=e.value;return{get:(o,s)=>s===void 0?o.getAttribute(t)||n:s,set:(o,s)=>(s=String(s),s?o.setAttribute(t,s):o.removeAttribute(t),s),connect:n!==""?(o,s,r)=>(!o.hasAttribute(t)&&o[s]===n&&o.setAttribute(t,n),e.connect&&e.connect(o,s,r)):e.connect,observe:e.observe}}function mt(e,t){const n=e.value;return{get:(o,s)=>s===void 0?Number(o.getAttribute(t)||n):s,set:(o,s)=>(s=Number(s),o.setAttribute(t,s),s),connect:(o,s,r)=>(!o.hasAttribute(t)&&o[s]===n&&o.setAttribute(t,n),e.connect&&e.connect(o,s,r)),observe:e.observe}}function gt(e,t){const n=e.value;return{get:(o,s)=>s===void 0?o.hasAttribute(t)||n:s,set:(o,s)=>(s=Boolean(s),s?o.setAttribute(t,""):o.removeAttribute(t),s),connect:n===!0?(o,s,r)=>(!o.hasAttribute(t)&&o[s]===n&&o.setAttribute(t,""),e.connect&&e.connect(o,s,r)):e.connect,observe:e.observe}}function vt(e,t){const n=e.value;return{get:(o,s)=>s===void 0?o.getAttribute(t)||n:s,set:(o,s)=>s,connect:e.connect,observe:e.observe}}function bt(e,t){const n=typeof t.value,o=be(e);switch(n){case"string":return ht(t,o);case"number":return mt(t,o);case"boolean":return gt(t,o);case"undefined":return vt(t,o);default:throw TypeError(`Invalid default value for '${e}' property - it must be a string, number, boolean or undefined: ${n}`)}}const J=new WeakMap;function fe(e,t){if(t){if(e===t.hybrids)return t;for(const s of Object.keys(t.hybrids))delete t.prototype[s]}else t=class extends a.HTMLElement{connectedCallback(){for(const r of Object.keys(this)){const i=this[r];delete this[r],this[r]=i}const s=new Set;J.set(this,s),we(()=>{if(s===J.get(this)){for(const r of this.constructor.connects)s.add(r(this));for(const r of this.constructor.observers)s.add(r(this))}})}disconnectedCallback(){const s=J.get(this);for(const r of s)r&&r();J.delete(this),pt(this)}};t.hybrids=e;const n=new Set,o=new Set;for(const s of Object.keys(e)){if(s==="tag")continue;let r=e[s];const i=typeof r;if(i==="function")s==="render"?r=xe(r,!0):s==="content"?r=xe(r):r={get:r};else if(i!=="object"||r===null)r={value:r};else if(r.set){if(hasOwnProperty.call(r,"value"))throw TypeError(`Invalid property descriptor for '${s}' property - it must not have 'value' and 'set' properties at the same time.`);const c=be(s),u=r.get||((f,p)=>p);r.get=(f,p)=>(p===void 0&&(p=r.set(f,f.getAttribute(c)||p)),u(f,p))}if(hasOwnProperty.call(r,"value"))r=bt(s,r);else if(!r.get)throw TypeError(`Invalid descriptor for '${s}' property - it must contain 'value' or 'get' option`);Object.defineProperty(t.prototype,s,{get:function(){return Ve(this,s,r.get)},set:r.set&&function(u){ft(this,s,r.set,u)},enumerable:!0,configurable:!0}),r.connect&&n.add(c=>r.connect(c,s,()=>{Ke(c,s)})),r.observe&&o.add(c=>He(c,s,r.get,r.observe))}return t.connects=n,t.observers=o,t}const I=new Map;function yt(e){I.size||ye.then(()=>{B(a.document.body,t=>{if(I.has(t.constructor)){const n=I.get(t.constructor),o=t.constructor.hybrids;t.disconnectedCallback();for(const s of Object.keys(o)){const r=typeof o[s],i=r!=="object"&&r!=="function"&&o[s]!==n[s];Ke(t,s,{clearValue:i})}t.connectedCallback()}}),I.clear()}),I.set(e,e.hybrids)}function wt(e){if(!e.tag)throw TypeError("Error while defining hybrids: 'tag' property with dashed tag name is required");const t=a.customElements.get(e.tag);if(t){if(t.hybrids)return yt(t),fe(e,t),Object.freeze(e);throw TypeError(`Custom element with '${e.tag}' tag name already defined outside of the hybrids context`)}return a.customElements.define(e.tag,fe(e)),Object.freeze(e)}const se=Object.freeze(Object.assign(wt,{compile:e=>fe(e)})),ue=Symbol("router.connect"),T=new WeakMap,Ee=new WeakMap,A=new WeakMap,qe=new WeakMap;let _=null;const $e=new Set;let Ge=!1;function Et(e=!0){Ge=!!e}const pe=new WeakMap,Qe=new WeakMap;function $t(e){const t=a.document.activeElement;Qe.set(e,_.contains(t)&&t);const n=new Map,o=a.document.scrollingElement;n.set(o,{left:o.scrollLeft,top:o.scrollTop}),B(e,s=>{(s.scrollLeft||s.scrollTop)&&n.set(s,{left:s.scrollLeft,top:s.scrollTop})}),pe.set(e,n)}function Y(e){if(e.tabIndex===-1){const t=e.style.outline;e.tabIndex=0,e.style.outline="none",e.addEventListener("blur",()=>{e.removeAttribute("tabindex"),e.style.outline=t},{once:!0})}e.focus({preventScroll:!0})}function Xe(e){const t=a.document.activeElement;Y(Qe.get(e)||(_.contains(t)?t:_));const n=pe.get(e);if(n){const o=T.get(e),r=a.history.state.find(c=>c.id===o.id),i=r&&r.params.scrollToTop;for(const[c,{left:u,top:f}]of n)c.scrollLeft=i?0:u,c.scrollTop=i?0:f;pe.delete(e)}else{const o=a.document.scrollingElement;o.scrollLeft=0,o.scrollTop=0}}function ne(e){return e===!0?1:e||""}const Z=["scrollToTop"];function St(e,t){const[n,o=""]=e.split("?"),s=o?o.split(","):[],r=n.replace(/^\//,"").split("/"),i=r.reduce((c,u)=>{if(u.startsWith(":")){const f=u.slice(1);if(s.includes(f))throw Error(`The '${f}' already used in search params`);if(c.includes(f))throw Error(`The '${f}' already used in pathname`);c.push(f)}return c},[]);return{browserUrl:e,pathnameParams:i,paramsKeys:[...s,...i],url(c,u=!1){let f="";for(let l of r){if(l.startsWith(":")){const m=l.slice(1);if(!hasOwnProperty.call(c,m))throw Error(`The '${m}' parameter must be defined for <${t}>`);l=ne(c[m])}f+=`/${l}`}const p=new URL(f,a.location.origin);for(const l of Object.keys(c))i.includes(l)||u&&(Z.includes(l)||!s.includes(l))||p.searchParams.append(l,ne(c[l]));return p},match(c){const u={},f=c.pathname.replace(/^\//,"").split("/");if(f.length!==r.length)return null;for(let p=0;p<f.length;p+=1){const l=f[p],m=r[p];if(m.startsWith(":")){const w=m.slice(1);u[w]=l}else if(l!==m)return null}for(const[p,l]of c.searchParams)u[p]=l;return u}}}function Q(e,t){return e.stack.some(n=>n===t?!0:Q(n,t))}function Je(e){e.browserUrl&&$e.add(e);for(const t of e.stack)Je(t)}function he(e,t,n=null,o=null){return typeof e=="function"&&(e=e()),e=[].concat(e),e.map(s=>{const r=T.get(s);if(r&&Q(r,n))throw Error(`<${r.id}> cannot be in the stack of <${n.id}>, as it is an ancestor in the stack tree`);return xt(s,t,n,o)})}function kt(e,t){const n=Object.values(e).map(o=>qe.get(o)).filter(o=>o);if(n.length){if(n.length>1)throw TypeError(`<${t.id}> must contain at most one nested router, found: ${n.length}`);if(t.dialog)throw TypeError(`Nested routers are not supported in dialogs. Remove the router property definition from <${t.id}>`);if(t.browserUrl)throw TypeError(`A view with nested router must not have the url option. Remove the url option from <${t.id}>`)}return n[0]}function x(e){const t=a.customElements.get(e);return T.get(t)}function xt(e,t,n,o){const s=e.tag;let r=x(s);if(r&&r.hybrids!==e&&(r=null),r)r.parent=n,r.nestedParent=o;else{const c=a.customElements.get(s);if(!c||c.hybrids!==e)throw Error(`<${s}> view must be defined by 'define()' function before it can be used in router factory`);let u=null;const f={dialog:!1,guard:!1,multiple:!1,replace:!1,...e[ue]},{connects:p}=c;!o&&!f.dialog&&p.add(Xe),f.dialog&&p.add(d=>{const b=v=>{v.key==="Escape"&&(v.stopPropagation(),a.history.go(-1))},y=v=>{!d.contains(v.target)&&v.target!==d&&Y(d)},E=a.document.activeElement,g=_;return g.addEventListener("focusin",y),g.addEventListener("focusout",y),d.addEventListener("keydown",b),Y(d),()=>{g.removeEventListener("focusin",y),g.removeEventListener("focusout",y),d.removeEventListener("keydown",b),Y(E)}});const l=[];for(const d of Object.keys(c.prototype))Object.getOwnPropertyDescriptor(c.prototype,d).set&&l.push(d);if(f.url){if(f.dialog)throw Error(`The 'url' option is not supported for dialogs - remove it from <${s}>`);if(typeof f.url!="string")throw TypeError(`The 'url' option in <${s}> must be a string: ${typeof f.url}`);u=St(f.url,s);for(const d of u.paramsKeys){const b=Object.getOwnPropertyDescriptor(c.prototype,d);if(!b||!b.set)throw Error(`'${d}' parameter from the url is not ${b?"writable":"defined"} in <${s}>`)}}const m=l.filter(d=>!t.params.includes(d)&&!Z.includes(d)),w=u?m.filter(d=>!u.pathnameParams.includes(d)):m;p.add(d=>He(d,ue,b=>{const y={};for(const E of m){const g=ne(b[E]).toString();y[E]=g!==void 0&&b[E]!==e[E]?String(g):void 0}return y},(b,y,E)=>{if(!E)return;const g=a.history.state;let v=g[0];for(;v.id!==s&&v.nested;)v=v.nested;y={...v.params,...y};for(const $ of w)y[$]===void 0&&delete y[$];a.history.replaceState([r.getEntry(y),...g.slice(1)],"",u?r.url(y,!0):"")}));let h;if(f.guard&&(h=()=>{try{return f.guard()}catch(d){return console.error(d),!1}}),r={id:s,hybrids:e,dialog:f.dialog,multiple:f.multiple,replace:f.replace,guard:h,parent:n,nestedParent:o,nestedRoots:void 0,parentsWithGuards:void 0,stack:[],...u||{url(d){const b=new URL("",a.location.origin);for(const y of Object.keys(d))b.searchParams.append(y,ne(d[y]));return new URL(`${t.url}#@${s}${b.search}`,a.location.origin)},match(d){const b={};for(const[y,E]of d.searchParams)(l.includes(y)||Z.includes(y))&&(b[y]=E);return b}},create(){const d=new c;return T.set(d,r),d},getEntry(d={},b){let y={};for(const v of Object.keys(d))l.includes(v)&&(y[v]=d[v]);const E={id:s,params:y,...b},g=r.parentsWithGuards.find(v=>!v.guard());if(g)return g.getEntry(d,{from:E});if(r.guard&&r.guard())return{...r.stack[0].getEntry(d)};if(r.nestedParent)return r.nestedParent.getEntry(d,{nested:E});for(const v of Z)hasOwnProperty.call(d,v)&&(E.params[v]=d[v]);return E}},T.set(e,r),T.set(c,r),n&&!n.stack.includes(r)&&n.stack.push(r),f.stack){if(f.dialog)throw Error(`The 'stack' option is not supported for dialogs - remove it from <${s}>`);he(f.stack,t,r,o)}}for(n||Je(r),r.parentsWithGuards=[];n;)n.guard&&r.parentsWithGuards.unshift(n),n=n.parent;const i=kt(e,r);return i&&(r.nestedRoots=he(i.views,{...t,...i},r,r),r.stack=r.stack.concat(r.nestedRoots)),r}function Nt(e,t={}){const n=T.get(e);return n?n.url(t):""}function Ne(e){const t={};for(;e;)Object.assign(t,e.params),e=e.nested;return t}function Tt({nested:e=!1,scrollToTop:t=!1}={}){const n=a.history.state;if(!n)return"";if(n.length>1){const r=n[0];let i=1,c=n[i];if(e)for(;c.nested;)c=c.nested;else for(;r.id===c.id&&i<n.length-1;)i+=1,c=n[i];const u=Ne(n[i]);return t?u.scrollToTop=!0:delete u.scrollToTop,x(c.id).url(u)}let o=n[0];if(e)for(;o.nested;)o=o.nested;let s=x(o.id).parent;if(s){for(;s&&s.guard;)s=s.parent;if(s)return s.url(Ne(n[0]))}return""}function Lt(e={}){const t=a.history.state;if(!t)return"";const n=t[0];if(n.from)return x(n.from.id).url({...n.from.params,...e});const o=x(n.id);return o.stack[0]?o.stack[0].url(e):""}function Ot(e){const t=a.history.state;if(!t)return"";let n=t[0];for(;n.nested;)n=n.nested;return x(n.id).url({...n.params,...e})}function _t(e,{stack:t=!1}={}){const n=a.history.state;return n?(e=[].concat(e),e.some(o=>{const s=T.get(o);if(!s)throw TypeError(`Provided view is not connected to the router: ${o}`);let r=n[0];for(;r;){const i=x(r.id);if(i===s||t&&Q(s,i))return!0;r=r.nested}return!1})):!1}function Ye(e){let t;const[n,o]=e.hash.split("?");if(n&&n.match(/^#@.+-.+/)&&(t=x(n.split("@")[1]),e=new URL(`?${o}`,a.location.origin)),!t){for(const s of $e){const r=s.match(e);if(r)return s.getEntry(r)}return null}return t.getEntry(t.match(e))}function H(e){if(e.defaultPrevented)return;let t;if(e.type==="click"){if(e.ctrlKey||e.metaKey)return;const n=e.composedPath().find(o=>o instanceof a.HTMLAnchorElement);n&&(t=new URL(n.href,a.location.origin))}else t=new URL(e.target.action,a.location.origin);if(t&&t.origin===a.location.origin){const n=Ye(t);n&&(e.preventDefault(),at(_,"navigate",{bubbles:!0,detail:{entry:n,url:t}}))}}let ie;function jt(e,t){e.preventDefault(),ie=t;const n=e.composedPath(),o={type:e.type,ctrlKey:e.ctrlKey,metaKey:e.metaKey,target:e.target,defaultPrevented:!1,preventDefault:()=>{},composedPath:()=>n};return t.then(()=>{t===ie&&(H(o),ie=null)})}function Ze(e,t,n){let o=A.get(e);const s=[];for(const[u,f]of t.entries())(u===0||t[u-1].id!==f.id||x(f.id).multiple)&&s.push(f);const r=o.length-s.length;o=s.map((u,f)=>{const p=o[f+r],l=x(u.id);let m;if(p){const w=T.get(p);if(l.id!==w.id||f===0&&l.replace)return l.create();m=p}else m=l.create();return f===0&&m===p&&r===0&&e===_&&u.params.scrollToTop&&Xe(m),m}),A.set(e,o);const i=o[0],c=Ee.get(i);for(const[u,f]of Object.entries(t[0].params))u in i&&(i[u]=f);for(const u of n.params)u in i&&(i[u]=e[u]);c&&c()}function Mt(e){const t=[];for(let[s,r]of a.history.state.entries()){let i=0;for(;r;)t[i]=t[i]||[],t[i][s]=r,r=r.nested,i+=1}let n=0,o=0;for(;e;){const s=x(e.id);let r=n;for(;r<t[o].length;r+=1){const i=t[o][r];if(s.dialog)return i.id!==e.id?-1:n;if(i.id===e.id)if(s.multiple){if(s.pathnameParams&&s.pathnameParams.every(u=>e.params[u]===i.params[u])||Object.entries(e.params).every(([u,f])=>i.params[u]===f)){n=r;break}}else{n=r;break}const c=x(i.id);if(Q(c,s)){if(s.multiple&&t[o][0].id===e.id){n-=1;break}if(r>0){n=r-1;break}else return c.guard?0:-1}}r===t[o].length&&(n=t[o].length-1),e=e.nested,o+=1}return n}function Pt(e,t,n){function o(){a.history.scrollRestoration==="manual"&&(a.history.scrollRestoration="auto")}function s(){Ze(e,a.history.state,n),t(),ye.then(o)}function r(l,m,w){const h=a.history.state,d=a.history.state[l],b=l<h.length-1&&h.length>2?1:0;l+=b,d&&m.id===d.id&&(m={...d,...m});const y=E=>{E&&(a.removeEventListener("popstate",y),a.addEventListener("popstate",s));const g=b?"pushState":"replaceState",v=[m,...h.slice(l+(b?0:1))];b&&(a.history.scrollRestoration="manual"),a.history[g](v,"",w),s()};l?(a.removeEventListener("popstate",s),a.addEventListener("popstate",y),a.history.go(-l)):y()}function i(l){const m=a.history.state;let w=l;for(;w.nested;)w=w.nested;const h=x(w.id),d=h.browserUrl?h.url(w.params,!0):n.url,b=Mt(l);if(b>-1)r(b,l,d);else{let y=A.get(e);$t(y[0]),a.history.scrollRestoration="manual",a.history.pushState([l,...m],"",d),s()}}function c(l){i(l.detail.entry)}if(_)throw Error(`An element with root router already connected to the document: <${_.tagName.toLowerCase()}>`);let u;try{u=he(n.views,n),_=e,Ee.set(e,s)}catch(l){throw console.error(`Error while connecting router in <${e.tagName.toLowerCase()}>:`),l}const f=a.history.state,p=new URL(a.location.href);if(f){const l=A.get(e);let m;for(m=f.length-1;m>=0;m-=1){let w=f[m];for(;w;){const h=x(w.id);if(!h||h.dialog&&l.length===0||!u.includes(h)&&!u.some(d=>Q(d,h)))break;w=w.nested}if(w)break}if(m>-1){const w=f[m+1];r(f.length-m-1,w||u[0].getEntry(f[0].params),n.url)}else{let w=f[0];for(;w.nested;)w=w.nested;const d=x(w.id).getEntry(w.params);i(d)}}else{const l=Ye(p)||u[0].getEntry();a.history.replaceState([l],"",n.url),s()}return a.addEventListener("popstate",s),e.addEventListener("click",H),e.addEventListener("submit",H),e.addEventListener("navigate",c),()=>{a.removeEventListener("popstate",s),e.removeEventListener("click",H),e.removeEventListener("submit",H),e.removeEventListener("navigate",c),$e.clear(),_=null;const l=a.history.state&&a.history.state.length;l>1&&(a.history.go(1-l),a.history.replaceState(f,"",p))}}function Ct(e,t,n){const o=T.get(e);function s(){return a.history.state.map(i=>{for(;i;){if(i.id===o.id)return i.nested;i=i.nested}return i}).filter(i=>i)}function r(){Ze(e,s(),n),t()}if(!s()[0]){const i=a.history.state;a.history.replaceState([o.nestedRoots[0].getEntry(i[0].params),...i.slice(1)],"")}r(),Ee.set(e,r)}function Rt(e,t){t={url:a.location.href.replace(/#.*$/,""),params:[],...t,views:e};const n={get:o=>{const s=A.get(o)||[];return s.slice(0,s.findIndex(r=>!T.get(r).dialog)+1).reverse()},connect:(o,s,r)=>{for(const i of t.params)if(!(i in o))throw Error(`Property '${i}' for global parameters is not defined in <${o.tagName.toLowerCase()}>`);return A.has(o)||A.set(o,[]),T.has(o)?Ct(o,r,t):Pt(o,r,t)},observe:Ge&&((o,s,r)=>{const i=s.length-1,c=s[i];if(r&&c===r[i])return;let u=T.get(o),f=a.history.state[0],p=0;for(;u;)p+=1,f=f.nested,u=u.nestedParent;console.groupCollapsed(`[${o.tagName.toLowerCase()}]: navigated to <${f.id}> ($$${p})`);for(const[l,m]of Object.entries(f.params))console.log(`%c${l}:`,"font-weight: bold",m);console.groupEnd(),a[`$$${p}`]=c})};return qe.set(n,t),n}const et=Object.freeze(Object.assign(Rt,{connect:ue,debug:Et,url:Nt,backUrl:Tt,guardUrl:Lt,currentUrl:Ot,resolve:jt,active:_t})),me=new WeakMap;function M(e){let t=me.get(e);return t||(me.set(e,t={}),t)}function re(e){let t;for(;e&&(t=M(e))&&t.endNode;)e=t.endNode;return e}function q(e){const t=M(e);if(t.styles&&t.styles(),e.nodeType===a.Node.TEXT_NODE){if(t.startNode){const n=re(t.endNode);let o=t.startNode;const s=n.nextSibling;for(;o;){const r=o.nextSibling;o.parentNode.removeChild(o),o=r!==s&&r}}}else{let n=e.childNodes[0];for(;n;)e.removeChild(n),n=e.childNodes[0]}me.delete(e)}const At=Date.now(),P=(e=0)=>`H-${At}-${e}`,Se=!!a.document.adoptedStyleSheets,ae=/^\d+$/,Wt={block:(e,t)=>({display:"block","text-align":t}),inline:({display:e})=>({display:`inline${e?`-${e}`:""}`}),contents:{display:"contents"},hidden:{display:"none"},...["row","row-reverse","column","column-reverse"].reduce((e,t)=>(e[t]=(n,o="nowrap")=>({display:"flex","flex-flow":`${t} ${o}`}),e),{}),grow:(e,t=1)=>({"flex-grow":t}),shrink:(e,t=1)=>({"flex-shrink":t}),basis:(e,t)=>({"flex-basis":S(t)}),order:(e,t=0)=>({order:t}),grid:(e,t="1",n="",o="",s="")=>({display:"grid",...["columns","rows"].reduce((r,i)=>{const c=i==="columns"?t:n;return r[`grid-template-${i}`]=c&&c.split("|").map(u=>u.match(ae)?`repeat(${u}, minmax(0, 1fr))`:S(u)).join(" "),r},{}),"grid-auto-flow":`${o} ${s&&"dense"}`}),area:(e,t="",n="")=>({"grid-column":t.match(ae)?`span ${t}`:t,"grid-row":n.match(ae)?`span ${n}`:n}),gap:(e,t=1,n="")=>({"column-gap":S(t),"row-gap":S(n||t)}),items:(e,t="start",n="")=>({"place-items":`${t} ${n}`}),content:(e,t="start",n="")=>({"place-content":`${t} ${n}`}),self:(e,t="start",n="")=>({"place-self":`${t} ${n}`}),center:{"place-items":"center","place-content":"center"},size:(e,t,n=t)=>({width:S(t),height:S(n)}),width:(e,t,n,o)=>({width:S(t),"min-width":S(n),"max-width":S(o)}),height:(e,t,n,o)=>({height:S(t),"min-height":S(n),"max-height":S(o)}),ratio:(e,t)=>({"aspect-ratio":t}),overflow:(e,t="hidden",n="")=>{const o=n?`-${t}`:"",s=n||t;return{[`overflow${o}`]:s,...s==="scroll"?{"flex-grow":e["flex-grow"]||1,"flex-basis":0,"overscroll-behavior":"contain","--webkit-overflow-scrolling":"touch"}:{}}},margin:(e,t="1",n,o,s)=>t.match(/top|bottom|left|right/)?{[`margin-${t}`]:S(n||"1")}:{margin:`${S(t)} ${S(n)} ${S(o)} ${S(s)}`},absolute:{position:"absolute"},relative:{position:"relative"},fixed:{position:"fixed"},sticky:{position:"sticky"},static:{position:"static"},inset:(e,t=0)=>{const n=S(t);return{top:n,right:n,bottom:n,left:n}},top:(e,t=0)=>({top:S(t)}),bottom:(e,t=0)=>({bottom:S(t)}),left:(e,t=0)=>({left:S(t)}),right:(e,t=0)=>({right:S(t)}),layer:(e,t=1)=>({"z-index":t})},Dt={min:"min-content",max:"max-content",fit:"fit-content",full:"100%"},zt={portrait:"orientation: portrait",landscape:"orientation: landscape"};function S(e){return e=Dt[e]||e,/^-?\d+(\.\d+)*$/.test(String(e))?`${e*8}px`:e||""}let W;function tt(){if(W)return W;if(Se)W=new a.CSSStyleSheet;else{const e=a.document.createElement("style");e.appendChild(a.document.createTextNode("")),a.document.head.appendChild(e),W=e.sheet}return W.insertRule(":host([hidden]) { display: none; }"),W}const Te=new WeakMap;let ge=new WeakSet;function Ut(e){const t=e.getRootNode();if(ge.has(t))return;const n=tt();if(Se)t.adoptedStyleSheets=[...t.adoptedStyleSheets,n];else{if(t===a.document)return;let o=Te.get(t);o||(o=a.document.createElement("style"),t.appendChild(o),Te.set(t,o));let s="";for(let r=0;r<n.cssRules.length;r++)s+=n.cssRules[r].cssText;o.textContent=s}ge.add(t)}const Le=new Map;function Oe(e,t,n,o){let s=Le.get(e);s||(s=`l-${Math.random().toString(36).substr(2,5)}`,Le.set(e,s)),Se||(ge=new WeakSet);const r=tt(),[i,c=""]=t.split("@"),u=Object.entries(n.split(" ").reduce((p,l)=>{const[m,...w]=l.split(":"),h=Wt[m];if(!h)throw TypeError(`Unsupported layout rule: '${m}'`);return Object.assign(p,typeof h=="function"?h(p,...w.map(d=>d.match(/--.*/)?`var(${d})`:d)):h)},{})).reduce((p,[l,m])=>m!==void 0&&m!==""?p+`${l}: ${m};`:p,""),f=c.split(":").reduce((p,l)=>l===""?p:p+` and (${zt[l]||`min-width: ${l}`})`,"@media screen");if(o){const p=`.${s}-s${i}`,l=`.${s}-c${i}`;r.insertRule(c?`${f} { :host(${p}) { ${u} } }`:`:host(${p}) { ${u} }`,r.cssRules.length),r.insertRule(c?`${f} { ${l} { ${u} } }`:`${l} { ${u} }`,r.cssRules.length)}else{const p=`.${s}${i}`;r.insertRule(c?`${f} { ${p} { ${u} } }`:`${p} { ${u} }`,r.cssRules.length)}return s}const ve=new WeakMap;function It(e,t){const n=M(e),o=n.startNode,s=re(n.endNode);t.parentNode.insertBefore(e,t.nextSibling);let r=e,i=o;for(;i;){const c=i.nextSibling;r.parentNode.insertBefore(i,r.nextSibling),r=i,i=c!==s.nextSibling&&c}}function Ft(e,t,n,o,s){let r=ve.get(t);const i=n.map((p,l)=>({id:hasOwnProperty.call(p,"id")?p.id:l,value:p,placeholder:null,available:!0}));if(ve.set(t,i),r){const p=new Set;for(const l of i)p.add(l.id);r=r.filter(l=>p.has(l.id)?!0:(q(l.placeholder),l.placeholder.parentNode.removeChild(l.placeholder),!1))}let c=t;const u=n.length-1,f=M(t);for(let p=0;p<i.length;p+=1){const l=i[p];let m;if(r){for(let w=0;w<r.length;w+=1)if(r[w].available&&r[w].id===l.id){m=r[w];break}}m?(m.available=!1,l.placeholder=m.placeholder,l.placeholder.previousSibling!==c&&It(l.placeholder,c),m.value!==l.value&&o(e,l.placeholder,l.value,m.value,s)):(l.placeholder=a.document.createTextNode(""),c.parentNode.insertBefore(l.placeholder,c.nextSibling),o(e,l.placeholder,l.value,void 0,s)),c=re(M(l.placeholder).endNode||l.placeholder),p===0&&(f.startNode=l.placeholder),p===u&&(f.endNode=c)}if(r)for(const p of r)p.available&&(q(p.placeholder),p.placeholder.parentNode.removeChild(p.placeholder))}function Vt(e,t,n){q(t);const o=M(t);o.startNode=o.endNode=n,t.parentNode.insertBefore(n,t.nextSibling)}function _e(e){const t=typeof e;if(t==="object"){if(Array.isArray(e))return"array";if(e instanceof a.Node)return"node"}return t}function G(e,t,n,o,s){const r=_e(n),i=_e(o);switch(i!=="undefined"&&r!==i&&(r!=="function"&&q(t),i==="array"?ve.delete(t):i!=="node"&&i!=="function"&&(t.textContent="")),r){case"array":Ft(e,t,n,G,s);break;case"node":Vt(e,t,n);break;case"function":s&&(n.useLayout=!0),n(e,t);break;default:t.textContent=r==="number"||n?n:""}}const le=new WeakMap;function Ht(e){return(t,n,o,s)=>{if(s){const r=le.get(n);r&&n.removeEventListener(e,r.get(s),s.options!==void 0?s.options:!1)}if(o){if(typeof o!="function")throw Error(`Event listener must be a function: ${typeof o}`);let r=le.get(n);r||(r=new WeakMap,le.set(n,r));const i=o.bind(null,t);r.set(o,i),n.addEventListener(e,i,o.options!==void 0?o.options:!1)}}}function Bt(e,t=new Set){if(Array.isArray(e))for(const n of e)n&&t.add(n);else if(e!==null&&typeof e=="object")for(const[n,o]of Object.entries(e))n&&o&&t.add(n);else e&&t.add(e);return t}const je=new WeakMap;function Kt(e,t,n){const o=je.get(t)||new Set,s=Bt(n);je.set(t,s);for(const r of s)t.classList.add(r),o.delete(r);for(const r of o)t.classList.remove(r)}const Me=new WeakMap;function qt(e,t,n){if(n===null||typeof n!="object")throw TypeError(`Style value must be an object in ${Ie(t)}:`,n);const o=Me.get(t)||new Map,s=new Map;for(const r of Object.keys(n)){const i=be(r),c=n[r];!c&&c!==0?t.style.removeProperty(i):t.style.setProperty(i,c),s.set(i,c),o.delete(i)}for(const r of o.keys())t.style[r]="";Me.set(t,s)}function Gt(e,t,n){if(t.substr(0,2)==="on"){const o=t.substr(2);return Ht(o)}switch(e){case"class":return Kt;case"style":return qt;default:{let o=!1;return(s,r,i)=>{if(o=o||!n&&!(r instanceof a.SVGElement)&&t in r,o)r[t]=i;else if(i===!1||i===void 0||i===null)r.removeAttribute(e);else{const c=i===!0?"":String(i);r.setAttribute(e,c)}}}}}const nt=P("(\\d+)"),F=new RegExp(`^${nt}$`),D=new RegExp(nt,"g"),Qt=/^[^A-Za-z]+$/;function Xt(e){let t=e[0],n=!1;for(let o=1;o<e.length;o+=1)n=n||e[o-1].match(/<\s*(table|tr|thead|tbody|tfoot|colgroup)([^<>]|"[^"]*"|'[^']*')*>\s*$/),t+=(n?`<!--${P(o-1)}-->`:P(o-1))+e[o],n=n&&!e[o].match(/<\/\s*(table|tr|thead|tbody|tfoot|colgroup)\s*>/);return t}function Jt(e){return e.replace(/\s*=\s*['"]*$/g,"").split(/\s+/).pop()}function Pe(e){return a.document.createTreeWalker(e,a.NodeFilter.SHOW_ELEMENT|a.NodeFilter.SHOW_TEXT|a.NodeFilter.SHOW_COMMENT,null,!1)}function Yt(e,t=0){e=e.replace(/(^[\n\s\t ]+)|([\n\s\t ]+$)+/g,"");let n=e.indexOf(`
`);if(n>-1){let o=0-t-2;for(n+=1;e[n]===" "&&n<e.length;n+=1)o+=1;return e.replace(/\n +/g,s=>s.substr(0,Math.max(s.length-o,1)))}return e}function Ce(e,t){const n=P(t);return`${Yt(e).split(`
`).filter(s=>s).map(s=>{const r=s.indexOf(n);return r>-1?`| ${s}
--${"-".repeat(r)}${"^".repeat(6)}`:`| ${s}`}).join(`
`).replace(D,"${...}")}`}const Re=new Map;function Zt(e){if(e.adoptedStyleSheets){let n;return o=>{const s=e.adoptedStyleSheets;o?(o=o.map(r=>{let i=r;return i instanceof a.CSSStyleSheet||(i=Re.get(r),i||(i=new a.CSSStyleSheet,i.replaceSync(r),Re.set(r,i))),i}),(!n||n.some((r,i)=>r!==o[i]))&&(e.adoptedStyleSheets=(n?s.filter(r=>!n.includes(r)):s).concat(o))):n&&(e.adoptedStyleSheets=s.filter(r=>!n.includes(r))),n=o}}let t;return n=>{if(n){t||(t=a.document.createElement("style"),e=re(e),e.nodeType===a.Node.TEXT_NODE?e.parentNode.insertBefore(t,e.nextSibling):e.appendChild(t));const o=[...n].join(`
/*------*/
`);t.textContent!==o&&(t.textContent=o)}else t&&(t.parentNode.removeChild(t),t=null)}}function en(e,t,n,o){let s=a.document.createElement("template");const r={},i=n?e:Xt(e);if(s.innerHTML=t?`<svg>${i}</svg>`:i,t){const h=s.content.firstChild;s.content.removeChild(h);for(const d of Array.from(h.childNodes))s.content.appendChild(d)}let c;const u=s.content.children[0];if(u instanceof a.HTMLTemplateElement){for(const h of Array.from(u.attributes)){const d=h.value.trim();if(h.name.startsWith("layout")&&d){if(d.match(D))throw Error("Layout attribute cannot contain expressions");c=Oe(u,h.name.substr(6),d,!0)}}if(c!==void 0&&s.content.children.length>1)throw Error("Template, which uses layout system must have only the '<template>' root element");o=!0,s=u}const f=Pe(s.content),p=[];let l=0,m=null;for(;f.nextNode();){let h=f.currentNode;if(m&&!m.contains(h)&&(m=null),h.nodeType===a.Node.COMMENT_NODE&&F.test(h.textContent)&&(h.parentNode.insertBefore(a.document.createTextNode(h.textContent),h.nextSibling),f.nextNode(),h.parentNode.removeChild(h),h=f.currentNode),h.nodeType===a.Node.TEXT_NODE){let d=h.textContent;const b=d.match(F);if(b)h.textContent="",r[b[1]]=[l,G];else{if(un()&&!n&&!m&&!d.match(/^\s*$/)){let E;const g=d.trim(),v=g.replace(/\s+/g," ").replace(D,($,k)=>(k=Number(k),E===void 0&&(E=k),`\${${k-E}}`));if(!v.match(Qt)){let $=h.previousSibling&&h.previousSibling.nodeType===a.Node.COMMENT_NODE?h.previousSibling:"";$&&($.parentNode.removeChild($),l-=1,$=($.textContent.split("|")[1]||"").trim().replace(/\s+/g," "));const k=pn(v,$).replace(/\${(\d+)}/g,(C,O)=>P(Number(O)+E));d=d.replace(g,k),h.textContent=d}}const y=d.match(D);if(y){let E=h;y.reduce((g,v)=>{const[$,k]=g.pop().split(v);return $&&g.push($),g.push(v),k&&g.push(k),g},[d]).forEach((g,v)=>{v===0?E.textContent=g:(E=E.parentNode.insertBefore(a.document.createTextNode(g),E.nextSibling),f.currentNode=E,l+=1);const $=E.textContent.match(F);$&&(E.textContent="",r[$[1]]=[l,G])})}}}else if(h.nodeType===a.Node.ELEMENT_NODE){if(!m&&(h.getAttribute("translate")==="no"||h.tagName.toLowerCase()==="script"||h.tagName.toLowerCase()==="style")&&(m=h),de){const d=h.tagName.toLowerCase();d.match(/.+-.+/)&&!a.customElements.get(d)&&!p.includes(d)&&p.push(d)}for(const d of Array.from(h.attributes)){const b=d.value.trim(),y=d.name;if(o&&y.startsWith("layout")&&b){if(b.match(D))throw Error("Layout attribute cannot contain expressions");const g=Oe(h,y.substr(6),b);h.removeAttribute(y),h.classList.add(g);continue}const E=b.match(F);if(E){const g=Jt(e[E[1]]);r[E[1]]=[l,Gt(y,g,t)],h.removeAttribute(d.name)}else{const g=b.match(D);if(g){const v=`attr__${y}`;for(const[$,k]of g.entries()){const[,C]=k.match(F);let O=!1;r[C]=[l,(z,N,R)=>{const U=M(N);U[v]=(U[v]||b).replace(k,R==null?"":R),(g.length===1||$+1===g.length)&&(O=O||!t&&!(N instanceof a.SVGElement)&&y in N,O?N[y]=U[v]:N.setAttribute(y,U[v]),U[v]=void 0)}]}d.value=""}}}}l+=1}de&&p.length&&console.warn(`Not defined ${p.map(h=>`<${h}>`).join(", ")} element${p.length>1?"s":""} found in the template:
${Ce(i,-1)}`);const w=Object.keys(r);return function(d,b,y,E){let g=M(b);if(s!==g.template){const v=a.document.importNode(s.content,!0),$=Pe(v),k=[];let C=0,O=0,z=r[w[O]];for(;$.nextNode();){const N=$.currentNode;for(;z&&z[0]===C;)k.push({index:w[O],node:N,fn:z[1]}),O+=1,z=r[w[O]];C+=1}if(g.hostLayout&&d.classList.remove(g.hostLayout),q(b),g=M(b),g.template=s,g.markers=k,g.styles=Zt(b),b.nodeType===a.Node.TEXT_NODE){g.startNode=v.childNodes[0],g.endNode=v.childNodes[v.childNodes.length-1];let N=b,R=v.childNodes[0];for(;R;)b.parentNode.insertBefore(R,N.nextSibling),N=R,R=v.childNodes[0]}else{if(o){const N=`${c}-${d===b?"c":"s"}`;d.classList.add(N),g.hostLayout=N}b.appendChild(v)}o&&Ut(b)}g.styles(E);for(const v of g.markers){const $=y[v.index],k=g.prevArgs&&g.prevArgs[v.index];if(!(g.prevArgs&&$===k))try{v.fn(d,v.node,$,k,o)}catch(C){throw console.error(`Following error was thrown when updating a template expression in ${Ie(d)}
${Ce(i,v.index)}`),C}}g.prevArgs=y}}function Ae({target:e,detail:t},n){let o;switch(e.type){case"radio":case"checkbox":o=e.checked&&e.value;break;case"file":o=e.files;break;default:o=t&&hasOwnProperty.call(t,"value")?t.value:e.value}n(o)}function tn(e,t){return e.split(".").reverse().reduce((n,o)=>n?{[o]:n}:{[o]:t},null)}const We=new Map;function nn(e,t){if(!e)throw Error(`The first argument must be a property name or an object instance: ${e}`);if(typeof e=="object"){if(t===void 0)throw Error("For model instance property the second argument must be defined");const o=lt.get(e);if(!o)throw Error("Provided object must be a model instance of the store");return t===null?()=>{o.set(e,null)}:(s,r)=>{Ae(r,i=>{o.set(e,tn(t,i))})}}if(arguments.length===2)return o=>{o[e]=t};let n=We.get(e);return n||(n=(o,s)=>{Ae(s,r=>{o[e]=r})},We.set(e,n)),n}const ce=new WeakMap;function on(e,t,n=200){return(o,s)=>{let r;t&&(r=setTimeout(()=>{r=void 0,G(o,s,t)},n)),ce.set(s,e),e.then(i=>{r&&clearTimeout(r),ce.get(s)===e&&(G(o,s,i),ce.set(s,null))})}}const ot=Object.freeze(Object.defineProperty({__proto__:null,set:nn,resolve:on},Symbol.toStringTag,{value:"Module"})),sn=P(),rn=P("svg"),an=P("msg"),ln=P("layout"),cn={key(e){return this.id=e,this},style(...e){return this.styleSheets=this.styleSheets||[],this.styleSheets.push(...e),this},css(e,...t){this.styleSheets=this.styleSheets||[];let n=e[0];for(let o=1;o<e.length;o++)n+=(t[o-1]!==void 0?t[o-1]:"")+e[o];return this.styleSheets.push(n),this}},De=new Map;function st(e,t,n,o){function s(r,i=r){let c=o?e+an:e.join(sn);n&&(c+=rn);const u=s.useLayout;u&&(c+=ln);let f=De.get(c);f||(f=en(e,n,o,u),De.set(c,f)),f(r,i,t,s.styleSheets)}return Object.assign(s,cn)}function j(e,...t){return st(e,t,!1,!1)}function dn(e,...t){return st(e,t,!0,!1)}Object.freeze(Object.assign(j,ot));Object.freeze(Object.assign(dn,ot));const ee=new Map,ze=new Map;let rt=null;const fn=(()=>{let e;try{e=a.navigator.languages||[a.navigator.language]}catch{e=[]}return e.reduce((t,n)=>{const o=n.split("-")[0];return t.add(n),n!==o&&t.add(o),t},new Set)})();function un(){return rt!==null||ee.size}const Ue=new Map;function pn(e,t,n=[]){e=e.trim().replace(/\s+/g," "),t=t.trim();const o=`${e} | ${t}`;let s=ze.get(o);if(!s){if(ee.size)for(const r of fn){const i=ee.get(r);if(i&&(s=i[o]||i[e],s)){if(s=s.message,typeof s=="object"){let c=Ue.get(r);c||(c=new Intl.PluralRules(r),Ue.set(r,c));const u=s;s=f=>f===0&&u.zero||u[c.select(f)]||u.other||""}break}}s||s||(s=e,(ee.size||rt)&&de&&console.warn(`Missing translation: "${e}"${t?` [${t}]`:""}`)),ze.set(o,s)}return typeof s=="function"?s(n[0]):s}se({tag:"h-footer",content:()=>j`<footer>
    <div class="container">
      <a href="/" class="logo-font">conduit</a>
      <span class="attribution">
        An interactive learning project from
        <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed
        under MIT.
      </span>
    </div>
  </footer>`});se({tag:"h-nav",content:()=>j`<nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a class="nav-link active" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/article/1">Article 1</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/editor">
            <i class="ion-compose"></i>New Article
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/settings">
            <i class="ion-gear-a"></i>Settings
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Sign up</a>
        </li>
      </ul>
    </div>
  </nav>`});const hn=["/article/:slug"],mn={tag:"h-article",slug:"",content:({slug:e})=>j`${console.log({slug:e})}
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>How to build webapps that scale</h1>

          <div class="article-meta">
            <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div class="info">
              <a href="" class="author">Eric Simons</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons <span class="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post <span class="counter">(29)</span>
            </button>
          </div>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            <p>
              Web development technologies have evolved at an incredible clip
              over the past few years.
            </p>
            <h2 id="introducing-ionic">Introducing RealWorld.</h2>
            <p>It's a great solution for learning how other frameworks work.</p>
          </div>
        </div>

        <hr />

        <div class="article-actions">
          <div class="article-meta">
            <a href="profile.html"
              ><img src="http://i.imgur.com/Qr71crq.jpg"
            /></a>
            <div class="info">
              <a href="" class="author">Eric Simons</a>
              <span class="date">January 20th</span>
            </div>

            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post <span class="counter">(29)</span>
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <form class="card comment-form">
              <div class="card-block">
                <textarea
                  class="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                ></textarea>
              </div>
              <div class="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
                <button class="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div class="card">
              <div class="card-block">
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div class="card-footer">
                <a href="" class="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    class="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="" class="comment-author">Jacob Schmidt</a>
                <span class="date-posted">Dec 29th</span>
              </div>
            </div>

            <div class="card">
              <div class="card-block">
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div class="card-footer">
                <a href="" class="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    class="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="" class="comment-author">Jacob Schmidt</a>
                <span class="date-posted">Dec 29th</span>
                <span class="mod-options">
                  <i class="ion-edit"></i>
                  <i class="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> `},gn=Object.freeze(Object.defineProperty({__proto__:null,routes:hn,component:mn},Symbol.toStringTag,{value:"Module"})),vn=["/editor/:slug","/editor"],bn={tag:"h-editor",slug:"",content:()=>j`
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                  />
                  <div class="tag-list"></div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  `},yn=Object.freeze(Object.defineProperty({__proto__:null,routes:vn,component:bn},Symbol.toStringTag,{value:"Module"})),wn=["/"],En={tag:"h-home",content:()=>j`<div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"
                ><img src="http://i.imgur.com/Qr71crq.jpg"
              /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"
                ><img src="http://i.imgur.com/N4VcUeJ.jpg"
              /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`},$n=Object.freeze(Object.defineProperty({__proto__:null,routes:wn,component:En},Symbol.toStringTag,{value:"Module"})),Sn=["/login","/register"],kn={tag:"h-login",content:()=>j` <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>`},xn=Object.freeze(Object.defineProperty({__proto__:null,routes:Sn,component:kn},Symbol.toStringTag,{value:"Module"})),Nn=["/profile","/profile/:username","/profile/:username/favourites"],Tn={tag:"h-profile",username:"",content:()=>j`<div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img" />
            <h4>Eric Simons</h4>
            <p>
              Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda
              looks like Peeta from the Hunger Games
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>`},Ln=Object.freeze(Object.defineProperty({__proto__:null,routes:Nn,component:Tn},Symbol.toStringTag,{value:"Module"})),On=["/settings"],_n={tag:"h-settings",content:()=>j`<div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>`},jn=Object.freeze(Object.defineProperty({__proto__:null,routes:On,component:_n},Symbol.toStringTag,{value:"Module"})),Mn=({routes:e,component:t})=>e.map((n,o)=>se({...t,tag:t.tag+o,[et.connect]:{url:n}})),Pn=Object.assign({"./pages/article.ts":gn,"./pages/editor.ts":yn,"./pages/home.ts":$n,"./pages/login.ts":xn,"./pages/profile.ts":Ln,"./pages/settings.ts":jn}),Cn=Object.values(Pn).flatMap(Mn);se({tag:"h-app",views:et(Cn),content:({views:e})=>j`
    <h-nav></h-nav>
    ${e}
    <h-footer></h-footer>
  `});
