!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SmoothDND=t():e.SmoothDND=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.containerInstance="smooth-dnd-container-instance",t.containersInDraggable="smooth-dnd-containers-in-draggable",t.defaultGroupName="@@smooth-dnd-default-group@@",t.wrapperClass="smooth-dnd-draggable-wrapper",t.defaultGrabHandleClass="smooth-dnd-default-grap-handle",t.animationClass="animated",t.translationValue="__smooth_dnd_draggable_translation_value",t.visibilityValue="__smooth_dnd_draggable_visibility_value",t.ghostClass="smooth-dnd-ghost",t.containerClass="smooth-dnd-container",t.extraSizeForInsertion="smooth-dnd-extra-size-for-insertion",t.stretcherElementClass="smooth-dnd-stretcher-element",t.stretcherElementInstance="smooth-dnd-stretcher-instance",t.isDraggableDetached="smoth-dnd-is-draggable-detached",t.disbaleTouchActions="smooth-dnd-disable-touch-action",t.noUserSelectClass="smooth-dnd-no-user-select"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getIntersection=function(e,t){return{left:Math.max(e.left,t.left),top:Math.max(e.top,t.top),right:Math.min(e.right,t.right),bottom:Math.min(e.bottom,t.bottom)}};var r=t.getIntersectionOnAxis=function(e,t,n){return"x"===n?{left:Math.max(e.left,t.left),top:e.top,right:Math.min(e.right,t.right),bottom:e.bottom}:{left:e.left,top:Math.max(e.top,t.top),right:e.right,bottom:Math.min(e.bottom,t.bottom)}},o=t.getContainerRect=function(e){var t=e.getBoundingClientRect(),n={left:t.left,right:t.right+10,top:t.top,bottom:t.bottom};if(l(e,"x")&&!a(e,"x")){var r=n.right-n.left;n.right=n.right+e.scrollWidth-r}if(l(e,"y")&&!a(e,"y")){var o=n.bottom-n.top;n.bottom=n.bottom+e.scrollHeight-o}return n},i=t.isScrolling=function(e,t){var n=window.getComputedStyle(e),r=n.overflow,o=n["overflow-"+t];return"auto"===r||"scroll"===r||("auto"===o||"scroll"===o)},a=t.isScrollingOrHidden=function(e,t){var n=window.getComputedStyle(e),r=n.overflow,o=n["overflow-"+t];return"auto"===r||"scroll"===r||"hidden"===r||("auto"===o||"scroll"===o||"hidden"===o)},l=t.hasBiggerChild=function(e,t){return"x"===t?e.scrollWidth>e.clientWidth:e.scrollHeight>e.clientHeight};t.hasScrollBar=function(e,t){return l(e,t)&&i(e,t)},t.getVisibleRect=function(e,t){var n=e,i=t||o(e);for(n=e.parentElement;n;)l(n,"x")&&a(n,"x")&&(i=r(i,n.getBoundingClientRect(),"x")),l(n,"y")&&a(n,"y")&&(i=r(i,n.getBoundingClientRect(),"y")),n=n.parentElement;return i},t.listenScrollParent=function(e,t){var n=[];return setTimeout(function(){for(var r=e;r;)(i(r,"x")||i(r,"y"))&&(r.addEventListener("scroll",t),n.push(r)),r=r.parentElement;window.addEventListener("scroll",t)},10),{dispose:function(){n.forEach(function(e){e.removeEventListener("scroll",t)}),window.removeEventListener("scroll",t)}}},t.hasParent=function(e,t){for(var n=e;n;){if(n===t)return!0;n=n.parentElement}return!1},t.getParent=function(e,t){for(var n=e;n;){if(n.matches(t))return n;n=n.parentElement}return null},t.hasClass=function(e,t){return e.className.split(" ").map(function(e){return e}).indexOf(t)>-1},t.addClass=function(e,t){var n=e.className.split(" ").filter(function(e){return e});-1===n.indexOf(t)&&(n.push(t),e.className=n.join(" "))},t.removeClass=function(e,t){var n=e.className.split(" ").filter(function(e){return e&&e!==t});e.className=n.join(" ")},t.debounce=function(e,t,n){var r=null;return function(){for(var o=arguments.length,i=Array(o),a=0;a<o;a++)i[a]=arguments[a];r&&clearTimeout(r),n&&!r?e.call.apply(e,[void 0].concat(i)):r=setTimeout(function(){r=null,e.call.apply(e,[void 0].concat(i))},t)}},t.removeChildAt=function(e,t){return e.removeChild(e.children[t])},t.addChildAt=function(e,t,n){n>=e.children.lenght?e.appendChild(t):e.insertBefore(t,e.children[n])},t.isMobile=function(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.domDropHandler=function(e){var t=e.element,n=e.draggables,i=(e.layout,e.options);return function(e,a){var l=e.removedIndex,u=e.addedIndex,s=e.droppedElement,c=null;if(null!==l&&(c=(0,r.removeChildAt)(t,l),n.splice(l,1)),null!==u){var d=document.createElement("div");d.className=o.wrapperClass+" "+i.orientation+" "+o.animationClass+" ",d.appendChild(c.firstChild||s),d[o.containersInDraggable]=[],(0,r.addChildAt)(t,d,u),u>=n.length?n.push(d):n.splice(u,0,d)}a&&a(e)}},t.reactDropHandler=function(){return{handler:function(e){e.element,e.draggables,e.layout,e.options;return function(e,t){t&&t(e)}}}};var r=n(1),o=n(0)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addStyleToHead=void 0;var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(r=(a=l.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&l.return&&l.return()}finally{if(o)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0));function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=(l(r={},"."+a.containerClass,{position:"relative"}),l(r,"."+a.containerClass+" *",{"box-sizing":"border-box"}),l(r,"."+a.containerClass+".horizontal",{"white-space":"nowrap"}),l(r,"."+a.containerClass+".horizontal ."+a.wrapperClass,{height:"100%",display:"inline-block"}),l(r,"."+a.wrapperClass,{overflow:"hidden"}),l(r,"."+a.wrapperClass+".animated",{transition:"transform ease"}),l(r,"."+a.ghostClass+" *",{"box-sizing":"border-box"}),l(r,"."+a.ghostClass+".animated",{transition:"all ease-in-out"}),l(r,"."+a.disbaleTouchActions+" *",{"touch-actions":"none","-ms-touch-actions":"none"}),r);t.addStyleToHead=function(){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),n=function e(t){return Object.entries(t).reduce(function(t,n){var r=i(n,2),a=r[0],l=r[1];return"object"===(void 0===l?"undefined":o(l))?""+t+a+"{"+e(l)+"}":""+t+a+":"+l+";"},"")}(u);t.type="text/css",t.styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n)),e.appendChild(t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(1)),o=a(n(0)),i=n(3);function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var l=["mousedown","touchstart"],u=["mousemove","touchmove"],s=["mouseup","touchend"],c=null,d=null,f=null,g=null,p=[],m=!1,v=r.isMobile();function h(){l.forEach(function(e){window.document.addEventListener(e,y,{passive:!1})})}var b=function(){var e=void 0,t=void 0,n=void 0,r=null,o=1,i=8;function a(n){var r=E(n),a=r.clientX,l=r.clientY;if(t)(Math.abs(e.clientX-a)>i||Math.abs(e.clientY-l)>i)&&d();else if(Math.abs(e.clientX-a)>o||Math.abs(e.clientY-l)>o)return f()}function l(){d()}function c(){d()}function d(){clearTimeout(r),u.forEach(function(e){return window.document.removeEventListener(e,a)},{passive:!1}),s.forEach(function(e){return window.document.removeEventListener(e,l)},{passive:!1}),document.removeEventListener("drag",c,{passive:!1})}function f(){clearTimeout(r),d(),n()}return function(o,i,d){e=E(o),n=d,(t=i||(v?200:0))&&(r=setTimeout(f,t)),u.forEach(function(e){return window.document.addEventListener(e,a)},{passive:!1}),s.forEach(function(e){return window.document.addEventListener(e,l)},{passive:!1}),document.addEventListener("drag",c,{passive:!1})}}();function y(e){var t=E(e);if(!m&&(d=r.getParent(t.target,"."+o.wrapperClass))){var n=r.getParent(d,"."+o.containerClass),i=p.filter(function(e){return e.element===n})[0],a=i.getOptions().dragHandleSelector,l=i.getOptions().nonDragAreaSelector,c=!0;a&&!r.getParent(t.target,a)&&(c=!1),l&&r.getParent(t.target,l)&&(c=!1),c&&(e.preventDefault(),b(t,i.getOptions().dragBeginDelay,function(){setTimeout(function(){window.getSelection().empty()},0),x(t),u.forEach(function(e){window.document.addEventListener(e,w,{passive:!1})}),s.forEach(function(e){window.document.addEventListener(e,C,{passive:!1})})}))}}function C(){u.forEach(function(e){window.document.removeEventListener(e,w,{passive:!1})}),s.forEach(function(e){window.document.removeEventListener(e,C,{passive:!1})}),g&&function(e){function t(){r.removeClass(f.ghost,"animated"),f.ghost.style.transitionDuration=null,document.body.removeChild(f.ghost),e()}function n(e,n){var o=e.top,i=e.left;r.addClass(f.ghost,"animated"),f.ghost.style.transitionDuration=n+"ms",f.ghost.style.left=i+"px",f.ghost.style.top=o+"px",setTimeout(function(){t()},n+10)}if(g.targetElement){var o=p.filter(function(e){return e.element===g.targetElement})[0];o.shouldAnimateDrop()?n(o.getDragResult().shadowBeginEnd.rect,Math.max(150,o.getOptions().animationDuration/2)):t()}else{var i=p.filter(function(e){return e===g.container})[0];if("move"===i.getOptions().behaviour){var a=i.getDragResult(),l=a.removedIndex,u=a.elementSize,s=i.layout;i.getTranslateCalculator({dragResult:{removedIndex:l,addedIndex:l,elementSize:u}});var c=l>0?s.getBeginEnd(i.draggables[l-1]).end:s.getBeginEndOfContainer().begin;n(s.getTopLeftOfElementBegin(c),i.getOptions().animationDuration)}else r.addClass(f.ghost,"animated"),f.ghost.style.transitionDuration=i.getOptions().animationDuration+"ms",f.ghost.style.opacity="0",f.ghost.style.transform="scale(0.90)",setTimeout(function(){t()},i.getOptions().animationDuration)}}(function(){document.body.style.touchAction=null,(c||[]).forEach(function(e){r.removeClass(e.element,o.noUserSelectClass),e.handleDrop(g)}),c=null,d=null,f=null,g=null,m=!1})}function E(e){return e.touches?e.touches[0]:e}function x(e){m=!0;var t=p.filter(function(e){return d.parentElement===e.element})[0];t.setDraggables(),g=function(e){var t=p.filter(function(t){return e.parentElement===t.element})[0],n=t.draggables.indexOf(e);return{container:t,element:e,elementIndex:n,payload:t.getChildPayload(n),targetElement:null,position:{x:0,y:0},groupName:t.groupName}}(d),f=function(e,t,n){var i=t.x,a=t.y,l=n.getScale(),u=l.scaleX,s=void 0===u?1:u,c=l.scaleY,d=void 0===c?1:c,f=e.getBoundingClientRect(),g=f.left,p=f.top,m=f.right,v=f.bottom,h=g+(m-g)/2,b=p+(v-p)/2,y=document.createElement("div");y.style.position="fixed",y.style.pointerEvents="none",y.style.left=g+"px",y.style.top=p+"px",y.style.width=m-g+"px",y.style.height=v-p+"px",y.style.overflow="hidden",y.className=o.ghostClass;var C=e.cloneNode(!0);return n.getOptions().dragClass&&r.addClass(C.childNodes[0],n.getOptions().dragClass),C.style.width=(m-g)/s+"px",C.style.height=(v-p)/d+"px",C.style.transform="scale3d("+(s||1)+", "+(d||1)+", 1)",C.style.transformOrigin="0 0 0",C.style.margin="0px",y.appendChild(C),{ghost:y,centerDelta:{x:h-i,y:b-a},positionDelta:{left:g-i,top:p-a},clientWidth:m-g,clientHeight:v-p}}(d,{x:e.clientX,y:e.clientY},g.container),g.position={x:e.clientX+f.centerDelta.x,y:e.clientY+f.centerDelta.y},document.body.appendChild(f.ghost),(c=p.filter(function(e){return e.isDragRelevant(t,g.payload)})).forEach(function(e){return r.addClass(e.element,o.noUserSelectClass)}),c.forEach(function(e){return e.prepareDrag(e,c)}),c.forEach(function(e){return e.handleDrag(g)})}function w(e){e.preventDefault();var t=E(e);g?(f.ghost.style.left=t.clientX+f.positionDelta.left+"px",f.ghost.style.top=t.clientY+f.positionDelta.top+"px",g.position.x=t.clientX+f.centerDelta.x,g.position.y=t.clientY+f.centerDelta.y,g.clientWidth=f.clientWidth,g.clientHeight=f.clientHeight,c.forEach(function(e){return e.handleDrag(g)})):x(t)}(0,i.addStyleToHead)(),t.default=(h(),{register:function(e){p.push(e)},unregister:function(e){p.splice(p.indexOf(e),1)}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){e[o.extraSizeForInsertion]=0;var l=n,u=function(e){return{get:function(t,n){var r=e[n];return t[r||n]},set:function(t,n,r){requestAnimationFrame(function(){t[e[n]]=e.setters[n]?e.setters[n](r):r})}}}("horizontal"===t?i:a),s={translation:0},c=null;window.addEventListener("resize",function(){p(e)}),setTimeout(function(){f()},10);var d=r.listenScrollParent(e,function(){p(e),c&&c()});function f(){p(e),function(e){var t=e.getBoundingClientRect();s.scaleX=(t.right-t.left)/e.offsetWidth,s.scaleY=(t.bottom-t.top)/e.offsetHeight}(e)}var g=void 0;function p(e){s.rect=r.getContainerRect(e),s.visibleRect=r.getVisibleRect(e,s.rect)}function m(e){return u.get(e,"size")*u.get(s,"scale")}function v(e){return u.get(e,"dragPosition")}function h(e){return e[o.translationValue]}function b(e,t){var n=s.visibleRect,r=n.left,o=n.top,i=n.right,a=n.bottom;return e>r&&e<i&&t>o&&t<a}return{getSize:m,getContainerRectangles:function(){return{rect:s.rect,visibleRect:s.visibleRect}},getBeginEndOfDOMRect:function(e){return{begin:u.get(e,"begin"),end:u.get(e,"end")}},getBeginEndOfContainer:function(){var e=u.get(s.rect,"begin")+s.translation,t=u.get(s.rect,"end")+s.translation;return{begin:e,end:t}},getBeginEndOfContainerVisibleRect:function(){var e=u.get(s.visibleRect,"begin")+s.translation,t=u.get(s.visibleRect,"end")+s.translation;return{begin:e,end:t}},getBeginEnd:function(t){var n=function(e){return(u.get(e,"distanceToParent")+(e[o.translationValue]||0))*u.get(s,"scale")}(t)+(u.get(s.rect,"begin")+s.translation)-u.get(e,"scrollValue");return{begin:n,end:n+m(t)*u.get(s,"scale")}},getAxisValue:v,setTranslation:function(e,t){h(e)!==t&&(t?u.set(e.style,"translate",t):e.style.removeProperty("transform"),e[o.translationValue]=t,e[o.containersInDraggable]&&setTimeout(function(){e[o.containersInDraggable].forEach(function(e){!function e(t){t.layout.invalidateRects();t.onTranslated();t.getChildContainers()&&t.getChildContainers().forEach(function(t){return e(t)})}(e)})},l+20))},getTranslation:h,setVisibility:function(e,t){void 0!==e[o.visibilityValue]&&e[o.visibilityValue]===t||(t?e.style.removeProperty("visibility"):e.style.visibility="hidden",e[o.visibilityValue]=t)},isVisible:function(e){return void 0===e[o.visibilityValue]||e[o.visibilityValue]},isInVisibleRect:b,dispose:function(){d&&d.dispose();g&&(g.parentNode.removeChild(g),g=null)},getContainerScale:function(){return{scaleX:s.scaleX,scaleY:s.scaleY}},setScrollListener:function(e){c=e},setSize:function(e,t){u.set(e,"setSize",t)},getTopLeftOfElementBegin:function(e){var n=0,r=0;"horizontal"===t?(r=e,n=s.rect.top):(r=s.rect.left,n=e);return{top:n,left:r}},getScrollSize:function(e){return u.get(e,"scrollSize")},getScrollValue:function(e){return u.get(e,"scrollValue")},setScrollValue:function(e,t){return u.set(e,"scrollValue",t)},invalidate:f,invalidateRects:function(){p(e)},getPosition:function(e){return b(e.x,e.y)?v(e):null}}};var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(1)),o=n(0);var i={size:"offsetWidth",distanceToParent:"offsetLeft",translate:"transform",begin:"left",end:"right",dragPosition:"x",scrollSize:"scrollWidth",offsetSize:"offsetWidth",scrollValue:"scrollLeft",scale:"scaleX",setSize:"width",setters:{translate:function(e){return"translate3d("+e+"px, 0, 0)"}}},a={size:"offsetHeight",distanceToParent:"offsetTop",translate:"transform",begin:"top",end:"bottom",dragPosition:"y",scrollSize:"scrollHeight",offsetSize:"offsetHeight",scrollValue:"scrollTop",scale:"scaleY",setSize:"height",setters:{translate:function(e){return"translate3d(0,"+e+"px, 0)"}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);function o(e,t){for(var n=e;n;){if((0,r.isScrolling)(n))return n;n=n.parentElement}}function i(e,t){var n=!1,r=null,o=null,i=null,a=null;return{animate:function(l,u){i=l,a=u,(n=!0)&&function n(){null===r&&(r=requestAnimationFrame(function(l){null===o&&(o=l);var u=l-o;o=l;var s=u/1e3*a;s="begin"===i?0-s:s;var c=t.getScrollValue(e)+s;t.setScrollValue(e,c),r=null,n()}))}()},stop:function(){n&&(cancelAnimationFrame(r),n=!1,o=null,r=null)}}}t.default=function(e){var t=e.element,n=e.layout,r=e.options,a=null,l=(r.orientation,o(t)),u=l?n.getBeginEndOfDOMRect(l.getBoundingClientRect()):null,s=i(t,n);return function(e){e.draggableInfo;var c,d,f,g,p=e.dragResult,m=e.reset;if(r.autoScrollEnabled&&l){if(m)return s.stop(),null;if(null!==p.pos){null===a&&(l=o(t),s.stop(),s=i(l,n));var v=(c=p.pos,p.elementSize,f=(d=u).begin,(g=d.end)-c<100?{direction:"end",speedFactor:(100-(g-c))/100}:c-f<100?{direction:"begin",speedFactor:(100-(c-f))/100}:void 0);v?s.animate(v.direction,1500*v.speedFactor):s.stop(),a=p.pos}else s.stop();a=p.pos}return null}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=function(e){return function(t){var n=null,u=null,s=function(e,t){var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=Object.assign({},c,e);t.groupName&&!e.acceptGroups&&(t.acceptGroups=[e.groupName]);return t}(t),o=g(e,n.orientation,n.animationDuration);(0,r.addClass)(e,a.containerClass+" "+n.orientation);var i=(0,l.default)(e,n.orientation,n.animationDuration);return{element:e,draggables:o,options:n,layout:i}}(e,t),f=_(s),p=function(e){var t=e.element,n=e.draggables,r=e.layout,i=e.options,l=function(e){var t=e.element,n=e.draggables,r=e.layout;e.options;return function(){n.forEach(function(e){d(e,!1),r.setTranslation(e,0),r.setVisibility(e,!0),e[a.containersInDraggable]=[]}),t[a.stretcherElementInstance]&&(t[a.stretcherElementInstance].parentNode.removeChild(t[a.stretcherElementInstance]),t[a.stretcherElementInstance]=null)}}({element:t,draggables:n,layout:r,options:i}),u=(i.dropHandler||o.domDropHandler)({element:t,draggables:n,layout:r,options:i});return function(e,t){var n=t.addedIndex,r=t.removedIndex;if(l(),e.targetElement){var o=null!==n?null!==r&&r<n?n-1:n:null,a={removedIndex:r,addedIndex:o,payload:e.payload,droppedElement:e.element.firstChild};u(a,i.onDrop),console.log(r,o,e.payload,e.element.firstChild)}}}(s),m=(0,i.default)(s),h=null,b=!1,y=[];function C(){null!==u&&(u.invalidateShadow=!0,n=f(u),u.invalidateShadow=!1)}function E(e){b=e,h&&(h.onChildPositionCaptured(e),u&&(n=f(u)))}function x(e,t,n){for(var r=g(t,n.orientation,n.animationDuration),o=0;o<r.length;o++)e[o]=r[o];for(var i=0;i<e.length-r.length;i++)e.pop()}return s.layout.setScrollListener(function(){C()}),{element:e,draggables:s.draggables,isDragRelevant:function(e){var t=e.element,n=e.options;return function(e,o){if(n.shouldAcceptDrop)return n.shouldAcceptDrop(e.getOptions(),o);var i=e.getOptions();if("copy"===n.behaviour)return!1;var l=(0,r.getParent)(t,"."+a.wrapperClass);return l!==e.element&&(e.element===t||(!(!i.groupName||i.groupName!==n.groupName)||n.acceptGroups.indexOf(i.groupName)>-1))}}(s),getScale:s.layout.getContainerScale,getChildPayload:s.options.getChildPayload,groupName:s.options.groupName,layout:s.layout,getChildContainers:function(){return y},onChildPositionCaptured:E,dispose:function(e){},prepareDrag:function(e,t){var n=e.element,r=s.draggables,o=e.getOptions();x(r,n,o),e.layout.invalidateRects(),v(e,t),r.forEach(function(e){return d(e,!0,o.animationDuration)})},isPosInChildContainer:function(){return b},handleDrag:function(e){u=e,n=f(e),m({draggableInfo:e,dragResult:n})},handleDrop:function(e){u=null,E(!1),f=_(s),p(e,n),m({reset:!0}),m=(0,i.default)(s),h=null,y=[]},getDragResult:function(){return n},getTranslateCalculator:function(){return O(s).apply(void 0,arguments)},setParentContainer:function(e){h=e},getParentContainer:function(){return h},onTranslated:function(){C()},getOptions:function(){return s.options},shouldAnimateDrop:function(){return!s.options.shouldAnimateDrop||s.options.shouldAnimateDrop({sourceContainerProps:u.container.getOptions(),payload:u.payload})},setDraggables:function(){x(s.draggables,e,s.options)}}}}(e),s=n(t);return e[a.containerInstance]=s,u.default.register(s),{setOptions:n,dispose:function(){u.default.unregister(s),s.layout.dispose(),s.dispose(s)}}};var r=n(1),o=n(2),i=s(n(6)),a=n(0),l=s(n(5)),u=s(n(4));function s(e){return e&&e.__esModule?e:{default:e}}var c={groupName:null,behaviour:"move",acceptGroups:[a.defaultGroupName],orientation:"vertical",getChildPayload:function(){},animationDuration:180,autoScrollEnabled:!0,shouldAcceptDrop:null,shouldAnimateDrop:null};function d(e,t,n){t?((0,r.addClass)(e,a.animationClass),e.style.transitionDuration=n+"ms"):((0,r.removeClass)(e,a.animationClass),e.style.transitionDuration=null)}function f(e){return e?e[a.containerInstance]:null}function g(e,t,n){return Array.prototype.map.call(e.children,function(e){var n=e;return(0,r.hasClass)(e,a.wrapperClass)||(n=function(e,t){var n=document.createElement("div");return n.className=a.wrapperClass+" "+t+" "+a.animationClass,e.parentElement.insertBefore(n,e),n.appendChild(e),n}(e,t)),n[a.containersInDraggable]=[],n[a.translationValue]=0,n})}function p(e){var t=e.layout;return function(e,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function e(n,r,o,i){var a=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(i<o)return o;if(o===i){var l=t.getBeginEnd(n[o]),u=l.begin,s=l.end;return r>u&&r<=s?a?r<(s+u)/2?o:o+1:o:null}var c=Math.floor((i+o)/2),d=t.getBeginEnd(n[c]),f=d.begin,g=d.end;return r<f?e(n,r,o,c-1,a):r>g?e(n,r,c+1,i,a):a?r<(g+f)/2?c:c+1:c}(e,n,0,e.length-1,r)}}function m(e,t){var n=e.element;while(n){var r=f(n.parentElement);if(r&&t.indexOf(r)>-1){return{container:r,draggable:n}}n=n.parentElement}return null}function v(e,t){var n=m(e,t);if(n){n.container.getChildContainers().push(e);e.setParentContainer(n.container);n.draggable[a.containersInDraggable].push(e)}}function h(e){e.draggables;var t=e.element,n=e.options,r=null;return function(e){var o=e.draggableInfo,i=(e.dragResult,r);return null==r&&o.container.element===t&&"move"===n.behaviour&&(i=r=o.elementIndex),{removedIndex:i}}}function b(e){var t=e.draggables,n=e.layout;return function(e){e.draggableInfo;var r=e.dragResult;null!==r.removedIndex&&n.setVisibility(t[r.removedIndex],!1)}}function y(e){var t=e.element,n=e.layout;return function(e){var r=e.draggableInfo;return{pos:f(t).isPosInChildContainer()?null:n.getPosition(r.position)}}}function C(e){var t=e.element,n=!1;return function(e){e.draggableInfo;var r=e.dragResult;f(t).getParentContainer()&&n!==(null!==r.pos)&&(n=null!==r.pos,f(t).getParentContainer().onChildPositionCaptured(n))}}function E(e){var t=e.layout,n=null;return function(e){var r=e.draggableInfo;return null===e.dragResult.pos?n=null:{elementSize:n=n||t.getSize(r.element)}}}function x(e){var t=e.element;return function(e){var n=e.draggableInfo,r=e.dragResult;!function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];t&&n?e.targetElement=t:e.targetElement===t&&(e.targetElement=null)}(n,t,!!r.pos)}}function w(e){var t=P(e);return function(e){var n=e.draggableInfo,r=e.dragResult;return n.invalidateShadow?t({draggableInfo:n,dragResult:r}):null}}function S(e){var t,n,r,o=(n=(t=e).draggables,r=p({layout:t.layout}),function(e){var t=e.dragResult,o=t.shadowBeginEnd,i=t.pos;if(!o){var a=r(n,i,!0);return null!==a?a:n.length}return o.begin+o.beginAdjustment<=i&&o.end>=i?null:i<o.begin+o.beginAdjustment?r(n,i):i>o.end?r(n,i)+1:n.length});return function(e){var t=e.dragResult,n=null;return null!==t.pos&&null===(n=o({dragResult:t}))&&(n=t.addedIndex),{addedIndex:n}}}function D(){var e=null;return function(t){var n=t.dragResult,r=n.addedIndex,o=n.shadowBeginEnd;r!==e&&null!==e&&o&&(o.beginAdjustment=0),e=r}}function I(e){var t=e.element,n=e.draggables,r=e.layout,o=e.options,i=null,l=!1;return function(e){var u=e.dragResult,s=u.addedIndex,c=u.removedIndex,d=u.elementSize;if(null===c)if(null!==s){if(!l){var f=r.getBeginEndOfContainer(),g=r.getScrollSize(t)>r.getSize(t)?f.begin+r.getScrollSize(t)-r.getScrollValue(t):f.end,p=r.getBeginEnd(n[n.length-1]).end-n[n.length-1][a.translationValue];if(p+d>g){(i=document.createElement("div")).className=a.stretcherElementClass+" "+o.orientation;var m=d+p-g;r.setSize(i.style,m+"px"),t.appendChild(i),t[a.stretcherElementInstance]=i}l=!0,setTimeout(function(){r.invalidateRects()},100)}}else{if(i){r.setTranslation(i,0);var v=i;i=null,t.removeChild(v),t[a.stretcherElementInstance]=null}l=!1,setTimeout(function(){r.invalidateRects()},100)}}}function O(e){e.element;var t=e.draggables,n=e.layout,r=null,o=null;return function(e){var i=e.dragResult,a=i.addedIndex,l=i.removedIndex,u=i.elementSize;if(a!==r||l!==o){for(var s=0;s<t.length;s++)if(s!==l){var c=t[s],d=0;null!==l&&l<s&&(d-=n.getSize(t[l])),null!==a&&a<=s&&(d+=u),n.setTranslation(c,d)}return r=a,o=l,{addedIndex:a,removedIndex:l}}}}function P(e){var t=e.draggables,n=e.layout,r=null;return function(e){var o=e.draggableInfo,i=e.dragResult,a=i.addedIndex,l=i.removedIndex,u=i.elementSize,s=i.pos,c=i.shadowBeginEnd;if(null!==s){if(null===a||!o.invalidateShadow&&a===r)return null;r&&(r=a);var d=a-1,f=0,g=null,p=null;if(d===l&&d--,d>-1){var m=n.getSize(t[d]);if(p=n.getBeginEnd(t[d]),u<m){var v=(m-u)/2;f=p.end-v}else f=p.end}else p={end:n.getBeginEndOfContainer().begin};var h=1e4,b=a;if(b===l&&b++,b<t.length){var y=n.getSize(t[b]);if(g=n.getBeginEnd(t[b]),u<y){var C=(y-u)/2;h=g.begin+C}else h=g.begin}else g={begin:n.getContainerRectangles().end};return{shadowBeginEnd:{begin:f,end:h,rect:p&&g?n.getTopLeftOfElementBegin(p.end,g.begin):null,beginAdjustment:c?c.beginAdjustment:0}}}return r=null,{shadowBeginEnd:null}}}function R(){var e=null;return function(t){var n=t.dragResult,r=n.pos,o=n.addedIndex,i=n.shadowBeginEnd;t.draggableInfo.invalidateShadow;if(null!==r){if(null!=o&&null===e){if(r<i.begin){var a=r-i.begin-5;i.beginAdjustment=a}e=o}}else e=null}}function _(e){return function(e){return function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=n.map(function(t){return t(e)}),i=null;return function(e){return i=o.reduce(function(t,n){return Object.assign(t,n({draggableInfo:e,dragResult:t}))},i||{addedIndex:null,removedIndex:null,elementSize:null,pos:null,shadowBeginEnd:null})}}}(e)(h,b,y,C,E,x,w,S,D,I,O,P,R)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.dropHandlers=t.constants=void 0;var r,o=n(7),i=(r=o)&&r.__esModule?r:{default:r},a=u(n(0)),l=u(n(2));function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}t.default=i.default,t.constants=a,t.dropHandlers=l}])});
//# sourceMappingURL=index.js.map