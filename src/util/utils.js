
/* 生成一个长度可控的随机字符串 */
export const randomString = function (count) {
  return Math.random().toString(32).substring(3, count + 3)
}

/* 判读对象是否为空 */
export const isEmptyObj = function (obj) {
  for (var i in obj) {
    return false
  }
  return true
}

export const getComutedStyle = function (el) {
  var style = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle
  return style
}

/* 计算面积 ，传入一个latlng数组 [[lat,lng],...] */
export const calculateArea = function (latLngs) {
  var pointsCount = latLngs.length
  var area = 0.0
  var d2r = Math.PI / 180
  var p1
  var p2

  if (pointsCount > 2) {
    for (var i = 0; i < pointsCount; i++) {
      p1 = latLngs[i]
      p2 = latLngs[(i + 1) % pointsCount]
      area += ((p2[1] - p1[1]) * d2r) *
        (2 + Math.sin(p1[0] * d2r) + Math.sin(p2[0] * d2r))
    }
    area = area * 6378137.0 * 6378137.0 / 2.0
  }

  return Math.abs(area)
}
