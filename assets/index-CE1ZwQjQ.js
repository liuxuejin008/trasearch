(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();var $={},Vt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},At={},I={};let dt;const $t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];I.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};I.getSymbolTotalCodewords=function(e){return $t[e]};I.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};I.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');dt=e};I.isKanjiModeEnabled=function(){return typeof dt<"u"};I.toSJIS=function(e){return dt(e)};var W={};(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+i)}}t.isValid=function(o){return o&&typeof o.bit<"u"&&o.bit>=0&&o.bit<4},t.from=function(o,r){if(t.isValid(o))return o;try{return e(o)}catch{return r}}})(W);function bt(){this.buffer=[],this.length=0}bt.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let i=0;i<e;i++)this.putBit((t>>>e-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var Kt=bt;function K(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}K.prototype.set=function(t,e,i,o){const r=t*this.size+e;this.data[r]=i,o&&(this.reservedBit[r]=!0)};K.prototype.get=function(t,e){return this.data[t*this.size+e]};K.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i};K.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};var Jt=K,It={};(function(t){const e=I.getSymbolSize;t.getRowColCoords=function(o){if(o===1)return[];const r=Math.floor(o/7)+2,n=e(o),s=n===145?26:Math.ceil((n-13)/(2*r-2))*2,c=[n-7];for(let a=1;a<r-1;a++)c[a]=c[a-1]-s;return c.push(6),c.reverse()},t.getPositions=function(o){const r=[],n=t.getRowColCoords(o),s=n.length;for(let c=0;c<s;c++)for(let a=0;a<s;a++)c===0&&a===0||c===0&&a===s-1||c===s-1&&a===0||r.push([n[c],n[a]]);return r}})(It);var Tt={};const jt=I.getSymbolSize,Ct=7;Tt.getPositions=function(e){const i=jt(e);return[[0,0],[i-Ct,0],[0,i-Ct]]};var Nt={};(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(r){return r!=null&&r!==""&&!isNaN(r)&&r>=0&&r<=7},t.from=function(r){return t.isValid(r)?parseInt(r,10):void 0},t.getPenaltyN1=function(r){const n=r.size;let s=0,c=0,a=0,u=null,l=null;for(let C=0;C<n;C++){c=a=0,u=l=null;for(let g=0;g<n;g++){let f=r.get(C,g);f===u?c++:(c>=5&&(s+=e.N1+(c-5)),u=f,c=1),f=r.get(g,C),f===l?a++:(a>=5&&(s+=e.N1+(a-5)),l=f,a=1)}c>=5&&(s+=e.N1+(c-5)),a>=5&&(s+=e.N1+(a-5))}return s},t.getPenaltyN2=function(r){const n=r.size;let s=0;for(let c=0;c<n-1;c++)for(let a=0;a<n-1;a++){const u=r.get(c,a)+r.get(c,a+1)+r.get(c+1,a)+r.get(c+1,a+1);(u===4||u===0)&&s++}return s*e.N2},t.getPenaltyN3=function(r){const n=r.size;let s=0,c=0,a=0;for(let u=0;u<n;u++){c=a=0;for(let l=0;l<n;l++)c=c<<1&2047|r.get(u,l),l>=10&&(c===1488||c===93)&&s++,a=a<<1&2047|r.get(l,u),l>=10&&(a===1488||a===93)&&s++}return s*e.N3},t.getPenaltyN4=function(r){let n=0;const s=r.data.length;for(let a=0;a<s;a++)n+=r.data[a];return Math.abs(Math.ceil(n*100/s/5)-10)*e.N4};function i(o,r,n){switch(o){case t.Patterns.PATTERN000:return(r+n)%2===0;case t.Patterns.PATTERN001:return r%2===0;case t.Patterns.PATTERN010:return n%3===0;case t.Patterns.PATTERN011:return(r+n)%3===0;case t.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(n/3))%2===0;case t.Patterns.PATTERN101:return r*n%2+r*n%3===0;case t.Patterns.PATTERN110:return(r*n%2+r*n%3)%2===0;case t.Patterns.PATTERN111:return(r*n%3+(r+n)%2)%2===0;default:throw new Error("bad maskPattern:"+o)}}t.applyMask=function(r,n){const s=n.size;for(let c=0;c<s;c++)for(let a=0;a<s;a++)n.isReserved(a,c)||n.xor(a,c,i(r,a,c))},t.getBestMask=function(r,n){const s=Object.keys(t.Patterns).length;let c=0,a=1/0;for(let u=0;u<s;u++){n(u),t.applyMask(u,r);const l=t.getPenaltyN1(r)+t.getPenaltyN2(r)+t.getPenaltyN3(r)+t.getPenaltyN4(r);t.applyMask(u,r),l<a&&(a=l,c=u)}return c}})(Nt);var Z={};const S=W,J=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],j=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Z.getBlocksCount=function(e,i){switch(i){case S.L:return J[(e-1)*4+0];case S.M:return J[(e-1)*4+1];case S.Q:return J[(e-1)*4+2];case S.H:return J[(e-1)*4+3];default:return}};Z.getTotalCodewordsCount=function(e,i){switch(i){case S.L:return j[(e-1)*4+0];case S.M:return j[(e-1)*4+1];case S.Q:return j[(e-1)*4+2];case S.H:return j[(e-1)*4+3];default:return}};var Lt={},X={};const z=new Uint8Array(512),q=new Uint8Array(256);(function(){let e=1;for(let i=0;i<255;i++)z[i]=e,q[e]=i,e<<=1,e&256&&(e^=285);for(let i=255;i<512;i++)z[i]=z[i-255]})();X.log=function(e){if(e<1)throw new Error("log("+e+")");return q[e]};X.exp=function(e){return z[e]};X.mul=function(e,i){return e===0||i===0?0:z[q[e]+q[i]]};(function(t){const e=X;t.mul=function(o,r){const n=new Uint8Array(o.length+r.length-1);for(let s=0;s<o.length;s++)for(let c=0;c<r.length;c++)n[s+c]^=e.mul(o[s],r[c]);return n},t.mod=function(o,r){let n=new Uint8Array(o);for(;n.length-r.length>=0;){const s=n[0];for(let a=0;a<r.length;a++)n[a]^=e.mul(r[a],s);let c=0;for(;c<n.length&&n[c]===0;)c++;n=n.slice(c)}return n},t.generateECPolynomial=function(o){let r=new Uint8Array([1]);for(let n=0;n<o;n++)r=t.mul(r,new Uint8Array([1,e.exp(n)]));return r}})(Lt);const Mt=Lt;function gt(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}gt.prototype.initialize=function(e){this.degree=e,this.genPoly=Mt.generateECPolynomial(this.degree)};gt.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(e.length+this.degree);i.set(e);const o=Mt.mod(i,this.genPoly),r=this.degree-o.length;if(r>0){const n=new Uint8Array(this.degree);return n.set(o,r),n}return o};var Yt=gt,Pt={},R={},ht={};ht.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var L={};const St="[0-9]+",qt="[A-Z $%*+\\-./:]+";let V="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";V=V.replace(/u/g,"\\u");const Gt="(?:(?![A-Z0-9 $%*+\\-./:]|"+V+`)(?:.|[\r
]))+`;L.KANJI=new RegExp(V,"g");L.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");L.BYTE=new RegExp(Gt,"g");L.NUMERIC=new RegExp(St,"g");L.ALPHANUMERIC=new RegExp(qt,"g");const Qt=new RegExp("^"+V+"$"),Wt=new RegExp("^"+St+"$"),Zt=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");L.testKanji=function(e){return Qt.test(e)};L.testNumeric=function(e){return Wt.test(e)};L.testAlphanumeric=function(e){return Zt.test(e)};(function(t){const e=ht,i=L;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(n,s){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?n.ccBits[0]:s<27?n.ccBits[1]:n.ccBits[2]},t.getBestModeForData=function(n){return i.testNumeric(n)?t.NUMERIC:i.testAlphanumeric(n)?t.ALPHANUMERIC:i.testKanji(n)?t.KANJI:t.BYTE},t.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},t.isValid=function(n){return n&&n.bit&&n.ccBits};function o(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+r)}}t.from=function(n,s){if(t.isValid(n))return n;try{return o(n)}catch{return s}}})(R);(function(t){const e=I,i=Z,o=W,r=R,n=ht,s=7973,c=e.getBCHDigit(s);function a(g,f,w){for(let y=1;y<=40;y++)if(f<=t.getCapacity(y,w,g))return y}function u(g,f){return r.getCharCountIndicator(g,f)+4}function l(g,f){let w=0;return g.forEach(function(y){const b=u(y.mode,f);w+=b+y.getBitsLength()}),w}function C(g,f){for(let w=1;w<=40;w++)if(l(g,w)<=t.getCapacity(w,f,r.MIXED))return w}t.from=function(f,w){return n.isValid(f)?parseInt(f,10):w},t.getCapacity=function(f,w,y){if(!n.isValid(f))throw new Error("Invalid QR Code version");typeof y>"u"&&(y=r.BYTE);const b=e.getSymbolTotalCodewords(f),m=i.getTotalCodewordsCount(f,w),E=(b-m)*8;if(y===r.MIXED)return E;const h=E-u(y,f);switch(y){case r.NUMERIC:return Math.floor(h/10*3);case r.ALPHANUMERIC:return Math.floor(h/11*2);case r.KANJI:return Math.floor(h/13);case r.BYTE:default:return Math.floor(h/8)}},t.getBestVersionForData=function(f,w){let y;const b=o.from(w,o.M);if(Array.isArray(f)){if(f.length>1)return C(f,b);if(f.length===0)return 1;y=f[0]}else y=f;return a(y.mode,y.getLength(),b)},t.getEncodedBits=function(f){if(!n.isValid(f)||f<7)throw new Error("Invalid QR Code version");let w=f<<12;for(;e.getBCHDigit(w)-c>=0;)w^=s<<e.getBCHDigit(w)-c;return f<<12|w}})(Pt);var Rt={};const st=I,Dt=1335,Xt=21522,pt=st.getBCHDigit(Dt);Rt.getEncodedBits=function(e,i){const o=e.bit<<3|i;let r=o<<10;for(;st.getBCHDigit(r)-pt>=0;)r^=Dt<<st.getBCHDigit(r)-pt;return(o<<10|r)^Xt};var Ut={};const xt=R;function U(t){this.mode=xt.NUMERIC,this.data=t.toString()}U.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};U.prototype.getLength=function(){return this.data.length};U.prototype.getBitsLength=function(){return U.getBitsLength(this.data.length)};U.prototype.write=function(e){let i,o,r;for(i=0;i+3<=this.data.length;i+=3)o=this.data.substr(i,3),r=parseInt(o,10),e.put(r,10);const n=this.data.length-i;n>0&&(o=this.data.substr(i),r=parseInt(o,10),e.put(r,n*3+1))};var te=U;const ee=R,et=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function F(t){this.mode=ee.ALPHANUMERIC,this.data=t}F.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};F.prototype.getLength=function(){return this.data.length};F.prototype.getBitsLength=function(){return F.getBitsLength(this.data.length)};F.prototype.write=function(e){let i;for(i=0;i+2<=this.data.length;i+=2){let o=et.indexOf(this.data[i])*45;o+=et.indexOf(this.data[i+1]),e.put(o,11)}this.data.length%2&&e.put(et.indexOf(this.data[i]),6)};var ne=F,re=function(e){for(var i=[],o=e.length,r=0;r<o;r++){var n=e.charCodeAt(r);if(n>=55296&&n<=56319&&o>r+1){var s=e.charCodeAt(r+1);s>=56320&&s<=57343&&(n=(n-55296)*1024+s-56320+65536,r+=1)}if(n<128){i.push(n);continue}if(n<2048){i.push(n>>6|192),i.push(n&63|128);continue}if(n<55296||n>=57344&&n<65536){i.push(n>>12|224),i.push(n>>6&63|128),i.push(n&63|128);continue}if(n>=65536&&n<=1114111){i.push(n>>18|240),i.push(n>>12&63|128),i.push(n>>6&63|128),i.push(n&63|128);continue}i.push(239,191,189)}return new Uint8Array(i).buffer};const oe=re,ie=R;function _(t){this.mode=ie.BYTE,typeof t=="string"&&(t=oe(t)),this.data=new Uint8Array(t)}_.getBitsLength=function(e){return e*8};_.prototype.getLength=function(){return this.data.length};_.prototype.getBitsLength=function(){return _.getBitsLength(this.data.length)};_.prototype.write=function(t){for(let e=0,i=this.data.length;e<i;e++)t.put(this.data[e],8)};var se=_;const ce=R,ae=I;function v(t){this.mode=ce.KANJI,this.data=t}v.getBitsLength=function(e){return e*13};v.prototype.getLength=function(){return this.data.length};v.prototype.getBitsLength=function(){return v.getBitsLength(this.data.length)};v.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let i=ae.toSJIS(this.data[e]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),t.put(i,13)}};var ue=v,Ft={exports:{}};(function(t){var e={single_source_shortest_paths:function(i,o,r){var n={},s={};s[o]=0;var c=e.PriorityQueue.make();c.push(o,0);for(var a,u,l,C,g,f,w,y,b;!c.empty();){a=c.pop(),u=a.value,C=a.cost,g=i[u]||{};for(l in g)g.hasOwnProperty(l)&&(f=g[l],w=C+f,y=s[l],b=typeof s[l]>"u",(b||y>w)&&(s[l]=w,c.push(l,w),n[l]=u))}if(typeof r<"u"&&typeof s[r]>"u"){var m=["Could not find a path from ",o," to ",r,"."].join("");throw new Error(m)}return n},extract_shortest_path_from_predecessor_list:function(i,o){for(var r=[],n=o;n;)r.push(n),i[n],n=i[n];return r.reverse(),r},find_path:function(i,o,r){var n=e.single_source_shortest_paths(i,o,r);return e.extract_shortest_path_from_predecessor_list(n,r)},PriorityQueue:{make:function(i){var o=e.PriorityQueue,r={},n;i=i||{};for(n in o)o.hasOwnProperty(n)&&(r[n]=o[n]);return r.queue=[],r.sorter=i.sorter||o.default_sorter,r},default_sorter:function(i,o){return i.cost-o.cost},push:function(i,o){var r={value:i,cost:o};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=e})(Ft);var le=Ft.exports;(function(t){const e=R,i=te,o=ne,r=se,n=ue,s=L,c=I,a=le;function u(m){return unescape(encodeURIComponent(m)).length}function l(m,E,h){const d=[];let p;for(;(p=m.exec(h))!==null;)d.push({data:p[0],index:p.index,mode:E,length:p[0].length});return d}function C(m){const E=l(s.NUMERIC,e.NUMERIC,m),h=l(s.ALPHANUMERIC,e.ALPHANUMERIC,m);let d,p;return c.isKanjiModeEnabled()?(d=l(s.BYTE,e.BYTE,m),p=l(s.KANJI,e.KANJI,m)):(d=l(s.BYTE_KANJI,e.BYTE,m),p=[]),E.concat(h,d,p).sort(function(A,T){return A.index-T.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function g(m,E){switch(E){case e.NUMERIC:return i.getBitsLength(m);case e.ALPHANUMERIC:return o.getBitsLength(m);case e.KANJI:return n.getBitsLength(m);case e.BYTE:return r.getBitsLength(m)}}function f(m){return m.reduce(function(E,h){const d=E.length-1>=0?E[E.length-1]:null;return d&&d.mode===h.mode?(E[E.length-1].data+=h.data,E):(E.push(h),E)},[])}function w(m){const E=[];for(let h=0;h<m.length;h++){const d=m[h];switch(d.mode){case e.NUMERIC:E.push([d,{data:d.data,mode:e.ALPHANUMERIC,length:d.length},{data:d.data,mode:e.BYTE,length:d.length}]);break;case e.ALPHANUMERIC:E.push([d,{data:d.data,mode:e.BYTE,length:d.length}]);break;case e.KANJI:E.push([d,{data:d.data,mode:e.BYTE,length:u(d.data)}]);break;case e.BYTE:E.push([{data:d.data,mode:e.BYTE,length:u(d.data)}])}}return E}function y(m,E){const h={},d={start:{}};let p=["start"];for(let B=0;B<m.length;B++){const A=m[B],T=[];for(let P=0;P<A.length;P++){const N=A[P],k=""+B+P;T.push(k),h[k]={node:N,lastCount:0},d[k]={};for(let tt=0;tt<p.length;tt++){const M=p[tt];h[M]&&h[M].node.mode===N.mode?(d[M][k]=g(h[M].lastCount+N.length,N.mode)-g(h[M].lastCount,N.mode),h[M].lastCount+=N.length):(h[M]&&(h[M].lastCount=N.length),d[M][k]=g(N.length,N.mode)+4+e.getCharCountIndicator(N.mode,E))}}p=T}for(let B=0;B<p.length;B++)d[p[B]].end=0;return{map:d,table:h}}function b(m,E){let h;const d=e.getBestModeForData(m);if(h=e.from(E,d),h!==e.BYTE&&h.bit<d.bit)throw new Error('"'+m+'" cannot be encoded with mode '+e.toString(h)+`.
 Suggested mode is: `+e.toString(d));switch(h===e.KANJI&&!c.isKanjiModeEnabled()&&(h=e.BYTE),h){case e.NUMERIC:return new i(m);case e.ALPHANUMERIC:return new o(m);case e.KANJI:return new n(m);case e.BYTE:return new r(m)}}t.fromArray=function(E){return E.reduce(function(h,d){return typeof d=="string"?h.push(b(d,null)):d.data&&h.push(b(d.data,d.mode)),h},[])},t.fromString=function(E,h){const d=C(E,c.isKanjiModeEnabled()),p=w(d),B=y(p,h),A=a.find_path(B.map,"start","end"),T=[];for(let P=1;P<A.length-1;P++)T.push(B.table[A[P]].node);return t.fromArray(f(T))},t.rawSplit=function(E){return t.fromArray(C(E,c.isKanjiModeEnabled()))}})(Ut);const x=I,nt=W,fe=Kt,de=Jt,ge=It,he=Tt,ct=Nt,at=Z,me=Yt,G=Pt,we=Rt,ye=R,rt=Ut;function Ee(t,e){const i=t.size,o=he.getPositions(e);for(let r=0;r<o.length;r++){const n=o[r][0],s=o[r][1];for(let c=-1;c<=7;c++)if(!(n+c<=-1||i<=n+c))for(let a=-1;a<=7;a++)s+a<=-1||i<=s+a||(c>=0&&c<=6&&(a===0||a===6)||a>=0&&a<=6&&(c===0||c===6)||c>=2&&c<=4&&a>=2&&a<=4?t.set(n+c,s+a,!0,!0):t.set(n+c,s+a,!1,!0))}}function Ce(t){const e=t.size;for(let i=8;i<e-8;i++){const o=i%2===0;t.set(i,6,o,!0),t.set(6,i,o,!0)}}function pe(t,e){const i=ge.getPositions(e);for(let o=0;o<i.length;o++){const r=i[o][0],n=i[o][1];for(let s=-2;s<=2;s++)for(let c=-2;c<=2;c++)s===-2||s===2||c===-2||c===2||s===0&&c===0?t.set(r+s,n+c,!0,!0):t.set(r+s,n+c,!1,!0)}}function Be(t,e){const i=t.size,o=G.getEncodedBits(e);let r,n,s;for(let c=0;c<18;c++)r=Math.floor(c/3),n=c%3+i-8-3,s=(o>>c&1)===1,t.set(r,n,s,!0),t.set(n,r,s,!0)}function ot(t,e,i){const o=t.size,r=we.getEncodedBits(e,i);let n,s;for(n=0;n<15;n++)s=(r>>n&1)===1,n<6?t.set(n,8,s,!0):n<8?t.set(n+1,8,s,!0):t.set(o-15+n,8,s,!0),n<8?t.set(8,o-n-1,s,!0):n<9?t.set(8,15-n-1+1,s,!0):t.set(8,15-n-1,s,!0);t.set(o-8,8,1,!0)}function Ae(t,e){const i=t.size;let o=-1,r=i-1,n=7,s=0;for(let c=i-1;c>0;c-=2)for(c===6&&c--;;){for(let a=0;a<2;a++)if(!t.isReserved(r,c-a)){let u=!1;s<e.length&&(u=(e[s]>>>n&1)===1),t.set(r,c-a,u),n--,n===-1&&(s++,n=7)}if(r+=o,r<0||i<=r){r-=o,o=-o;break}}}function be(t,e,i){const o=new fe;i.forEach(function(a){o.put(a.mode.bit,4),o.put(a.getLength(),ye.getCharCountIndicator(a.mode,t)),a.write(o)});const r=x.getSymbolTotalCodewords(t),n=at.getTotalCodewordsCount(t,e),s=(r-n)*8;for(o.getLengthInBits()+4<=s&&o.put(0,4);o.getLengthInBits()%8!==0;)o.putBit(0);const c=(s-o.getLengthInBits())/8;for(let a=0;a<c;a++)o.put(a%2?17:236,8);return Ie(o,t,e)}function Ie(t,e,i){const o=x.getSymbolTotalCodewords(e),r=at.getTotalCodewordsCount(e,i),n=o-r,s=at.getBlocksCount(e,i),c=o%s,a=s-c,u=Math.floor(o/s),l=Math.floor(n/s),C=l+1,g=u-l,f=new me(g);let w=0;const y=new Array(s),b=new Array(s);let m=0;const E=new Uint8Array(t.buffer);for(let A=0;A<s;A++){const T=A<a?l:C;y[A]=E.slice(w,w+T),b[A]=f.encode(y[A]),w+=T,m=Math.max(m,T)}const h=new Uint8Array(o);let d=0,p,B;for(p=0;p<m;p++)for(B=0;B<s;B++)p<y[B].length&&(h[d++]=y[B][p]);for(p=0;p<g;p++)for(B=0;B<s;B++)h[d++]=b[B][p];return h}function Te(t,e,i,o){let r;if(Array.isArray(t))r=rt.fromArray(t);else if(typeof t=="string"){let u=e;if(!u){const l=rt.rawSplit(t);u=G.getBestVersionForData(l,i)}r=rt.fromString(t,u||40)}else throw new Error("Invalid data");const n=G.getBestVersionForData(r,i);if(!n)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=n;else if(e<n)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+n+`.
