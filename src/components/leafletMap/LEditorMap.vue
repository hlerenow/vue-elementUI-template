<template>
	<div :id="mapId" class="l-map" :style="{width,height}">
	</div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import * as util from 'util/utils'
import LUtil from 'util/leafletUtils'

/* 需要watch的属性 */
const watchProps = {
  /* 地图本身的设置 */
  options: {
    type: Object,
    default: function () {
      return {
        preferCanvas: true, // 优先使用canvas 绘画 地图
        zoomControl: false, // 缩放控件
        attributionControl: false, // 右下角角标
        maxZoom: 24,
        dragging: true,
        zoom: 14,
        nativeZoom: 18,
        scrollWheelZoom: true
      }
    }
  },
  circles: {
    type: Array,
    default: function () {
      return []
    }
  },
  circleOptions: {
    type: Object,
    default: function () {
      return {}
    }
  },
  imgs: {
    type: Array,
    default: function () {
      return []
    }
  },
  imgOptions: {
    type: Array,
    default: function () {
      return []
    }
  },
  ploygons: {
    type: Array,
    default: function () {
      return []
    }
  },
  ploygonsWithLabel: {
    type: Array,
    default: function () {
      return []
    }
  },
  ploygonsOptions: {
    type: Object,
    default: function () {
      return {}
    }
  },
  ploygonsWithLabelOption: {
    type: Object,
    default: function () {
      return {}
    }
  }
}

var watch = {}
/* 构造watch函数 */

Object.keys(watchProps).map((item) => {
  watch[item] = function () {
    this.updateMap()
  }
})

