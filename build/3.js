(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{180:function(t,n,e){"use strict";const r=e(181),o=e(182);function a(t,n){return n.encode?n.strict?r(t):encodeURIComponent(t):t}function i(t,n){return n.decode?o(t):t}function c(t){const n=t.indexOf("?");return-1===n?"":t.slice(n+1)}function s(t,n){const e=function(t){let n;switch(t.arrayFormat){case"index":return(t,e,r)=>{n=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),n?(void 0===r[t]&&(r[t]={}),r[t][n[1]]=e):r[t]=e};case"bracket":return(t,e,r)=>{n=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),n?void 0!==r[t]?r[t]=[].concat(r[t],e):r[t]=[e]:r[t]=e};default:return(t,n,e)=>{void 0!==e[t]?e[t]=[].concat(e[t],n):e[t]=n}}}(n=Object.assign({decode:!0,arrayFormat:"none"},n)),r=Object.create(null);if("string"!=typeof t)return r;if(!(t=t.trim().replace(/^[?#&]/,"")))return r;for(const o of t.split("&")){let[t,a]=o.replace(/\+/g," ").split("=");a=void 0===a?null:i(a,n),e(i(t,n),a,r)}return Object.keys(r).sort().reduce((t,n)=>{const e=r[n];return Boolean(e)&&"object"==typeof e&&!Array.isArray(e)?t[n]=function t(n){return Array.isArray(n)?n.sort():"object"==typeof n?t(Object.keys(n)).sort((t,n)=>Number(t)-Number(n)).map(t=>n[t]):n}(e):t[n]=e,t},Object.create(null))}n.extract=c,n.parse=s,n.stringify=((t,n)=>{if(!t)return"";const e=function(t){switch(t.arrayFormat){case"index":return(n,e,r)=>null===e?[a(n,t),"[",r,"]"].join(""):[a(n,t),"[",a(r,t),"]=",a(e,t)].join("");case"bracket":return(n,e)=>null===e?[a(n,t),"[]"].join(""):[a(n,t),"[]=",a(e,t)].join("");default:return(n,e)=>null===e?a(n,t):[a(n,t),"=",a(e,t)].join("")}}(n=Object.assign({encode:!0,strict:!0,arrayFormat:"none"},n)),r=Object.keys(t);return!1!==n.sort&&r.sort(n.sort),r.map(r=>{const o=t[r];if(void 0===o)return"";if(null===o)return a(r,n);if(Array.isArray(o)){const t=[];for(const n of o.slice())void 0!==n&&t.push(e(r,n,t.length));return t.join("&")}return a(r,n)+"="+a(o,n)}).filter(t=>t.length>0).join("&")}),n.parseUrl=((t,n)=>{const e=t.indexOf("#");return-1!==e&&(t=t.slice(0,e)),{url:t.split("?")[0]||"",query:s(c(t),n)}})},181:function(t,n,e){"use strict";t.exports=(t=>encodeURIComponent(t).replace(/[!'()*]/g,t=>`%${t.charCodeAt(0).toString(16).toUpperCase()}`))},182:function(t,n,e){"use strict";var r=new RegExp("%[a-f0-9]{2}","gi"),o=new RegExp("(%[a-f0-9]{2})+","gi");function a(t,n){try{return decodeURIComponent(t.join(""))}catch(t){}if(1===t.length)return t;n=n||1;var e=t.slice(0,n),r=t.slice(n);return Array.prototype.concat.call([],a(e),a(r))}function i(t){try{return decodeURIComponent(t)}catch(o){for(var n=t.match(r),e=1;e<n.length;e++)n=(t=a(n,e).join("")).match(r);return t}}t.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(n){return function(t){for(var n={"%FE%FF":"��","%FF%FE":"��"},e=o.exec(t);e;){try{n[e[0]]=decodeURIComponent(e[0])}catch(t){var r=i(e[0]);r!==e[0]&&(n[e[0]]=r)}e=o.exec(t)}n["%C2"]="�";for(var a=Object.keys(n),c=0;c<a.length;c++){var s=a[c];t=t.replace(new RegExp(s,"g"),n[s])}return t}(t)}}},183:function(t,n,e){t.exports=e.p+"87ca7dfdc9b2cbd0ad986e954e5c1ff1.png"},184:function(t,n,e){var r=e(185);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(7)(r,o);r.locals&&(t.exports=r.locals)},185:function(t,n,e){(t.exports=e(6)(!1)).push([t.i,".connect-strava-button {\n  height: 48px;\n  width: 193px;\n}\n",""])},186:function(t,n,e){var r=e(187);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(7)(r,o);r.locals&&(t.exports=r.locals)},187:function(t,n,e){(t.exports=e(6)(!1)).push([t.i,".connect {\n  width: 100%;\n  color: #ffffff;\n  background-color: #000209;\n}\n\n.connect > .preview {\n  display: block;\n  margin: 0 auto 0 auto;\n  width: 852px;\n  height: 300px;\n}\n\n.connect > .title {\n  margin: 26px 0 0 0;\n  font-size: 4em;\n  font-weight: 300;\n  text-align: center;\n}\n\n.connect > .description {\n  font-size: 1.2em;\n  text-align: center;\n}\n\n.connect > a > .connect-strava-button {\n  display: block;\n  margin: 40px auto 0 auto;\n  padding: 0 0 40px 0;\n}\n\n.connect > .authorizing {\n  display: block;\n  margin: 40px auto 0 auto;\n  padding: 0 0 40px 0;\n  text-align: center;\n}\n\n.connect > .authorizing > .indicator {\n  display: block;\n  margin: auto;\n}\n",""])},208:function(t,n,e){"use strict";e.r(n);var r=e(10);var o=e(0),a=e.n(o),i=e(43),c=e(180),s=e.n(c),u=e(183),l=e.n(u);e(184),e(186),e(50);function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(t,n){return(y=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}e.d(n,"default",function(){return b});var h="activity:read_all",g=function(t){return a.a.createElement("a",{onClick:t.onClick},a.a.createElement("img",{src:"https://markwinton.github.io/activity-card-assets/connect-strava.png",className:"connect-strava-button"}))},v=function(t){return a.a.createElement("div",{className:"authorizing"},a.a.createElement("p",null,"Connecting to your Strava account..."),a.a.createElement("div",{className:"indicator"}))},b=function(t){function n(t){var e,r,o;return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),r=this,(e=!(o=d(n).call(this,t))||"object"!==p(o)&&"function"!=typeof o?m(r):o).state={redirect:null,authorizing:!1},e.handleConnect=e.handleConnect.bind(m(e)),e}var e,o,c;return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&y(t,n)}(n,a.a.Component),e=n,(o=[{key:"componentDidMount",value:function(){var t=this,n=s.a.parse(this.props.location.search),e=n.code,o=n.state,a=n.scope?n.scope.split(","):[];e&&o==sessionStorage.getItem("authorization_state")&&a.includes(h)&&(this.setState({authorizing:!0}),Object(r.a)(e).then(function(n){var e=n.token,r=n.name;localStorage.setItem("token",e),localStorage.setItem("name",r),t.setState({authorizing:!1,redirect:"/"})}).catch(function(n){t.setState({authorizing:!1,redirect:"/error"})})),sessionStorage.removeItem("authorization_state")}},{key:"render",value:function(){return this.state.redirect?a.a.createElement(i.a,{to:this.state.redirect}):a.a.createElement("section",{className:"connect"},a.a.createElement("img",{src:l.a,className:"preview"}),a.a.createElement("p",{className:"title"},"Activity Card"),a.a.createElement("p",{className:"description"},"Create a unique visualization based on your Strava activities from the past year."),this.state.authorizing?a.a.createElement(v,null):a.a.createElement(g,{onClick:this.handleConnect}))}},{key:"handleConnect",value:function(){var t,n=(t=new Uint8Array(32),crypto.getRandomValues(t),t.reduce(function(t,n){return t+n.toString(16).padStart(2,"0")},""));sessionStorage.setItem("authorization_state",n);var e=encodeURIComponent(location.href.split("?")[0]);location.href="https://www.strava.com/oauth/mobile/authorize?response_type=code&state=".concat(n,"&client_id=").concat("32514","&redirect_uri=").concat(e,"&scope=").concat(h)}}])&&f(e.prototype,o),c&&f(e,c),n}()},50:function(t,n,e){var r=e(51);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(7)(r,o);r.locals&&(t.exports=r.locals)},51:function(t,n,e){(t.exports=e(6)(!1)).push([t.i,".indicator {\n  width: 30px;\n  height: 30px;\n  border: 4px solid #ffffff;\n  border-radius: 30px;\n  opacity: 0;\n  animation: animation 1s ease-out;\n  animation-iteration-count: infinite;\n}\n\n@keyframes animation {\n  0% {\n    transform: scale(0.1);\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n",""])}}]);