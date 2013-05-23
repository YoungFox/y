/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: May 6 14:25
*/
KISSY.add("datalazyload",function(f,e,h,z,n){var o,m;function p(a,b){a.style.display=A;a.className="";var c=e.create("<div>");a.parentNode.insertBefore(c,a);e.html(c,a.value,b)}function u(a,b){var c,d;if(!(c=a.id))c=a.id=f.guid("ks-lazyload");if(!(d=b.ksLazyloadId))d=b.ksLazyloadId=f.guid("ks-lazyload");return c+d}function q(a,b,c){if(!a.offsetWidth)return!1;var d=e.offset(a),g=!0,f=d.left,d=d.top,a={left:f,top:d,right:f+(a._ks_lazy_width?a._ks_lazy_width:a._ks_lazy_width=e.outerWidth(a)),bottom:d+
(a._ks_lazy_height?a._ks_lazy_height:a._ks_lazy_height=e.outerHeight(a))};(b=v(b,a))&&c&&(g=v(c,a));return g&&b}function i(a,b){if(!(this instanceof i))return new i(a,b);var c=a;f.isPlainObject(c)||(c=b||{},a&&(c.container=a));i.superclass.constructor.call(this,c);this._callbacks={};this._containerIsNotDocument=9!=this.get("container").nodeType;this._initLoadEvent()}function v(a,b){var c,d,g,f;c=Math.max(a.top,b.top);d=Math.min(a.bottom,b.bottom);g=Math.max(a.left,b.left);f=Math.min(a.right,b.right);
return d>=c&&f>=g}function r(a){if(o)a(m);else{var b;b=e.create("<img>");h.on(b,"load error",function(b){b=""+b.type;"load"==b?m=4===Number(this.width):"error"==b&&(m=!1);o=!0;a(m)});e.attr(b,"src","data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAAAQAgCdASoEAAQAAAcIhYWIhYSIgIIADA1gAAUAAAEAAAEAAP7%2F2fIAAAAA")}}var l=f.Env.host,w=l.document,s="data-ks-lazyload",x="ks-datalazyload",y="-custom",A="none";m=o=!1;var t=function(a,b,c){var b=b||s,d=a.getAttribute(b),g="";if(d&&a.src!=d){if(c&&m)if(f.isFunction(c))g=
c(d,a);else{if(f.isArray(c)){var e,j=c.length,k;for(e=0;e<j;e++)if(k=c[e],d.match(k[0])){g=d.replace(k[0],k[1]);break}}}else g=d;g||(g=d);a.src=g;a.removeAttribute(b)}};i.ATTRS={diff:{value:"default"},placeholder:{value:"http://a.tbcdn.cn/kissy/1.0.0/build/imglazyload/spaceball.gif"},execScript:{value:!0},container:{setter:function(a){a=a||w;f.isWindow(a)?a=a.document:(a=e.get(a),"body"==e.nodeName(a)&&(a=a.ownerDocument));return a},valueFn:function(){return w}},autoDestroy:{value:!0},webpFilter:{value:null}};
f.extend(i,z,{_filterItems:function(){var a=this,b=a.userConfig,c=[],d=[],g=[a.get("container")];f.isArray(b.container)&&(a._backCompact=1,g=b.container);f.each(g,function(b){c=c.concat(f.filter(e.query("img",b),a._filterImg,a));d=d.concat(e.query("textarea."+x,b))});a._images=c;a._textareas=d},_filterImg:function(a){var b=this.get("placeholder");return a.getAttribute(s)?(a.src||(a.src=b),!0):n},_initLoadEvent:function(){function a(){b._filterItems();b._isLoadAllLazyElements()||f.ready(j);b.resume()}
var b=this,c=new Image,d=b.get("placeholder"),g=b.get("autoDestroy"),e=function(){b._loadItems();g&&b._isLoadAllLazyElements()&&b.destroy()},j=function(){b.get("webpFilter")?r(function(){e()}):e()};b._loadFn=f.buffer(j,100,b);c.src=d;c.complete?a():c.onload=a},refresh:function(){this._loadFn()},_loadItems:function(){var a,b=this.get("container");if(!this._containerIsNotDocument||b.offsetWidth)b=this._getBoundingRect(),!this._backCompact&&this._containerIsNotDocument&&(a=this._getBoundingRect(this.get("container"))),
this._loadImgs(b,a),this._loadTextAreas(b,a),this._fireCallbacks(b,a)},_loadImgs:function(a,b){var c=this;c._images=f.filter(c._images,function(d){return q(d,a,b)?t(d,n,c.get("webpFilter")):!0},c)},_loadTextAreas:function(a,b){var c=this.get("execScript");this._textareas=f.filter(this._textareas,function(d){return q(d,a,b)?p(d,c):!0},this)},_fireCallbacks:function(a,b){var c=this._callbacks;f.each(c,function(d,f){var e=d.el,j=!1,k=d.fn;q(e,a,b)&&(j=k.call(e));!1!==j&&delete c[f]})},addCallback:function(a,
b){var c=this._callbacks,a=e.get(a);c[u(a,b)]={el:e.get(a),fn:b};this._loadFn()},removeCallback:function(a,b){var c=this._callbacks,a=e.get(a);delete c[u(a,b)]},getElements:function(){return{images:this._images,textareas:this._textareas}},addElements:function(a){"string"==typeof a?a=e.query(a):f.isArray(a)||(a=[a]);var b=this._images||[],c=this._textareas||[];f.each(a,function(a){var e=a.nodeName.toLowerCase();"img"==e?f.inArray(a,b)||b.push(a):"textarea"==e&&(f.inArray(a,c)||c.push(a))});this._images=
b;this._textareas=c},removeElements:function(a){"string"==typeof a?a=e.query(a):f.isArray(a)||(a=[a]);var b=[],c=[];f.each(this._images,function(c){f.inArray(c,a)||b.push(c)});f.each(this._textareas,function(b){f.inArray(b,a)||c.push(b)});this._images=b;this._textareas=c},_getBoundingRect:function(a){var b,c,d;a!==n?(b=e.outerHeight(a),c=e.outerWidth(a),d=e.offset(a),a=d.left,d=d.top):(b=e.viewportHeight(),c=e.viewportWidth(),a=e.scrollLeft(),d=e.scrollTop());var g=this.get("diff"),h=0,j="default"===
g?c:g,k=0,i="default"===g?b:g;c=a+c;b=d+b;f.isObject(g)&&(h=g.left||0,j=g.right||0,k=g.top||0,i=g.bottom||0);return{left:a-h,top:d-k,right:c+j,bottom:b+i}},_isLoadAllLazyElements:function(){return 0==this._images.length+this._textareas.length+(f.isEmptyObject(this._callbacks)?0:1)},pause:function(){var a=this._loadFn;if(!this._destroyed&&(h.remove(l,"scroll",a),h.remove(l,"touchmove",a),h.remove(l,"resize",a),a.stop(),this._containerIsNotDocument)){var b=this.get("container");h.remove(b,"scroll",
a);h.remove(b,"touchmove",a)}},resume:function(){var a=this._loadFn;if(!this._destroyed&&(h.on(l,"scroll",a),h.on(l,"touchmove",a),h.on(l,"resize",a),this._containerIsNotDocument)){var b=this.get("container");h.on(b,"scroll",a);h.on(b,"touchmove",a)}},destroy:function(){this.pause();this._callbacks={};this._images=[];this._textareas=[];this.fire("destroy");this._destroyed=1}});i.loadCustomLazyData=function(a,b,c,d){function g(){"img-src"===b&&(b="img");f.isArray(a)||(a=[e.get(a)]);var g=c||s+y,h=
c||x+y;f.each(a,function(a){var c=e.nodeName(a);"img"==b?"img"==c?t(a,g,d):e.query("img",a).each(function(a){t(a,g,d)}):"textarea"==c?e.hasClass(a,h)&&p(a,!0):e.query("textarea."+h,a).each(function(a){p(a,!0)})})}d?r(g):g()};i.checkWebpSupport=r;return f.DataLazyload=i},{requires:["dom","event","base"]});
