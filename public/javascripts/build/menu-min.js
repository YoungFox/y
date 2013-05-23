/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Apr 17 00:22
*/
KISSY.add("menu/base",function(h,b,e,f,c){function a(a){this.get("view").setAriaActiveDescendant(a.newVal)}var d=b.KeyCodes,g=e.Container.extend({isMenu:1,_onSetHighlightedItem:function(a,c){var d;a&&(d=c.prevVal)&&d.set("highlighted",!1,{data:{byPassSetHighlightedItem:1}})},_onSetVisible:function(a,c){g.superclass._onSetVisible.apply(this,arguments);var d;!a&&(d=this.get("highlightedItem"))&&d.set("highlighted",!1)},bindUI:function(){this.on("afterHighlightedItemChange",a,this)},getRootMenu:function(){return this},
handleMouseEnter:function(){g.superclass.handleMouseEnter.apply(this,arguments);var a=this.getRootMenu();a&&a._popupAutoHideTimer&&(clearTimeout(a._popupAutoHideTimer),a._popupAutoHideTimer=null);this.get("focusable")&&this.set("focused",!0)},handleBlur:function(a){g.superclass.handleBlur.call(this,a);var d;(d=this.get("highlightedItem"))&&d.set("highlighted",!1)},_getNextEnabledHighlighted:function(a,d){var g=this.get("children"),e=g.length,i=a;do{var n=g[a];if(!n.get("disabled")&&!1!==n.get("visible"))return g[a];
a=(a+d+e)%e}while(a!=i);return c},handleKeyEventInternal:function(a){var g=this.get("highlightedItem");if(g&&g.handleKeydown(a))return!0;var e=this.get("children"),b=e.length;if(0===b)return c;var i;switch(a.keyCode){case d.ESC:(g=this.get("highlightedItem"))&&g.set("highlighted",!1);break;case d.HOME:i=this._getNextEnabledHighlighted(0,1);break;case d.END:i=this._getNextEnabledHighlighted(b-1,-1);break;case d.UP:g?(a=h.indexOf(g,e),b=(a-1+b)%b):b-=1;i=this._getNextEnabledHighlighted(b,-1);break;
case d.DOWN:g?(a=h.indexOf(g,e),b=(a+1+b)%b):b=0,i=this._getNextEnabledHighlighted(b,1)}return i?(i.set("highlighted",!0,{data:{fromKeyboard:1}}),!0):c},containsElement:function(a){if(!1===this.get("visible")||!this.get("view"))return!1;if(this.get("view").containsElement(a))return!0;for(var d=this.get("children"),c=0,g=d.length;c<g;c++){var i=d[c];if(i.containsElement&&i.containsElement(a))return!0}return!1}},{ATTRS:{highlightedItem:{value:null},xrender:{value:f},defaultChildCfg:{value:{xclass:"menuitem"}}}},
{xclass:"menu",priority:10});return g},{requires:["event","component/base","./menu-render"]});
KISSY.add("menu/filtermenu-render",function(h,b,e){var f=b.all;return e.extend({getContentElement:function(){return this.get("menuContent")},getKeyEventTarget:function(){return this.get("filterInput")},createDom:function(){var c=this.get("prefixCls"),a=this.get("el"),d=this.get("filterWrap");d||this.set("filterWrap",d=f("<div class='"+c+"menu-filter'/>").appendTo(a,void 0));this.get("labelEl")||this.set("labelEl",f("<div class='"+c+"menu-filter-label'/>").appendTo(d,void 0));this.get("filterInput")||
this.set("filterInput",f("<input autocomplete='off'/>").appendTo(d,void 0));this.get("menuContent")||this.set("menuContent",f("<div class='"+c+"menu-content'/>").appendTo(a,void 0))},_onSetLabel:function(c){this.get("labelEl").html(c)}},{ATTRS:{label:{}},HTML_PARSER:{labelEl:function(c){return c.one("."+this.get("prefixCls")+"menu-filter").one("."+this.get("prefixCls")+"menu-filter-label")},filterWrap:function(c){return c.one("."+this.get("prefixCls")+"menu-filter")},menuContent:function(c){return c.one("."+
this.get("prefixCls")+"menu-content")},filterInput:function(c){return c.one("."+this.get("prefixCls")+"menu-filter").one("input")}}})},{requires:["node","./menu-render"]});
KISSY.add("menu/filtermenu",function(h,b,e,f){var c=e.extend([b.DecorateChild],{bindUI:function(){this.get("view").get("filterInput").on("valuechange",this.handleFilterEvent,this)},handleMouseEnter:function(){c.superclass.handleMouseEnter.apply(this,arguments);this.getKeyEventTarget()[0].select()},handleFilterEvent:function(){var a;a=this.get("view").get("filterInput");var d=this.get("highlightedItem");this.set("filterStr",a.val());a=a.val();this.get("allowMultiple")&&(a=a.replace(/^.+,/,""));if(!a&&
d)d.set("highlighted",!1);else if(a&&(!d||!d.get("visible")))(d=this._getNextEnabledHighlighted(0,1))&&d.set("highlighted",!0)},_onSetFilterStr:function(a){this.filterItems(a)},filterItems:function(a){var d=this.get("prefixCls"),c=this.get("view"),b=c.get("labelEl"),c=c.get("filterInput");b[a?"hide":"show"]();if(this.get("allowMultiple")){var b=[],e;e=a.match(/(.+)[,\uff0c]\s*([^\uff0c,]*)/);var f=[];e&&(f=e[1].split(/[,\uff0c]/));/[,\uff0c]$/.test(a)?(b=[],e&&(b=f,e=f[f.length-1],(f=(f=this.get("highlightedItem"))&&
f.get("content"))&&-1<f.indexOf(e)&&e&&(b[b.length-1]=f),c.val(b.join(",")+",")),a=""):(e&&(a=e[2]||""),b=f);this.get("enteredItems").length!=b.length&&this.set("enteredItems",b)}var c=this.get("children"),k=a&&RegExp(h.escapeRegExp(a),"ig");h.each(c,function(i){var c=i.get("content");a?-1<c.indexOf(a)?(i.set("visible",!0),i.get("el").html(c.replace(k,function(a){return"<span class='"+d+"menuitem-hit'>"+a+"</span>"}))):i.set("visible",!1):(i.get("el").html(c),i.set("visible",!0))})},reset:function(){var a=
this.get("view");this.set("filterStr","");this.set("enteredItems",[]);(a=a&&a.get("filterInput"))&&a.val("")},destructor:function(){var a=this.get("view");(a=a&&a.get("filterInput"))&&a.detach()}},{ATTRS:{allowTextSelection:{value:!0},label:{view:1},filterStr:{},enteredItems:{value:[]},allowMultiple:{value:!1},decorateChildCls:{value:"menu-content"},xrender:{value:f}}},{xclass:"filter-menu",priority:20});return c},{requires:["component/base","./base","./filtermenu-render"]});
KISSY.add("menu/menu-render",function(h,b){return b.Render.extend({renderUI:function(){var b=this.get("el");b.attr("role","menu").attr("aria-haspopup",!0);b.attr("id")||b.attr("id",h.guid("ks-menu"))},setAriaActiveDescendant:function(b){var f=this.get("el");b?(b=b.get("el").attr("id"),f.attr("aria-activedescendant",b)):f.attr("aria-activedescendant","")},containsElement:function(b){var f=this.get("el");return f[0]===b||f.contains(b)}})},{requires:["component/base"]});
KISSY.add("menu",function(h,b,e,f,c,a,d,g,j,l){b.Render=e;b.Item=f;f.Render=c;b.SubMenu=a;a.Render=d;b.PopupMenu=g;g.Render=j;b.FilterMenu=l;return b},{requires:"menu/base,menu/menu-render,menu/menuitem,menu/menuitem-render,menu/submenu,menu/submenu-render,menu/popupmenu,menu/popupmenu-render,menu/filtermenu".split(",")});
KISSY.add("menu/menuitem-render",function(h,b,e,f){return e.Render.extend({createDom:function(){this.get("el").attr({role:"menuitem",id:h.guid("ks-menuitem")})},_onSetChecked:function(b){var a=this.get("el"),d=this.getCssClassWithState("checked");a[b?"addClass":"removeClass"](d)},_onSetSelected:function(b){var a=this.get("el"),d=this.getCssClassWithState("selected");a[b?"addClass":"removeClass"](d)},_onSetSelectable:function(b){this.get("el").attr("role",b?"menuitemradio":"menuitem")},_onSetCheckable:function(c){if(c){var a=
this.get("el"),d=this.get("prefixCls"),g=a.one("."+d+"menuitem-checkbox");g||(g=(new b("<div class='"+d+"menuitem-checkbox'/>")).prependTo(a),g.unselectable(f))}this.get("el").attr("role",c?"menuitemcheckbox":"menuitem")},containsElement:function(b){var a=this.get("el");return a&&(a[0]==b||a.contains(b))}},{ATTRS:{checkable:{},selected:{},checked:{}},HTML_PARSER:{selectable:function(b){var a=this.getCssClassWithPrefix("menuitem-selectable");return b.hasClass(a)},checkable:function(b){var a=this.getCssClassWithPrefix("menuitem-checkable");
return b.hasClass(a)}}})},{requires:["node","component/base"]});
KISSY.add("menu/menuitem",function(h,b,e){var f=h.all,c=b.Controller.extend({isMenuItem:1,handleMouseDown:function(a){c.superclass.handleMouseDown.call(this,a);this.set("highlighted",!0)},performActionInternal:function(){this.get("selectable")&&this.set("selected",!0);this.get("checkable")&&this.set("checked",!this.get("checked"));this.fire("click");return!0},_onSetHighlighted:function(a,b){if(!b||!b.byPassSetHighlightedItem)this.get("parent").set("highlightedItem",a?this:null);if(a){var c=this.get("el"),
e=c.parent(function(a){return"visible"!=f(a).css("overflow")},this.get("parent").get("el").parent());e&&c.scrollIntoView(e,{alignWithTop:!0,allowHorizontalScroll:!0,onlyScrollIfNeeded:!0})}},containsElement:function(a){return this.get("view")&&this.get("view").containsElement(a)}},{ATTRS:{focusable:{value:!1},handleMouseEvents:{value:!1},selectable:{view:1},checkable:{view:1},value:{},checked:{view:1},selected:{view:1},xrender:{value:e}}},{xclass:"menuitem",priority:10});return c},{requires:["component/base",
"./menuitem-render"]});KISSY.add("menu/popupmenu-render",function(h,b,e){return e.extend([b.ContentBox.Render,b.Position.Render,6===h.UA.ie?b.Shim.Render:null])},{requires:["component/extension","./menu-render"]});
KISSY.add("menu/popupmenu",function(h,b,e,f){var c=e.extend([b.Position,b.Align],{getRootMenu:function(){var a=this,b;do b=a,a=a.get("parent");while(a&&(a.isMenuItem||a.isMenu));return b===this?null:b},handleMouseLeave:function(a){c.superclass.handleMouseLeave.apply(this,arguments);var b=this.get("parent");b&&b.isSubMenu&&b.clearSubMenuTimers();if(this.get("autoHideOnMouseLeave")){var e=this.getRootMenu();e&&(clearTimeout(e._popupAutoHideTimer),e._popupAutoHideTimer=setTimeout(function(){var a;(a=
e.get("highlightedItem"))&&a.set("highlighted",!1)},1E3*this.get("parent").get("menuDelay")))}},isPopupMenu:1,handleBlur:function(){c.superclass.handleBlur.apply(this,arguments);this.hide()}},{ATTRS:{focusable:{value:!1},autoHideOnMouseLeave:{},xrender:{value:f}}},{xclass:"popupmenu",priority:20});return c},{requires:["component/extension","./base","./popupmenu-render"]});
KISSY.add("menu/submenu-render",function(h,b){return b.extend({createDom:function(){this.get("el").attr("aria-haspopup","true").append(h.substitute('<span class="{prefixCls}submenu-arrow">\u25ba</span>',{prefixCls:this.get("prefixCls")}))}},{ATTRS:{arrowEl:{},contentEl:{valueFn:function(){return h.all(h.substitute('<span class="{prefixCls}menuitem-content"></span>',{prefixCls:this.get("prefixCls")}))}}},HTML_PARSER:{contentEl:function(b){return b.children("."+this.get("prefixCls")+"menuitem-content")}}})},
{requires:["./menuitem-render"]});
KISSY.add("menu/submenu",function(h,b,e,f,c){function a(a){var b=a.target;b!==this&&b.isMenuItem&&a.newVal&&(d(this),this.get("highlighted")||(this.set("highlighted",!0),b.set("highlighted",!1),b.set("highlighted",!0)))}function d(a){var b;if(b=a.dismissTimer_)b.cancel(),a.dismissTimer_=null;if(b=a.showTimer_)b.cancel(),a.showTimer_=null}function g(a,b){var c=a.get("menu");if(c&&!c.isController)if(b)c=e.create(c,a),a.setInternal("menu",c);else return null;return c}function j(){var a,b,c=g(this,1);
c&&(a=this.get("el"),b=c.get("align"),delete b.node,b=h.clone(b),b.node=a,b.points=b.points||["tr","tl"],c.set("align",b),c.show(),a.attr("aria-haspopup",c.get("el").attr("id")))}function l(){var a=g(this);a&&a.hide()}var m=b.KeyCodes,k=f.extend([e.DecorateChild],{isSubMenu:1,clearSubMenuTimers:function(){d(this)},bindUI:function(){this.on("afterHighlightedChange",a,this)},handleMouseLeave:function(){this.set("highlighted",!1,{data:{fromMouse:1}});d(this);var a=g(this);a&&a.get("visible")&&(this.dismissTimer_=
h.later(l,1E3*this.get("menuDelay"),!1,this))},handleMouseEnter:function(){this.set("highlighted",!0,{data:{fromMouse:1}});d(this);var a=g(this);if(!a||!a.get("visible"))this.showTimer_=h.later(j,1E3*this.get("menuDelay"),!1,this)},_onSetHighlighted:function(a,b){b&&(k.superclass._onSetHighlighted.apply(this,arguments),b.fromMouse||(a&&!b.fromKeyboard?j.call(this):a||l.call(this)))},performActionInternal:function(){j.call(this);k.superclass.performActionInternal.apply(this,arguments)},handleKeydown:function(a){var c=
g(this),d,e=c&&c.get("visible"),f=a.keyCode;if(e){if(!c.handleKeydown(a))if(f==m.LEFT)this.set("highlighted",!1),this.set("highlighted",!0,{data:{fromKeyboard:1}});else return}else if(f==m.RIGHT){if(j.call(this),c=g(this))a=c.get("children"),(d=a[0])&&d.set("highlighted",!0,{data:{fromKeyboard:1}})}else{if(a.keyCode==b.KeyCodes.ENTER)return this.performActionInternal(a);return}return!0},containsElement:function(a){var b=g(this);return b&&b.containsElement(a)},decorateChildrenInternal:function(a,b){b.css("top",
"-9999").prependTo(b[0].ownerDocument.body);this.setInternal("menu",e.DecorateChild.prototype.decorateChildrenInternal.call(this,a,b,this.get("menu")))},destructor:function(){var a=g(this);d(this);a&&a.destroy&&a.destroy()}},{ATTRS:{menuDelay:{value:0.15},menu:{setter:function(a){a&&a.isController&&a.setInternal("parent",this)}},defaultChildCfg:{value:{xclass:"popupmenu"}},decorateChildCls:{value:"popupmenu"},xrender:{value:c}}},{xclass:"submenu",priority:20});return k},{requires:["event","component/base",
"./menuitem","./submenu-render"]});