export default {

  name: 'LEditorMap',

  data () {
    return {
      mapId: 'Map_' + util.randomString(6),
      map: {},
      eventLister: {},
      imgLayers: [],
      circleLayers: [],
      ploygonLyaers: [],
      editePloygon: {
        editor: false,
        lastPoint: '',
        allPoints: [],
        polygonHandle: {},
        moveLineHandles: [],
        allDashLineHandles: [],
        allLineHandles: [],
        allPointsHandles: [],
        selectFinish: false
      }
    }
  },
  props: {
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '500px'
    },
    ...watchProps,
    editeZoom: {
      default: 13
    }
  },
  watch: {
    ...watch
  },
  mounted () {
    this.map = LUtil.createMap(this.mapId, {...this.options
      // editable: true
    })
    this.updateMap()
    this.registerEvent()
    this.$emit('mapInitEnd')
  },
  beforeDestroy () {
    this.clearAllLayers()
    this.map.remove()
  },
  methods: {
    /* 清除地图上在layers里面的 */
    clearLayers (layers) {
      layers.map((item) => {
        item.remove()
      })
    },
    /* 清除地图上添加的所有的添加的layer */
    clearAllLayers () {
      this.clearLayers(this.imgLayers)
      this.clearLayers(this.ploygonLyaers)
      this.clearLayers(this.circleLayers)
    },
    paintCycles () {
      this.circles.map((circle) => {
        if (circle.length === 2 || (circle.lat && circle.lng)) {
          LUtil.addCircle(this.map, circle, this.circleOptions)
        }
      })
    },
    paintImgs () {
      this.imgs.map((img) => {
        LUtil.addImg(this.map, img, this.imgOptions)
      })
    },
    paintPolygons () {
      this.ploygons.map((ploygon) => {
        LUtil.addPolygon(this.map, ploygon, this.ploygonOptions)
      })
    },
    paintPolygonsWithLabel () {
      this.ploygonsWithLabel.map((ploygon) => {
        LUtil.addPolygonWithLabel(this.map, ploygon, this.ploygonsWithLabelOption)
      })
    },
    updateMap () {
      this.clearAllLayers()
      this.paintPolygons()
      this.paintImgs()
      this.paintCycles()
      this.paintPolygonsWithLabel()
    },
    clearLines (lines) {
      lines.map((item) => {
        if (item.remove) {
          item.remove()
        }
      })
    },
    clear () {
      this.clearLayers(this.editePloygon.allLineHandles)
      this.clearLayers(this.editePloygon.allPointsHandles)
      this.clearLines(this.editePloygon.allDashLineHandles)

      this.editePloygon.editor = false
      this.editePloygon.selectFinish = true

      if (this.editePloygon.polygonHandle && this.editePloygon.polygonHandle.remove) {
        this.editePloygon.polygonHandle.remove()
      }
      this.editePloygon = {
        editor: false,
        lastPoint: '',
        allPoints: [],
        polygonHandle: null,
        moveLineHandles: [],
        allDashLineHandles: [],
        allLineHandles: [],
        allPointsHandles: [],
        selectFinish: false
      }

      this.$emit('ploygon-update', this.editePloygon.allPoints)
    },
    registerAddFields () {
      let event1 = (e) => {
        /* 判断所放级别 */
        if (this.map.getZoom() < this.editeZoom) {
          // console.log("缩放级别不够",this.map.getZoom())
          this.$emit('zoomNotEnough', this.map.getZoom())
          return 0
        } else {
          this.$emit('zoomEnough', this.map.getZoom())
        }
        /* 是否选择结束 */
        if (this.editePloygon.selectFinish) {
          return
        }
        /* 清除虚线 */
        this.clearLines(this.editePloygon.allDashLineHandles)

        /* 判断当前状态是否是编辑状态 */
        if (!this.editePloygon.editor) {
          this.editePloygon.editor = true
        }

        /* 判断是否是最后一个点 */
        if (this.editePloygon.allPoints.length > 0) {
          var firstPoint = this.editePloygon.allPoints[0]

          /* 闭合区域 并且 以选择的 点 大于 2 个  */
          /* 更具缩放级别计算土地选择结束时的吸附距离 */
          var closeDistance = 0.5 * Math.pow(2, (24 - this.map.getZoom()))
          closeDistance = closeDistance > 5 ? closeDistance : 1
          // console.log("地图选择全选结束时的距离",closeDistance)

          if (this.editePloygon.allPoints.length > 2 && this.map.distance(firstPoint, e.latlng) < closeDistance) {
            this.editePloygon.editor = false
            this.editePloygon.selectFinish = true

            this.editePloygon.polygonHandle = LUtil.L.polygon(this.editePloygon.allPoints, {
              color: '#fff',
              fillOpacity: 0.5,
              fillColor: 'black'
            }).addTo(this.map)

            // this.editePloygon.polygonHandle.enableEdit()
            /* 清除之前的圆圈 和 线条 */
            this.clearLayers(this.editePloygon.allLineHandles)
            this.clearLayers(this.editePloygon.allPointsHandles)

             /* 发布选择区域更新事件 */
            this.updatePloygonEvent()
            return
          }
        }
        /* 不是最后一个点 */

        /* 画一个圆圈点 */
        var circleMarker = LUtil.L.circleMarker(e.latlng, {
          fill: true,
          fillColor: '#fff',
          fillOpacity: 1,
          radius: 8
        }).addTo(this.map)

        this.editePloygon.allPointsHandles.push(circleMarker)

        /* 画一条实线  */
        if (this.editePloygon.allPoints.length > 0) {
          var line = LUtil.L.polyline([this.editePloygon.allPoints[this.editePloygon.allPoints.length - 1], e.latlng], {
            opacity: 0.6,
            weight: 2,
            color: '#fff',
            lineCap: 'square'
          }).addTo(this.map)

          this.editePloygon.allLineHandles.push(line)
        }

        this.editePloygon.allPoints.push([e.latlng.lat, e.latlng.lng])
      }

      let event2 = (e) => {
        if (!this.editePloygon.editor) {
          return
        }

        this.clearLines(this.editePloygon.allDashLineHandles)

        var lastLine = LUtil.L.polyline([this.editePloygon.allPoints[this.editePloygon.allPoints.length - 1], e.latlng], {
          dashArray: '8, 10',
          opacity: 0.8,
          weight: 3,
          color: '#fff',
          lineCap: 'square'
        }).addTo(this.map)

        this.editePloygon.allDashLineHandles.push(lastLine)
      }

      let event3 = (e) => {
        this.updatePloygonEvent()
      }

      this.eventLister = {
        'click': event1,
        'mousemove': event2,
        'editable:vertex:dragend': event3,
        'editable:vertex:mousedown': event3,
        'editable:vertex:new': event3,
        'editable:vertex:click': event3,
        'editable:vertex:deleted': event3
      }

      this.map.on(this.eventLister)
      // this.map.on('click',event1 )

      // 鼠标移动时
      // this.map.on('mousemove', event2)

      // 修改区域时
      // this.map.on('editable:vertex:dragend', (e) => {
      //   this.updatePloygonEvent()
      // })

      // this.map.on('editable:vertex:mousedown', (e) => {
      //   this.updatePloygonEvent()
      // })

      // this.map.on('editable:vertex:new', (e) => {
      //   this.updatePloygonEvent()
      // })

      // this.map.on('editable:vertex:click', (e) => {
      //   this.updatePloygonEvent()
      // })

      // this.map.on('editable:vertex:deleted', (e) => {
      //   this.updatePloygonEvent()
      // })
    },
    /* 注册圈地功能 */
    registerEvent () {
      this.map.on('zoom', (zoom) => {
        this.$emit('zoomend', zoom.target._zoom)
        if (this.map.getZoom() >= this.editeZoom) {
          this.$emit('zoomEnough', this.map.getZoom())
        }
      })
    },
    updatePloygonEvent () {
      this.editePloygon.allPoints = LUtil.latlngsToArry(this.editePloygon.polygonHandle.getLatLngs()[0])
      this.$emit('ploygon-update', this.editePloygon.allPoints)
    },
    /* 移除圈地功能 */
    removeEvent () {
      this.clear()
      this.map.off(this.eventLister)
      this.eventLister = {}
    }
  }
}
</script>

<style type="text/css">
  .leaflet-middle-icon{
    opacity: 0.8;
    width: 8px;
    height: 8px;
  }

  .leaflet-vertex-icon,.leaflet-middle-icon{
    border-radius: 20px;
    border: 3px solid #20a0ff;
    background-color: white;
    width: 15px;
    height: 15px;
  }
  
</style>