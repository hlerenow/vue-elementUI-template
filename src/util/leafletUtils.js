import L from 'leaflet'

var eviltransform = require('eviltransform')

require('leaflet-editable')

// 只有卫星图没有坐标
/*  地图贴图配置  */

const mapconf = 'http://www.google.cn/maps/vt?lyrs=s,h&x={x}&y={y}&z={z}'

const mapUtil = {}

mapUtil.createMap = function (mapId, option) {
  const defaultOption = {
    preferCanvas: false, // 优先使用canvas 绘画 地图
    zoomControl: false, // 缩放控件
    attributionControl: false, // 右下角角标
    maxZoom: 24,
    dragging: true,
    zoom: 16,
    center: [0, 0],
    maxBounds: [ // 地图范围
      [-90, -180],
      [90, 180]
    ]
  }

  var _opt = Object.assign(defaultOption, option)
  const map = L.map(mapId, Object.assign(defaultOption, _opt))
  L.tileLayer(mapconf, {
    maxZoom: 24,
    maxNativeZoom: 20
  }).addTo(map)

  return map
}

/*  给地图添加高德注释层  */
mapUtil.addAnotion = function (map) {
  L.tileLayer(mapconf.annotion, {
    maxZoom: 24,
    minZomm: 4,
    maxNativeZoom: 20,
    subdomains: ['1', '2', '3', '4']
  }).addTo(map)
}

// 在地图上 画一个圆形,并返回实例
mapUtil.addCircle = function (map, pos, options) {
  var _opt = Object.assign({
    radius: 10,
    color: '#3fd9af',
    fillColor: 'green',
    fillOpacity: 1,
    borderWidth: 1
  }, options)

  /* 偏移修正 */
  pos = this.fixOffset([pos])[0]

  var handle = L.circleMarker(pos, _opt)
  handle.addTo(map)
  map.panTo(pos)
  return handle
}

// 在图上添加一张图
mapUtil.addImg = function (map, url, bound, options) {
  var imageUrl = url

  if (url === '') {
    return {}
  }
  var latlngs = bound

  var _opt = Object.assign(options, {
    color: 'white',
    weight: 1
  })

  /* 偏移修正 */
  latlngs = this.fixOffset(latlngs)

  var polygon = L.polygon(latlngs, _opt)

  var handle = L.imageOverlay(imageUrl, polygon.getBounds()).addTo(map)

  map.fitBounds(handle.getBounds())

  return handle
}

/* 画一个多边形 */
mapUtil.addPolygon = function (map, latlngs, options) {
  latlngs = latlngs || []

  var _opt = Object.assign({
    color: 'gray',
    opacity: 0.5,
    weight: 2,
    fillColor: 'white',
    fillOpacity: 0.4
  },
  options)

  /* 偏移修正 */
  latlngs = this.fixOffset(latlngs)

  var handle = L.polygon(latlngs, _opt)

  handle.addTo(map)

  map.fitBounds(handle.getBounds())

  return handle
}

/* 画一个多边形,并拥有label */
mapUtil.addPolygonWithLabel = function (map, ploygons, options) {
  var latlngs = ploygons.bounds
  var _opt = Object.assign({
    color: 'gray',
    opacity: 0.5,
    weight: 2,
    fillColor: 'white',
    fillOpacity: 0.4
  },
   options)

  /* 偏移修正 */
  latlngs = this.fixOffset(latlngs)

  var handle = L.polygon(latlngs, _opt)

  handle.addTo(map).bindTooltip('土地 - ' + ploygons.label, {
    permanent: true
      // sticky: true
  }).openTooltip()

  // map.fitBounds(handle.getBounds())

  return handle
}

mapUtil.L = L

mapUtil.fixOffset = function (latlngsArry) {
  var res = []
  for (var i = 0; i < latlngsArry.length; i++) {
    var item = latlngsArry[i]
    res.push(eviltransform.wgs2gcj(parseFloat(item[0]), parseFloat(item[1])))
  }
  return res
}

/* 计算土地面积使用经纬度坐标
参考地址：https://github.com/Leaflet/Leaflet.draw/blob/master/src/ext/GeometryUtil.js
 */
/* [[30.65651,104.064249],[30.658273,104.064205],[30.658361,104.067448],[30.656573,104.067492],[30.65651,104.064249]] */
mapUtil.calculateArea = function (latLngs) {
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

/* 将geonJson 转化为 纬度在前的数组   */
mapUtil.latlngsToArry = function (latlngs) {
  var res = []
  for (var i = 0; i < latlngs.length; i++) {
    res.push([latlngs[i].lat, latlngs[i].lng])
  }
  return res
}

/* *
 * [wgs2gcj description]
 * @param  {[Arry]} latlngsArry [[1,3],[1,2]]
 * @return {[Arry]}             [[1,2],[3,4]]
  */
mapUtil.wgs2gcj = function (latlngsArry) {
  var res = []
  for (var i = 0; i < latlngsArry.length; i++) {
    var item = latlngsArry[i]
    res.push(eviltransform.wgs2gcj(parseFloat(item[0]), parseFloat(item[1])))
  }
  return res
}

mapUtil.gcj2wgs = function (latlngsArry) {
  var res = []
  for (var i = 0; i < latlngsArry.length; i++) {
    var item = latlngsArry[i]
    res.push(eviltransform.gcj2wgs(parseFloat(item[0]), parseFloat(item[1])))
  }
  return res
}

export default mapUtil
