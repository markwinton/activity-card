!function(t){function e(e){for(var o,i,c=e[0],u=e[1],l=e[2],s=0,p=[];s<c.length;s++)i=c[s],r[i]&&p.push(r[i][0]),r[i]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);for(f&&f(e);p.length;)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,c=1;c<n.length;c++){var u=n[c];0!==r[u]&&(o=!1)}o&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var o={},r={0:0},a=[];function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise(function(e,o){n=r[t]=[e,o]});e.push(n[2]=o);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(t){return i.p+""+({}[t]||t)+".js"}(t),a=function(e){c.onerror=c.onload=null,clearTimeout(u);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+o+": "+a+")");i.type=o,i.request=a,n[1](i)}r[t]=void 0}};var u=setTimeout(function(){a({type:"timeout",target:c})},12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(e)},i.m=t,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="build/",i.oe=function(t){throw console.error(t),t};var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var f=u;a.push([41,1]),n()}([,,,,,,,,,,function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return i});n(20);function o(t,e,n){return new Promise(function(o,r){fetch(e,{method:t,headers:n}).then(function(t){200==t.status?o(t.json()):401==t.status?r("unauthorized"):r()}).catch(function(){return r()})})}function r(t){return o("POST","".concat("http://localhost:3000","/auth/authorize/").concat(t))}function a(t){return o("POST","".concat("http://localhost:3000","/auth/deauthorize"),{Authorization:"Bearer "+t})}function i(t,e,n){return o("GET","".concat("http://localhost:3000","/api/v1/activities/").concat(e,"/").concat(n),{Authorization:"Bearer "+t})}},,,function(t,e,n){var o=n(26);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(o,r);o.locals&&(t.exports=o.locals)},function(t,e){
/* @license react v16.7.0 | Copyright (c) Facebook, Inc. and its affiliates. | Licensed under the MIT License */
/* @license prop-types v15.6.2 | Copyright (c) 2013-present, Facebook, Inc. | Licensed under the MIT License */
/* @license warning v3.0.0 | Copyright (c) 2013-2015, Facebook, Inc. All rights reserved. | Licensed under the BSD 3-Clause License */
/* @license invariant v2.2.4 | Copyright (c) 2013-present, Facebook, Inc. | Licensed under the MIT License */
/* @license warning v4.0.2 | Copyright (c) 2013-present, Facebook, Inc. | Licensed under the MIT License */
/* @license css-loader v2.1.0 | Copyright JS Foundation and other contributors | Licensed under the MIT License  */
/* @license style-loader v0.23.1 | Copyright JS Foundation and other contributors | Licensed under the MIT License */
/* @license history v4.7.2 | Copyright (c) 2015-2016 Michael Jackson | Licensed under the MIT License */
/* @license resolve-pathname v2.2.0 | Michael Jackson | Licensed under the MIT License */
/* @license value-equal v0.4.0 | Michael Jackson | Licensed under the MIT License */
/* @license react-router-dom v4.3.1 | Copyright (c) React Training 2016-2018 | Licensed under the MIT License */
/* @license object-assign v4.1.1 | Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) | Licensed under the MIT License */
/* @license react-dom v16.7.0 | Copyright (c) Facebook, Inc. and its affiliates. | Licensed under the MIT License */
/* @license react-router v4.3.1 | Copyright (c) React Training 2016-2018 | Licensed under the MIT License */
/* @license scheduler v0.12.0 | Copyright (c) Facebook, Inc. and its affiliates. | Licensed under the MIT License */
/* @license normalize.css v8.0.1 | Copyright © Nicolas Gallagher and Jonathan Neal | Licensed under the MIT License */
/* @license three.js v0.99.0 | Copyright © 2010-2018 three.js authors | Licensed under the MIT License */
/* @license hoist-non-react-statics v2.5.5 | Copyright (c) 2015, Yahoo! Inc. All rights reserved. | Licensed under the BSD 3-Clause License */
/* @license query-string v6.2.0 | Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) | Licensed under the MIT License */
/* @license strict-uri-encode v2.0.0 | Copyright (c) Kevin Martensson <kevinmartensson@gmail.com> (github.com/kevva) | Licensed under the MIT License */
/* @license decode-uri-component v0.2.0 | Copyright (c) Sam Verschueren <sam.verschueren@gmail.com> (github.com/SamVerschueren) | Licensed under the MIT License */
/* @license whatwg-fetch v3.0.0 | Copyright (c) 2014-2016 GitHub, Inc. | Licensed under the MIT License */
/* @license moment v2.24.0 | Copyright (c) JS Foundation and other contributors | Licensed under the MIT License */
/* @license signal loader | Copyright (c) 2019 by brunjo (https://codepen.io/brunjo/pen/vELmaP) | Licensed under the MIT License */},,,,,,,function(t,e,n){var o=n(22);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,"header {\n  width: 100%;\n  height: 80px;\n}\n\nheader > ul {\n  margin: 0;\n  padding: 0 30px 0 30px;\n}\n\nheader > ul > li {\n  display: block;\n  line-height: 80px;\n}\n\nheader > ul > li.left {\n  float: left;\n  padding: 0 16px 0 0;\n}\n\nheader > ul > li.right {\n  float: right;\n  padding: 0 0 0 16px;\n}\n",""])},,function(t,e,n){var o=n(25);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,".logo {\n  font-size: 1.6em;\n  font-weight: 300;\n  color: inherit;\n}\n",""])},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,".disabled {\n  color: #eeeeee;\n}\n",""])},,,,function(t,e,n){var o=n(31);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,"footer {\n  width: 100%;\n  height: 80px;\n}\n\nfooter > ul {\n  margin: 0;\n  padding: 0 30px 0 30px;\n}\n\nfooter > ul > li {\n  display: block;\n  float: left;\n  padding: 0 16px 0 0;\n  line-height: 80px;\n}\n\nfooter > ul > li > a {\n  font-size: .9em;\n  color: inherit;\n}\n",""])},,,function(t,e,n){var o=n(35);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(6)(!1);var o=n(36),r=o(n(37)),a=o(n(38)),i=o(n(39)),c=o(n(40));e.push([t.i,"@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 300;\n  src: url("+r+") format('truetype');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url("+a+") format('truetype');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 600;\n  src: url("+i+") format('truetype');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 700;\n  src: url("+c+") format('truetype');\n}\n\nbody {\n  font-family: 'Open Sans';\n  font-size: 100%;\n}\n\na {\n  cursor: pointer;\n  text-decoration: none;\n  color: dodgerblue;\n}\n",""])},,function(t,e,n){t.exports=n.p+"9ff12f694e5951a6f51a9d63b05062e7.ttf"},function(t,e,n){t.exports=n.p+"d7d5d4588a9f50c99264bc12e4892a7c.ttf"},function(t,e,n){t.exports=n.p+"e1c83f9474e0cc1d84a13c6d1ddf3ca5.ttf"},function(t,e,n){t.exports=n.p+"f5331cb6372b6c0d8baf2dd7e200498c.ttf"},function(t,e,n){"use strict";n.r(e);n(14);var o=n(0),r=n.n(o),a=n(12),i=n.n(a),c=n(43),u=n(44),l=n(45),f=n(10),s=n(42);n(21),n(24),n(13);function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(t,e){return(d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var b=function(t){function e(t){var n,o,r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),o=this,(n=!(r=m(e).call(this,t))||"object"!==p(r)&&"function"!=typeof r?h(o):r).state={deauthorizing:!1,redirect:null},n.handleDisconnect=n.handleDisconnect.bind(h(n)),n}var n,o,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}(e,r.a.Component),n=e,(o=[{key:"render",value:function(){if(this.state.redirect)return r.a.createElement(c.a,{to:this.state.redirect});var t=null,e=localStorage.getItem("name");return localStorage.getItem("token")&&(t=r.a.createElement("span",null,e," | ",r.a.createElement("a",{onClick:this.handleDisconnect,className:this.state.deauthorizing?"disabled":""},"Disconnect"))),r.a.createElement("header",null,r.a.createElement("ul",null,r.a.createElement("li",{className:"left"},r.a.createElement(s.a,{to:"/",className:"logo"},"Activity Card")),r.a.createElement("li",{className:"right"},t)))}},{key:"handleDisconnect",value:function(){var t=this;this.setState(function(e){if(0==e.deauthorizing){var n=localStorage.getItem("token");return Object(f.b)(n).finally(function(){localStorage.removeItem("token"),localStorage.removeItem("name"),sessionStorage.removeItem("activities"),t.setState({deauthorizing:!1,redirect:"/"})}),{deauthorizing:!0}}})}}])&&y(n.prototype,o),a&&y(n,a),e}();n(30);function v(t){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function O(t,e){return!e||"object"!==v(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function E(t,e){return(E=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var S=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),O(this,w(e).apply(this,arguments))}var n,o,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&E(t,e)}(e,r.a.Component),n=e,(o=[{key:"render",value:function(){return r.a.createElement("footer",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(s.a,{to:"/contact"},"Contact")),r.a.createElement("li",null,r.a.createElement(s.a,{to:"/privacy"},"Privacy"))))}}])&&g(n.prototype,o),a&&g(n,a),e}();function x(t){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _(t,e){return!e||"object"!==x(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function P(t){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var z=r.a.lazy(function(){return n.e(3).then(n.bind(null,208))}),I=r.a.lazy(function(){return Promise.all([n.e(2),n.e(4)]).then(n.bind(null,207))}),T=r.a.lazy(function(){return n.e(5).then(n.bind(null,203))}),C=r.a.lazy(function(){return n.e(7).then(n.bind(null,204))}),D=r.a.lazy(function(){return n.e(6).then(n.bind(null,205))}),A=function(t){return function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(b,null),r.a.createElement(t,null))}},M=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),_(this,P(e).apply(this,arguments))}var n,o,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}(e,r.a.Component),n=e,(o=[{key:"render",value:function(){return r.a.createElement(u.a,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(r.a.Suspense,{fallback:r.a.createElement("div",null)},r.a.createElement(l.a,{exact:!0,path:"/",component:(t=A(I),function(){return localStorage.getItem("token")?r.a.createElement(t,null):r.a.createElement(c.a,{to:"/connect"})})}),r.a.createElement(l.a,{path:"/connect",component:z}),r.a.createElement(l.a,{path:"/contact",component:A(T)}),r.a.createElement(l.a,{path:"/privacy",component:A(C)}),r.a.createElement(l.a,{path:"/error",component:A(D)})),r.a.createElement(S,null)));var t}}])&&j(n.prototype,o),a&&j(n,a),e}();n(32),n(34);i.a.render(r.a.createElement(M,null),document.getElementById("root"))}]);