!function(t){function e(e){for(var r,i,c=e[0],u=e[1],l=e[2],s=0,p=[];s<c.length;s++)i=c[s],o[i]&&p.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);for(f&&f(e);p.length;)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={0:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise(function(e,r){n=o[t]=[e,r]});e.push(n[2]=r);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(t){return i.p+""+({}[t]||t)+".js"}(t),a=function(e){c.onerror=c.onload=null,clearTimeout(u);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");i.type=r,i.request=a,n[1](i)}o[t]=void 0}};var u=setTimeout(function(){a({type:"timeout",target:c})},12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="build/",i.oe=function(t){throw console.error(t),t};var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var f=u;a.push([41,1]),n()}([,,,,,,,,,,function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return i});n(20);function r(t,e,n){return new Promise(function(r,o){fetch(e,{method:t,headers:n}).then(function(t){200==t.status?r(t.json()):401==t.status?o("unauthorized"):o()}).catch(function(){return o()})})}function o(t){return r("POST","".concat("https://activity-card-service.herokuapp.com","/auth/authorize/").concat(t))}function a(t){return r("POST","".concat("https://activity-card-service.herokuapp.com","/auth/deauthorize"),{Authorization:"Bearer "+t})}function i(t,e,n){return r("GET","".concat("https://activity-card-service.herokuapp.com","/api/v1/activities/").concat(e,"/").concat(n),{Authorization:"Bearer "+t})}},,,function(t,e,n){var r=n(26);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,o);r.locals&&(t.exports=r.locals)},function(t,e){
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
/* @license signal loader | Copyright (c) 2019 by brunjo (https://codepen.io/brunjo/pen/vELmaP) | Licensed under the MIT License */},,,,,,,function(t,e,n){var r=n(22);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,"header {\n  width: 100%;\n  height: 80px;\n}\n\nheader > ul {\n  margin: 0;\n  padding: 0 30px 0 30px;\n}\n\nheader > ul > li {\n  display: block;\n  line-height: 80px;\n}\n\nheader > ul > li.left {\n  float: left;\n  padding: 0 16px 0 0;\n}\n\nheader > ul > li.right {\n  float: right;\n  padding: 0 0 0 16px;\n}\n",""])},,function(t,e,n){var r=n(25);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,".logo {\n  font-size: 1.6em;\n  font-weight: 300;\n  color: inherit;\n}\n",""])},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,".disabled {\n  color: #eeeeee;\n}\n",""])},,,,function(t,e,n){var r=n(31);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,"footer {\n  width: 100%;\n  height: 80px;\n}\n\nfooter > ul {\n  margin: 0;\n  padding: 0 30px 0 30px;\n}\n\nfooter > ul > li {\n  display: block;\n  float: left;\n  padding: 0 16px 0 0;\n  line-height: 80px;\n}\n\nfooter > ul > li > a {\n  font-size: .9em;\n  color: inherit;\n}\n",""])},,,function(t,e,n){var r=n(35);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){e=t.exports=n(6)(!1);var r=n(36),o=r(n(37)),a=r(n(38)),i=r(n(39)),c=r(n(40));e.push([t.i,"@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 300;\n  src: url("+o+") format('truetype');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url("+a+") format('truetype');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 600;\n  src: url("+i+") format('truetype');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 700;\n  src: url("+c+") format('truetype');\n}\n\nbody {\n  font-family: 'Open Sans';\n  font-size: 100%;\n}\n\na {\n  cursor: pointer;\n  text-decoration: none;\n  color: dodgerblue;\n}\n",""])},,function(t,e,n){t.exports=n.p+"9ff12f694e5951a6f51a9d63b05062e7.ttf"},function(t,e,n){t.exports=n.p+"d7d5d4588a9f50c99264bc12e4892a7c.ttf"},function(t,e,n){t.exports=n.p+"e1c83f9474e0cc1d84a13c6d1ddf3ca5.ttf"},function(t,e,n){t.exports=n.p+"f5331cb6372b6c0d8baf2dd7e200498c.ttf"},function(t,e,n){"use strict";n.r(e);n(14);var r=n(0),o=n.n(r),a=n(12),i=n.n(a),c=n(43),u=n(44),l=n(45),f=n(10),s=n(42);n(21),n(24),n(13);function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(t,e){return(d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var b=function(t){function e(t){var n,r,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=this,(n=!(o=y(e).call(this,t))||"object"!==p(o)&&"function"!=typeof o?h(r):o).state={deauthorizing:!1,redirect:null},n.handleDisconnect=n.handleDisconnect.bind(h(n)),n}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}(e,o.a.Component),n=e,(r=[{key:"render",value:function(){if(this.state.redirect)return o.a.createElement(c.a,{to:this.state.redirect});var t=null,e=localStorage.getItem("name");return localStorage.getItem("token")&&(t=o.a.createElement("span",null,e," | ",o.a.createElement("a",{onClick:this.handleDisconnect,className:this.state.deauthorizing?"disabled":""},"Disconnect"))),o.a.createElement("header",null,o.a.createElement("ul",null,o.a.createElement("li",{className:"left"},o.a.createElement(s.a,{to:"/",className:"logo"},"Activity Card")),o.a.createElement("li",{className:"right"},t)))}},{key:"handleDisconnect",value:function(){var t=this;this.setState(function(e){if(0==e.deauthorizing){var n=localStorage.getItem("token");return Object(f.b)(n).finally(function(){localStorage.removeItem("token"),localStorage.removeItem("name"),sessionStorage.removeItem("activities"),t.setState({deauthorizing:!1,redirect:"/"})}),{deauthorizing:!0}}})}}])&&m(n.prototype,r),a&&m(n,a),e}();n(30);function v(t){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,e){return!e||"object"!==v(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function E(t){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function w(t,e){return(w=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var S=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),O(this,E(e).apply(this,arguments))}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&w(t,e)}(e,o.a.Component),n=e,(r=[{key:"render",value:function(){return o.a.createElement("footer",null,o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(s.a,{to:"/contact"},"Contact")),o.a.createElement("li",null,o.a.createElement(s.a,{to:"/privacy"},"Privacy")),o.a.createElement("li",null,o.a.createElement("a",{href:"https://github.com/markwinton/activity-card"},"GitHub"))))}}])&&g(n.prototype,r),a&&g(n,a),e}();function x(t){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _(t,e){return!e||"object"!==x(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function P(t){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var z=o.a.lazy(function(){return n.e(3).then(n.bind(null,208))}),I=o.a.lazy(function(){return Promise.all([n.e(2),n.e(4)]).then(n.bind(null,207))}),T=o.a.lazy(function(){return n.e(5).then(n.bind(null,203))}),C=o.a.lazy(function(){return n.e(7).then(n.bind(null,204))}),D=o.a.lazy(function(){return n.e(6).then(n.bind(null,205))}),A=function(t){return function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(b,null),o.a.createElement(t,null))}},M=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),_(this,P(e).apply(this,arguments))}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}(e,o.a.Component),n=e,(r=[{key:"render",value:function(){return o.a.createElement(u.a,null,o.a.createElement(o.a.Fragment,null,o.a.createElement(o.a.Suspense,{fallback:o.a.createElement("div",null)},o.a.createElement(l.a,{exact:!0,path:"/",component:(t=A(I),function(){return localStorage.getItem("token")?o.a.createElement(t,null):o.a.createElement(c.a,{to:"/connect"})})}),o.a.createElement(l.a,{path:"/connect",component:z}),o.a.createElement(l.a,{path:"/contact",component:A(T)}),o.a.createElement(l.a,{path:"/privacy",component:A(C)}),o.a.createElement(l.a,{path:"/error",component:A(D)})),o.a.createElement(S,null)));var t}}])&&j(n.prototype,r),a&&j(n,a),e}();n(32),n(34);i.a.render(o.a.createElement(M,null),document.getElementById("root"))}]);