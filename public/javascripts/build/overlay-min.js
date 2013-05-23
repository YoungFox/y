/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Apr 17 00:22
*/
KISSY.add("overlay/base",function(d,e,b,a,c,g,f,h){return e.Controller.extend([b.Position,a,b.Align,c,g,h],{},{ATTRS:{focusable:{value:!1},allowTextSelection:{value:!0},closable:{value:!1},handleMouseEvents:{value:!1},xrender:{value:f}}},{xclass:"overlay",priority:10})},{requires:"component/base,component/extension,./extension/loading,./extension/close,./extension/mask,./overlay-render,./extension/overlay-effect".split(",")});
KISSY.add("overlay/dialog-render",function(d,e,b){return e.extend([b],{createDom:function(){var a=this.get("el"),c,b=this.get("header");if(!(c=b.attr("id")))b.attr("id",c=d.guid("ks-dialog-header"));a.attr("role","dialog").attr("aria-labelledby",c);a.append("<div tabindex='0' style='position:absolute;'></div>")}})},{requires:["./overlay-render","./extension/stdmod-render"]});
KISSY.add("overlay/dialog",function(d,e,b,a,c,g){var f=e.extend([c,g],{handleKeyEventInternal:function(f){if(this.get("escapeToClose")&&f.keyCode===a.KeyCodes.ESC){if("select"!=f.target.nodeName.toLowerCase()||f.target.disabled)this.close(),f.halt()}else a:if(f.keyCode==h){var b=this.get("el"),c=a.all(f.target),d=b.last();if(c.equals(b)&&f.shiftKey)d[0].focus(),f.halt();else if(c.equals(d)&&!f.shiftKey)this.focus(),f.halt();else if(c.equals(b)||b.contains(c))break a;f.halt()}},_onSetVisible:function(a){var b=
this.get("el");if(a)this.__lastActive=b[0].ownerDocument.activeElement,this.set("focused",!0),b.attr("aria-hidden","false");else{b.attr("aria-hidden","true");try{this.__lastActive&&this.__lastActive.focus()}catch(c){}}f.superclass._onSetVisible.apply(this,arguments)}},{ATTRS:{closable:{value:!0},xrender:{value:b},focusable:{value:!0},escapeToClose:{value:!0}}},{xclass:"dialog",priority:20}),h=a.KeyCodes.TAB;return f},{requires:["./base","./dialog-render","node","./extension/stdmod","./extension/dialog-effect"]});
KISSY.add("overlay/extension/close-render",function(d,e){function b(a){return new e("<a tabindex='0' href='javascript:void(\"\u5173\u95ed\")' role='button' style='z-index:9' class='"+a+c+"close'><span class='"+a+c+"close-x'>\u5173\u95ed</span></a>")}function a(){}var c="ext-";a.ATTRS={closable:{value:!0},closeBtn:{}};a.HTML_PARSER={closeBtn:function(a){return a.one("."+this.get("prefixCls")+c+"close")}};a.prototype={_onSetClosable:function(a){var f=this.get("closeBtn");a?(f||this.setInternal("closeBtn",f=b(this.get("prefixCls"))),
this.get("el").prepend(f)):f&&f.remove()}};return a},{requires:["node"]});
KISSY.add("overlay/extension/close",function(){function d(){}d.ATTRS={closable:{view:1},closeBtn:{view:1},closeAction:{value:"hide"}};var e={hide:"hide",destroy:"destroy"};d.prototype={_onSetClosable:function(b){var a=this;b&&!a.__bindCloseEvent&&(a.__bindCloseEvent=1,a.get("closeBtn").on("click",function(b){a.close();b.preventDefault()}))},close:function(){this[e[this.get("closeAction")]||"hide"]();return this},__destructor:function(){var b=this.get("closeBtn");b&&b.detach()}};return d});
KISSY.add("overlay/extension/dialog-effect",function(){function d(){}d.prototype={__afterCreateEffectGhost:function(d){var b=this.get("body");d.all("."+this.get("prefixCls")+"stdmod-body").css({height:b.height(),width:b.width()}).html("");return d}};return d});
KISSY.add("overlay/extension/loading-render",function(d,e){function b(){}b.prototype={loading:function(){this._loadingExtEl||(this._loadingExtEl=(new e("<div class='"+this.get("prefixCls")+"ext-loading' style='position: absolute;border: none;width: 100%;top: 0;left: 0;z-index: 99999;height:100%;*height: expression(this.parentNode.offsetHeight);'/>")).appendTo(this.get("el")));this._loadingExtEl.show()},unloading:function(){var a=this._loadingExtEl;a&&a.hide()}};return b},{requires:["node"]});
KISSY.add("overlay/extension/loading",function(){function d(){}d.prototype={loading:function(){this.get("view").loading();return this},unloading:function(){this.get("view").unloading();return this}};return d});
KISSY.add("overlay/extension/mask-render",function(d,e){function b(a){a=a.getCssClassWithPrefix("ext-mask")+" "+a.getCssClassWithState("mask");a=g("<div  style='width:"+(c?"expression(KISSY.DOM.docWidth())":"100%")+";left:0;top:0;height:"+(c?"expression(KISSY.DOM.docHeight())":"100%")+";position:"+(c?"absolute":"fixed")+";' class='"+a+"'>"+(c?"<iframe style='position:absolute;left:0;top:0;background:red;width: expression(this.parentNode.offsetWidth);height: expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;'></iframe>":
"")+"</div>").prependTo("body");a.unselectable();a.on("mousedown",function(a){a.preventDefault()});return a}function a(){}var c=6===d.UA.ie,g=e.all;a.ATTRS={mask:{value:!1},maskNode:{}};a.prototype={__renderUI:function(){this.get("mask")&&this.set("maskNode",b(this))},__syncUI:function(){this.get("mask")&&this.ksSetMaskVisible(this.get("visible"))},ksSetMaskVisible:function(a){var b=this.getCssClassWithState("mask-shown"),c=this.get("maskNode"),d=this.getCssClassWithState("mask-hidden");a?c.removeClass(d).addClass(b):
c.removeClass(b).addClass(d)},__destructor:function(){var a;(a=this.get("maskNode"))&&a.remove()}};return a},{requires:["node"]});
KISSY.add("overlay/extension/mask",function(d,e){function b(){}function a(a,b,d,e){var m=a.effect||c;if(m==c)e.ksSetMaskVisible(d);else{e.ksSetMaskVisible(d);var e=a.duration,a=a.easing,n=d?1:0;b.stop(1,1);b.css("display",d?c:"block");b[m+g[m][n]](e,function(){b.css("display","")},a)}}b.ATTRS={mask:{view:1},maskNode:{view:1}};var c="none",g={fade:["Out","In"],slide:["Up","Down"]};b.prototype={__bindUI:function(){var b,c,d=this.get("el"),g=this.get("view");if(c=this.get("mask")){b=this.get("maskNode");
if(c.closeOnClick)b.on(e.Gesture.tap,this.close,this);this.on("afterVisibleChange",function(e){if(e=e.newVal){var n=parseInt(d.css("z-index"))||1;b.css("z-index",n-1)}a(c,b,e,g)})}}};return b},{requires:["event"]});
KISSY.add("overlay/extension/overlay-effect",function(d){function e(a){var b=a.get("el").clone(!0);b.css({visibility:"visible",overflow:h}).addClass(a.get("prefixCls")+"overlay-ghost");return a.__afterCreateEffectGhost(b)}function b(a,b,c){a.__effectGhost&&a.__effectGhost.stop(1,1);var f=a.get("el"),g=d.all,j=a.get("effect"),i=g(j.target),g=j.duration,i=d.mix(i.offset(),{width:i.width(),height:i.height()}),l=d.mix(f.offset(),{width:f.width(),height:f.height()}),k=e(a),j=j.easing;k.insertAfter(f);
f.css("visibility",h);b?(b=i,i=l):b=l;k.css(b);a.__effectGhost=k;k.animate(i,{duration:g,easing:j,complete:function(){a.__effectGhost=null;k.remove();f.css("visibility","");c()}})}function a(a,c,d){var e=a.get("el"),h=a.get("effect"),j=h.effect||g,i=h.target;j==g&&!i?d():i?b(a,c,d):(a=h.duration,h=h.easing,i=c?1:0,e.stop(1,1),e.css({visibility:l,display:c?g:f}),e[j+k[j][i]](a,function(){e.css({display:f,visibility:""});d()},h))}function c(){}var g="none",f="block",h="hidden",l="visible",k={fade:["Out",
"In"],slide:["Up","Down"]};c.ATTRS={effect:{value:{effect:"",target:null,duration:0.5,easing:"easeOut"},setter:function(a){var b=a.effect;"string"==typeof b&&!k[b]&&(a.effect="")}}};c.prototype={__afterCreateEffectGhost:function(a){return a},_onSetVisible:function(b){var c=this;c.get("rendered")&&a(c,b,function(){c.fire(b?"show":"hide")})}};return c});
KISSY.add("overlay/extension/stdmod-render",function(d,e){function b(){}function a(a,b){var c=a.get("contentEl"),d=a.get(b);d||(d=new e("<div class='"+a.get("prefixCls")+g+b+"'  ></div>"),d.appendTo(c),a.setInternal(b,d))}function c(a,b,c){b=a.get(b);"string"==typeof c?b.html(c):b.html("").append(c)}var g="stdmod-";b.ATTRS={header:{},body:{},footer:{},bodyStyle:{},footerStyle:{},headerStyle:{},headerContent:{},bodyContent:{},footerContent:{}};b.HTML_PARSER={header:function(a){return a.one("."+this.get("prefixCls")+
g+"header")},body:function(a){return a.one("."+this.get("prefixCls")+g+"body")},footer:function(a){return a.one("."+this.get("prefixCls")+g+"footer")}};b.prototype={__createDom:function(){a(this,"header");a(this,"body");a(this,"footer")},getContentElement:function(){return this.get("body")},_onSetBodyStyle:function(a){this.get("body").css(a)},_onSetHeaderStyle:function(a){this.get("header").css(a)},_onSetFooterStyle:function(a){this.get("footer").css(a)},_onSetBodyContent:function(a){c(this,"body",
a)},_onSetHeaderContent:function(a){c(this,"header",a)},_onSetFooterContent:function(a){c(this,"footer",a)}};return b},{requires:["node"]});KISSY.add("overlay/extension/stdmod",function(){function d(){}d.ATTRS={header:{view:1},body:{view:1},footer:{view:1},bodyStyle:{view:1},footerStyle:{view:1},headerStyle:{view:1},headerContent:{view:1},bodyContent:{view:1},footerContent:{view:1}};return d});
KISSY.add("overlay/overlay-render",function(d,e,b,a,c,g){return e.Render.extend([b.ContentBox.Render,b.Position.Render,a,6===d.UA.ie?b.Shim.Render:null,c,g])},{requires:["component/base","component/extension","./extension/loading-render","./extension/close-render","./extension/mask-render"]});
KISSY.add("overlay",function(d,e,b,a,c,g){e.Render=b;a.Render=c;e.Dialog=a;d.Dialog=a;e.Popup=g;return d.Overlay=e},{requires:["overlay/base","overlay/overlay-render","overlay/dialog","overlay/dialog-render","overlay/popup"]});
KISSY.add("overlay/popup",function(d,e,b){return e.extend({initializer:function(){var a=this;a.get("trigger")&&("mouse"===a.get("triggerType")?(a._bindTriggerMouse(),a.on("afterRenderUI",function(){a._bindContainerMouse()})):a._bindTriggerClick())},_bindTriggerMouse:function(){var a=this,c=a.get("trigger"),e;a.__mouseEnterPopup=function(c){a._clearHiddenTimer();e=d.later(function(){a._showing(c);e=b},1E3*a.get("mouseDelay"))};c.on("mouseenter",a.__mouseEnterPopup);a._mouseLeavePopup=function(){e&&
(e.cancel(),e=b);a._setHiddenTimer()};c.on("mouseleave",a._mouseLeavePopup)},_bindContainerMouse:function(){this.get("el").on("mouseleave",this._setHiddenTimer,this).on("mouseenter",this._clearHiddenTimer,this)},_setHiddenTimer:function(){var a=this;a._hiddenTimer=d.later(function(){a._hiding()},1E3*a.get("mouseDelay"))},_clearHiddenTimer:function(){this._hiddenTimer&&(this._hiddenTimer.cancel(),this._hiddenTimer=b)},_bindTriggerClick:function(){var a=this;a.__clickPopup=function(b){b.halt();if(a.get("toggle"))a[a.get("visible")?
"_hiding":"_showing"](b);else a._showing(b)};a.get("trigger").on("click",a.__clickPopup)},_showing:function(a){this.set("currentTrigger",d.one(a.target));this.show()},_hiding:function(){this.set("currentTrigger",b);this.hide()},destructor:function(){var a,b=this.get("trigger");b&&(this.__clickPopup&&b.detach("click",this.__clickPopup),this.__mouseEnterPopup&&b.detach("mouseenter",this.__mouseEnterPopup),this._mouseLeavePopup&&b.detach("mouseleave",this._mouseLeavePopup));(a=this.get("el"))&&a.detach("mouseleave",
this._setHiddenTimer,this).detach("mouseenter",this._clearHiddenTimer,this)}},{ATTRS:{trigger:{setter:function(a){return d.all(a)}},triggerType:{value:"click"},currentTrigger:{},mouseDelay:{value:0.1},toggle:{value:!1}}},{xclass:"popup",priority:20})},{requires:["./base"]});
