
/* 生成一个长度可控的随机字符串 0-9 a-z */
var UNIQUE_NUM = 0;
export const randomString = function (count) {
  var c = 1;
  var str = '' + UNIQUE_NUM;
  // 确保该函数生成的字符串唯一
  UNIQUE_NUM += 1;
  while (str.length < count) {
    str += ((Date.now() * c)).toString(36);
    c += 1;
  }
  return str.substring(0, count);
};

/* 判读对象是否为空 */
export const isEmptyObj = function (obj) {
  for (var i in obj) {
    return false;
  }
  return true;
};

/* 获取元素当前样式 */
export const getComutedStyle = function (el) {
  var style = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle;
  return style;
};

/* 计算面积 ，传入一个latlng数组 [[lat,lng],...] */
export const calculateArea = function (latLngs) {
  var pointsCount = latLngs.length;
  var area = 0.0;
  var d2r = Math.PI / 180;
  var p1;
  var p2;

  if (pointsCount > 2) {
    for (var i = 0; i < pointsCount; i++) {
      p1 = latLngs[i];
      p2 = latLngs[(i + 1) % pointsCount];
      area += ((p2[1] - p1[1]) * d2r) * (2 + Math.sin(p1[0] * d2r) + Math.sin(p2[0] * d2r));
    }
    area = area * 6378137.0 * 6378137.0 / 2.0;
  }

  return Math.abs(area);
};

/* 获取屏幕高度和宽度 */
export const getWindowSize = function () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
};

/* 绑定dom事件函数 */
export const addEvent = function (el, type, handler) {
  if (el.attachEvent) el.attachEvent('on' + type, handler); else el.addEventListener(type, handler);
};
  // matches polyfill
this.Element && (function (ElementPrototype) {
  ElementPrototype.matches = ElementPrototype.matches ||
  ElementPrototype.matchesSelector ||
  ElementPrototype.webkitMatchesSelector ||
  ElementPrototype.msMatchesSelector ||
  function (selector) {
    var node = this;
    var nodes = (node.parentNode || node.document).querySelectorAll(selector);
    var i = -1;
    while (nodes[++i] && nodes[i] !== node);
    return !!nodes[i];
  };
}(Element.prototype));

/* 事件代理函数 */
// live binding helper using matchesSelector
export const live = function (selector, event, callback, context) {
  addEvent(context || document, event, function (e) {
    var found;
    var el = e.target || e.srcElement;
    while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
    if (found) callback.call(el, e);
  });
};

/* zoom 对应缩放级别 */
export const zoomToScale = function (zoom) {
  const coverstion = {
    '0': 200000,
    '1': 200000,
    '2': 200000,
    '3': 200000,
    '4': 200000,
    '5': 200000,
    '6': 200000,
    '7': 100000,
    '8': 50000,
    '9': 20000,
    '10': 10000,
    '11': 5000,
    '12': 2000,
    '13': 1000,
    '14': 500,
    '15': 200,
    '16': 200,
    '17': 100,
    '18': 50,
    '19': 20,
    '20': 10,
    '21': 5,
    '22': 2,
    '23': 1
  };
  return coverstion[zoom] || 1;
};
