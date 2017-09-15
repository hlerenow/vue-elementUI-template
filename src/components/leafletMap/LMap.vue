<template>
	<div :id="mapId" class="l-map" :style="{width,height}">
		
	</div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import util from "libs/utils"
import LUtil from "libs/leafletUtils"

/*需要watch的属性*/
const watchProps={
    /*地图本身的设置*/
    options:{
      type:Object,
      default:function(){
        return {
          preferCanvas: true, //优先使用canvas 绘画 地图
          zoomControl: false, //缩放控件
          attributionControl: false, //右下角角标
          maxZoom: 24,
          dragging: false,
          zoom: 14,
          maxNativeZoom:18,
          scrollWheelZoom: false,
          doubleClickZoom:false
        }
      }
    },
    circles:{
      type:Array,
      default:function(){
        return []
      }
    },
    circleOptions:{
      type:Object,
      default:function(){
        return {};
      }
    },
    imgs:{
      type:Array,
      default:function(){
        return [];
      }
    },
    imgOptions:{
      type:Array,
      default:function(){
        return [];
      }
    },
    ploygons:{
      type:Array,
      default:function(){
        return [];
      }
    },
    ploygonsOptions:{
      type:Object,
      default:function(){
        return {};
      }
    }
  };

  var watch={};
  /*构造watch函数*/

  Object.keys(watchProps).map((item)=>{
    watch[item]=function(){
      this.updateMap();
    }
  });

export default {

  name: 'LMap',

  data () {
    return {
    	mapId:'Map_'+util.randomString(6),
    	map:{},
      imgLayers:[],
      circleLayers:[],
      ploygonLyaers:[]
    };
  },
  props:{
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "350px"
    },
    ...watchProps
  },
  watch:{
   ...watch
  },
  mounted(){
    	this.map=LUtil.createMap(this.mapId,this.options);
      this.updateMap();
  },
  beforeDestroy(){
    this.clearAllLayers();
    this.map.remove();
  },
  methods:{
    /*清除地图上在layers里面的*/    
    clearLayers(layers){
      layers.map((item)=>{
        if(item.remove){
          item.remove();
        }
      });
    },
    /*清除地图上添加的所有的添加的layer*/
    clearAllLayers(){
      this.clearLayers(this.imgLayers);
      this.clearLayers(this.ploygonLyaers);
      this.clearLayers(this.circleLayers);
    },
    paintCycles(){
      this.circles.map((circle)=>{
          var handle=LUtil.addCircle(this.map,circle,this.circleOptions);
          this.circleLayers.push(handle);
      });
    },
    paintImgs(){
      this.imgs.map((img)=>{
          var handle=LUtil.addImg(this.map,img.url,img.bounds,this.imgOptions);
          this.imgLayers.push(handle);

      });
    },
    paintPolygons(){
      this.ploygons.map((ploygon)=>{
        if(ploygon.length>3){        
          var handle=LUtil.addPolygon(this.map,ploygon,this.ploygonOptions);

          this.ploygonLyaers.push(handle);
        }
      });
    },
    updateMap(){
      this.clearAllLayers();
      this.paintPolygons();
      this.paintImgs();
      this.paintCycles();
    },

  }
};
</script>