`);const s=be(e,i,r),c=x.getSymbolSize(e),a=new de(c);return Ee(a,e),Ce(a),pe(a,e),ot(a,i,0),e>=7&&Be(a,e),Ae(a,s),isNaN(o)&&(o=ct.getBestMask(a,ot.bind(null,a,i))),ct.applyMask(o,a),ot(a,i,o),{modules:a,version:e,errorCorrectionLevel:i,maskPattern:o,segments:r}}At.create=function(e,i){if(typeof e>"u"||e==="")throw new Error("No input text");let o=nt.M,r,n;return typeof i<"u"&&(o=nt.from(i.errorCorrectionLevel,nt.M),r=G.from(i.version),n=ct.from(i.maskPattern),i.toSJISFunc&&x.setToSJISFunction(i.toSJISFunc)),Te(e,r,o,n)};var _t={},mt={};(function(t){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let o=i.slice().replace("#","").split("");if(o.length<3||o.length===5||o.length>8)throw new Error("Invalid hex color: "+i);(o.length===3||o.length===4)&&(o=Array.prototype.concat.apply([],o.map(function(n){return[n,n]}))),o.length===6&&o.push("F","F");const r=parseInt(o.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:r&255,hex:"#"+o.slice(0,6).join("")}}t.getOptions=function(o){o||(o={}),o.color||(o.color={});const r=typeof o.margin>"u"||o.margin===null||o.margin<0?4:o.margin,n=o.width&&o.width>=21?o.width:void 0,s=o.scale||4;return{width:n,scale:n?4:s,margin:r,color:{dark:e(o.color.dark||"#000000ff"),light:e(o.color.light||"#ffffffff")},type:o.type,rendererOpts:o.rendererOpts||{}}},t.getScale=function(o,r){return r.width&&r.width>=o+r.margin*2?r.width/(o+r.margin*2):r.scale},t.getImageWidth=function(o,r){const n=t.getScale(o,r);return Math.floor((o+r.margin*2)*n)},t.qrToImageData=function(o,r,n){const s=r.modules.size,c=r.modules.data,a=t.getScale(s,n),u=Math.floor((s+n.margin*2)*a),l=n.margin*a,C=[n.color.light,n.color.dark];for(let g=0;g<u;g++)for(let f=0;f<u;f++){let w=(g*u+f)*4,y=n.color.light;if(g>=l&&f>=l&&g<u-l&&f<u-l){const b=Math.floor((g-l)/a),m=Math.floor((f-l)/a);y=C[c[b*s+m]?1:0]}o[w++]=y.r,o[w++]=y.g,o[w++]=y.b,o[w]=y.a}}})(mt);(function(t){const e=mt;function i(r,n,s){r.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=s,n.width=s,n.style.height=s+"px",n.style.width=s+"px"}function o(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(n,s,c){let a=c,u=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(u=o()),a=e.getOptions(a);const l=e.getImageWidth(n.modules.size,a),C=u.getContext("2d"),g=C.createImageData(l,l);return e.qrToImageData(g.data,n,a),i(C,u,l),C.putImageData(g,0,0),u},t.renderToDataURL=function(n,s,c){let a=c;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const u=t.render(n,s,a),l=a.type||"image/png",C=a.rendererOpts||{};return u.toDataURL(l,C.quality)}})(_t);var vt={};const Ne=mt;function Bt(t,e){const i=t.a/255,o=e+'="'+t.hex+'"';return i<1?o+" "+e+'-opacity="'+i.toFixed(2).slice(1)+'"':o}function it(t,e,i){let o=t+e;return typeof i<"u"&&(o+=" "+i),o}function Le(t,e,i){let o="",r=0,n=!1,s=0;for(let c=0;c<t.length;c++){const a=Math.floor(c%e),u=Math.floor(c/e);!a&&!n&&(n=!0),t[c]?(s++,c>0&&a>0&&t[c-1]||(o+=n?it("M",a+i,.5+u+i):it("m",r,0),r=0,n=!1),a+1<e&&t[c+1]||(o+=it("h",s),s=0)):r++}return o}vt.render=function(e,i,o){const r=Ne.getOptions(i),n=e.modules.size,s=e.modules.data,c=n+r.margin*2,a=r.color.light.a?"<path "+Bt(r.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",u="<path "+Bt(r.color.dark,"stroke")+' d="'+Le(s,n,r.margin)+'"/>',l='viewBox="0 0 '+c+" "+c+'"',g='<svg xmlns="http://www.w3.org/2000/svg" '+(r.width?'width="'+r.width+'" height="'+r.width+'" ':"")+l+' shape-rendering="crispEdges">'+a+u+`</svg>
`;return typeof o=="function"&&o(null,g),g};const Me=Vt,ut=At,kt=_t,Pe=vt;function wt(t,e,i,o,r){const n=[].slice.call(arguments,1),s=n.length,c=typeof n[s-1]=="function";if(!c&&!Me())throw new Error("Callback required as last argument");if(c){if(s<2)throw new Error("Too few arguments provided");s===2?(r=i,i=e,e=o=void 0):s===3&&(e.getContext&&typeof r>"u"?(r=o,o=void 0):(r=o,o=i,i=e,e=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(i=e,e=o=void 0):s===2&&!e.getContext&&(o=i,i=e,e=void 0),new Promise(function(a,u){try{const l=ut.create(i,o);a(t(l,e,o))}catch(l){u(l)}})}try{const a=ut.create(i,o);r(null,t(a,e,o))}catch(a){r(a)}}$.create=ut.create;$.toCanvas=wt.bind(null,kt.render);$.toDataURL=wt.bind(null,kt.renderToDataURL);$.toString=wt.bind(null,function(t,e,i){return Pe.render(t,i)});const H=200,O=200;function Se(t,e){const i=H*3,o=O*3,r=Math.max(t,i),n=Math.max(e,o);return Math.max(r/t,n/e)}function Re(t,e,i){let r=0,n=0;switch(i){case"leftTop":r=20,n=20;break;case"rightTop":r=t-H-20,n=20;break;case"center":r=(t-H)/2,n=(e-O)/2;break;case"leftBottom":r=20,n=e-O-20;break;case"rightBottom":r=t-H-20,n=e-O-20;break}return{x:r,y:n}}function De(t,e,i){return new Promise(function(o,r){const n=document.createElement("canvas"),s=n.getContext("2d"),c=new Image;c.src=URL.createObjectURL(t),c.onload=function(){const a=Se(c.width,c.height),u=c.width*a,l=c.height*a;n.width=u,n.height=l,s.drawImage(c,0,0,u,l);const C=new Image;C.src=e,C.onload=function(){const{x:g,y:f}=Re(u,l,i);console.log(g,f),s.drawImage(C,g,f,H,O);const w=n.toDataURL("image/jpeg");return o(w),w}}})}function lt(t){return!t||t.trim()===""}function D(t){return document.querySelector(t)}const ft=D("#address"),zt=D("#address-error"),Ue=D("#position"),Y=D("#background-file"),Q=D('label[for="background-file"]'),Fe=D("#generate"),yt=D("#download"),Et=D("#pic"),Ht="border-red-600",Ot="border-gray-300";Y.addEventListener("change",function(t){const e=t.target.files[0];Et.src=URL.createObjectURL(e),Q.classList.remove(Ht),Q.classList.add(Ot),yt.classList.add("hidden")});ft.addEventListener("input",function(){lt(ft.value)||zt.classList.add("hidden")});Fe.addEventListener("click",async function(){const t=ft.value,e=Ue.value;(lt(t)||Y.files.length===0)&&(lt(t)&&zt.classList.remove("hidden"),Y.files.length===0&&(Q.classList.remove(Ot),Q.classList.add(Ht)));const i=await $.toDataURL(t,{width:200,margin:1}),o=await De(Y.files[0],i,e);Et.src=o,window.scrollTo(0,document.body.scrollHeight),yt.classList.remove("hidden")});yt.addEventListener("click",function(){const t=document.createElement("a");t.href=Et.src,t.download="qrcode.jpg",t.click()});
