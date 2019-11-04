(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tovnode = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
exports.default = exports.htmlDomApi;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
exports.injectIP = function (text, node) {
    return vnode_1.default(undefined, undefined, undefined, "###.###.###.###", node);
};

},{"./vnode":5}],3:[function(require,module,exports){
'use strict';

const word = '[a-fA-F\\d:]';
const b = options => options && options.includeBoundaries ?
	`(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))` :
	'';

const v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';

const v6seg = '[a-fA-F\\d]{1,4}';
const v6 = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${v4}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${v4}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${v4}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${v4}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${v4}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`.replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

const ip = options => options && options.exact ?
	new RegExp(`(?:^${v4}$)|(?:^${v6}$)`) :
	new RegExp(`(?:${b(options)}${v4}${b(options)})|(?:${b(options)}${v6}${b(options)})`, 'g');

ip.v4 = options => options && options.exact ? new RegExp(`^${v4}$`) : new RegExp(`${b(options)}${v4}${b(options)}`, 'g');
ip.v6 = options => options && options.exact ? new RegExp(`^${v6}$`) : new RegExp(`${b(options)}${v6}${b(options)}`, 'g');

module.exports = ip;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var htmldomapi_1 = require("./htmldomapi");
var ipRegex = require("ip-regex");
var injectIP_1 = require("./injectIP");
// extend toVNode functon with extra parameter, if ip is true => scan for ip addresses 
function toVNode(node, domApi, ipFilter) {
    if (ipFilter === void 0) { ipFilter = false; }
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    var text;
    if (api.isElement(node)) {
        var id = node.id ? '#' + node.id : '';
        var cn = node.getAttribute('class');
        var c = cn ? '.' + cn.split(' ').join('.') : '';
        var sel = api.tagName(node).toLowerCase() + id + c;
        var attrs = {};
        var children = [];
        var name_1;
        var i = void 0, n = void 0;
        var elmAttrs = node.attributes;
        var elmChildren = node.childNodes;
        for (i = 0, n = elmAttrs.length; i < n; i++) {
            name_1 = elmAttrs[i].nodeName;
            if (name_1 !== 'id' && name_1 !== 'class') {
                attrs[name_1] = elmAttrs[i].nodeValue;
            }
        }
        for (i = 0, n = elmChildren.length; i < n; i++) {
            children.push(toVNode(elmChildren[i], domApi, ipFilter));
        }
        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);
    }
    else if (api.isText(node)) {
        text = api.getTextContent(node);
        //check if ip scan is needed 
        if (ipFilter && ipRegex().test(text)) {
            return injectIP_1.injectIP(text, node);
        }
        return vnode_1.default(undefined, undefined, undefined, text, node);
    }
    else if (api.isComment(node)) {
        text = api.getTextContent(node);
        return vnode_1.default('!', {}, [], text, node);
    }
    else {
        return vnode_1.default('', {}, [], undefined, node);
    }
}
exports.toVNode = toVNode;
exports.default = toVNode;

},{"./htmldomapi":1,"./injectIP":2,"./vnode":5,"ip-regex":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;

},{}]},{},[4])(4)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJodG1sZG9tYXBpLmpzIiwiaW5qZWN0SVAuanMiLCJub2RlX21vZHVsZXMvaXAtcmVnZXgvaW5kZXguanMiLCJ0b3Zub2RlLmpzIiwidm5vZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSh0ZXh0KSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudCh0ZXh0KSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KTtcclxufVxyXG5mdW5jdGlvbiBpbnNlcnRCZWZvcmUocGFyZW50Tm9kZSwgbmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xyXG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQobm9kZSwgY2hpbGQpIHtcclxuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xyXG59XHJcbmZ1bmN0aW9uIGFwcGVuZENoaWxkKG5vZGUsIGNoaWxkKSB7XHJcbiAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcclxufVxyXG5mdW5jdGlvbiBwYXJlbnROb2RlKG5vZGUpIHtcclxuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XHJcbn1cclxuZnVuY3Rpb24gbmV4dFNpYmxpbmcobm9kZSkge1xyXG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XHJcbn1cclxuZnVuY3Rpb24gdGFnTmFtZShlbG0pIHtcclxuICAgIHJldHVybiBlbG0udGFnTmFtZTtcclxufVxyXG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChub2RlLCB0ZXh0KSB7XHJcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcclxufVxyXG5mdW5jdGlvbiBnZXRUZXh0Q29udGVudChub2RlKSB7XHJcbiAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudDtcclxufVxyXG5mdW5jdGlvbiBpc0VsZW1lbnQobm9kZSkge1xyXG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XHJcbn1cclxuZnVuY3Rpb24gaXNUZXh0KG5vZGUpIHtcclxuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xyXG59XHJcbmZ1bmN0aW9uIGlzQ29tbWVudChub2RlKSB7XHJcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gODtcclxufVxyXG5leHBvcnRzLmh0bWxEb21BcGkgPSB7XHJcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxyXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXHJcbiAgICBjcmVhdGVUZXh0Tm9kZTogY3JlYXRlVGV4dE5vZGUsXHJcbiAgICBjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxyXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXHJcbiAgICByZW1vdmVDaGlsZDogcmVtb3ZlQ2hpbGQsXHJcbiAgICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXHJcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxyXG4gICAgbmV4dFNpYmxpbmc6IG5leHRTaWJsaW5nLFxyXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcclxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcclxuICAgIGdldFRleHRDb250ZW50OiBnZXRUZXh0Q29udGVudCxcclxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxyXG4gICAgaXNUZXh0OiBpc1RleHQsXHJcbiAgICBpc0NvbW1lbnQ6IGlzQ29tbWVudCxcclxufTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5odG1sRG9tQXBpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XHJcbmV4cG9ydHMuaW5qZWN0SVAgPSBmdW5jdGlvbiAodGV4dCwgbm9kZSkge1xyXG4gICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIiMjIy4jIyMuIyMjLiMjI1wiLCBub2RlKTtcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5qZWN0SVAuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB3b3JkID0gJ1thLWZBLUZcXFxcZDpdJztcbmNvbnN0IGIgPSBvcHRpb25zID0+IG9wdGlvbnMgJiYgb3B0aW9ucy5pbmNsdWRlQm91bmRhcmllcyA/XG5cdGAoPzooPzw9XFxcXHN8XikoPz0ke3dvcmR9KXwoPzw9JHt3b3JkfSkoPz1cXFxcc3wkKSlgIDpcblx0Jyc7XG5cbmNvbnN0IHY0ID0gJyg/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkoPzpcXFxcLig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkpezN9JztcblxuY29uc3QgdjZzZWcgPSAnW2EtZkEtRlxcXFxkXXsxLDR9JztcbmNvbnN0IHY2ID0gYFxuKFxuKD86JHt2NnNlZ306KXs3fSg/OiR7djZzZWd9fDopfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMToyOjM6NDo1OjY6Nzo6ICAxOjI6Mzo0OjU6Njo3Ojhcbig/OiR7djZzZWd9Oil7Nn0oPzoke3Y0fXw6JHt2NnNlZ318Oil8ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE6MjozOjQ6NTo2OjogICAgMToyOjM6NDo1OjY6OjggICAxOjI6Mzo0OjU6Njo6OCAgMToyOjM6NDo1OjY6OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7NX0oPzo6JHt2NH18KDoke3Y2c2VnfSl7MSwyfXw6KXwgICAgICAgICAgICAgICAgIC8vIDE6MjozOjQ6NTo6ICAgICAgMToyOjM6NDo1Ojo3OjggICAxOjI6Mzo0OjU6OjggICAgMToyOjM6NDo1Ojo3OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7NH0oPzooOiR7djZzZWd9KXswLDF9OiR7djR9fCg6JHt2NnNlZ30pezEsM318Oil8IC8vIDE6MjozOjQ6OiAgICAgICAgMToyOjM6NDo6Njo3OjggICAxOjI6Mzo0Ojo4ICAgICAgMToyOjM6NDo6Njo3OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7M30oPzooOiR7djZzZWd9KXswLDJ9OiR7djR9fCg6JHt2NnNlZ30pezEsNH18Oil8IC8vIDE6MjozOjogICAgICAgICAgMToyOjM6OjU6Njo3OjggICAxOjI6Mzo6OCAgICAgICAgMToyOjM6OjU6Njo3OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7Mn0oPzooOiR7djZzZWd9KXswLDN9OiR7djR9fCg6JHt2NnNlZ30pezEsNX18Oil8IC8vIDE6Mjo6ICAgICAgICAgICAgMToyOjo0OjU6Njo3OjggICAxOjI6OjggICAgICAgICAgMToyOjo0OjU6Njo3OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7MX0oPzooOiR7djZzZWd9KXswLDR9OiR7djR9fCg6JHt2NnNlZ30pezEsNn18Oil8IC8vIDE6OiAgICAgICAgICAgICAgMTo6Mzo0OjU6Njo3OjggICAxOjo4ICAgICAgICAgICAgMTo6Mzo0OjU6Njo3OjEuMi4zLjRcbig/OjooKD86OiR7djZzZWd9KXswLDV9OiR7djR9fCg/Ojoke3Y2c2VnfSl7MSw3fXw6KSkgICAgICAgICAgIC8vIDo6MjozOjQ6NTo2Ojc6OCAgOjoyOjM6NDo1OjY6Nzo4ICA6OjggICAgICAgICAgICAgOjoxLjIuMy40XG4pKCVbMC05YS16QS1aXXsxLH0pPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAlZXRoMCAgICAgICAgICAgICUxXG5gLnJlcGxhY2UoL1xccypcXC9cXC8uKiQvZ20sICcnKS5yZXBsYWNlKC9cXG4vZywgJycpLnRyaW0oKTtcblxuY29uc3QgaXAgPSBvcHRpb25zID0+IG9wdGlvbnMgJiYgb3B0aW9ucy5leGFjdCA/XG5cdG5ldyBSZWdFeHAoYCg/Ol4ke3Y0fSQpfCg/Ol4ke3Y2fSQpYCkgOlxuXHRuZXcgUmVnRXhwKGAoPzoke2Iob3B0aW9ucyl9JHt2NH0ke2Iob3B0aW9ucyl9KXwoPzoke2Iob3B0aW9ucyl9JHt2Nn0ke2Iob3B0aW9ucyl9KWAsICdnJyk7XG5cbmlwLnY0ID0gb3B0aW9ucyA9PiBvcHRpb25zICYmIG9wdGlvbnMuZXhhY3QgPyBuZXcgUmVnRXhwKGBeJHt2NH0kYCkgOiBuZXcgUmVnRXhwKGAke2Iob3B0aW9ucyl9JHt2NH0ke2Iob3B0aW9ucyl9YCwgJ2cnKTtcbmlwLnY2ID0gb3B0aW9ucyA9PiBvcHRpb25zICYmIG9wdGlvbnMuZXhhY3QgPyBuZXcgUmVnRXhwKGBeJHt2Nn0kYCkgOiBuZXcgUmVnRXhwKGAke2Iob3B0aW9ucyl9JHt2Nn0ke2Iob3B0aW9ucyl9YCwgJ2cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XHJcbnZhciBodG1sZG9tYXBpXzEgPSByZXF1aXJlKFwiLi9odG1sZG9tYXBpXCIpO1xyXG52YXIgaXBSZWdleCA9IHJlcXVpcmUoXCJpcC1yZWdleFwiKTtcclxudmFyIGluamVjdElQXzEgPSByZXF1aXJlKFwiLi9pbmplY3RJUFwiKTtcclxuLy8gZXh0ZW5kIHRvVk5vZGUgZnVuY3RvbiB3aXRoIGV4dHJhIHBhcmFtZXRlciwgaWYgaXAgaXMgdHJ1ZSA9PiBzY2FuIGZvciBpcCBhZGRyZXNzZXMgXHJcbmZ1bmN0aW9uIHRvVk5vZGUobm9kZSwgZG9tQXBpLCBpcEZpbHRlcikge1xyXG4gICAgaWYgKGlwRmlsdGVyID09PSB2b2lkIDApIHsgaXBGaWx0ZXIgPSBmYWxzZTsgfVxyXG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbGRvbWFwaV8xLmRlZmF1bHQ7XHJcbiAgICB2YXIgdGV4dDtcclxuICAgIGlmIChhcGkuaXNFbGVtZW50KG5vZGUpKSB7XHJcbiAgICAgICAgdmFyIGlkID0gbm9kZS5pZCA/ICcjJyArIG5vZGUuaWQgOiAnJztcclxuICAgICAgICB2YXIgY24gPSBub2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcclxuICAgICAgICB2YXIgYyA9IGNuID8gJy4nICsgY24uc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcclxuICAgICAgICB2YXIgc2VsID0gYXBpLnRhZ05hbWUobm9kZSkudG9Mb3dlckNhc2UoKSArIGlkICsgYztcclxuICAgICAgICB2YXIgYXR0cnMgPSB7fTtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB2YXIgbmFtZV8xO1xyXG4gICAgICAgIHZhciBpID0gdm9pZCAwLCBuID0gdm9pZCAwO1xyXG4gICAgICAgIHZhciBlbG1BdHRycyA9IG5vZGUuYXR0cmlidXRlcztcclxuICAgICAgICB2YXIgZWxtQ2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUF0dHJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBuYW1lXzEgPSBlbG1BdHRyc1tpXS5ub2RlTmFtZTtcclxuICAgICAgICAgICAgaWYgKG5hbWVfMSAhPT0gJ2lkJyAmJiBuYW1lXzEgIT09ICdjbGFzcycpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzW25hbWVfMV0gPSBlbG1BdHRyc1tpXS5ub2RlVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUNoaWxkcmVuLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHRvVk5vZGUoZWxtQ2hpbGRyZW5baV0sIGRvbUFwaSwgaXBGaWx0ZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdChzZWwsIHsgYXR0cnM6IGF0dHJzIH0sIGNoaWxkcmVuLCB1bmRlZmluZWQsIG5vZGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXBpLmlzVGV4dChub2RlKSkge1xyXG4gICAgICAgIHRleHQgPSBhcGkuZ2V0VGV4dENvbnRlbnQobm9kZSk7XHJcbiAgICAgICAgLy9jaGVjayBpZiBpcCBzY2FuIGlzIG5lZWRlZCBcclxuICAgICAgICBpZiAoaXBGaWx0ZXIgJiYgaXBSZWdleCgpLnRlc3QodGV4dCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGluamVjdElQXzEuaW5qZWN0SVAodGV4dCwgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGV4dCwgbm9kZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhcGkuaXNDb21tZW50KG5vZGUpKSB7XHJcbiAgICAgICAgdGV4dCA9IGFwaS5nZXRUZXh0Q29udGVudChub2RlKTtcclxuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KCchJywge30sIFtdLCB0ZXh0LCBub2RlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCBub2RlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnRvVk5vZGUgPSB0b1ZOb2RlO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB0b1ZOb2RlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10b3Zub2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIHZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIGVsbSkge1xyXG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xyXG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XHJcbn1cclxuZXhwb3J0cy52bm9kZSA9IHZub2RlO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB2bm9kZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dm5vZGUuanMubWFwIl19
