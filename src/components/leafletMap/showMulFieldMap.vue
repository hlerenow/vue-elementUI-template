<template>
	<div class="show-mul-field-map" >
		<l-map width="100%" height="100%" ref="map" v-if="visable" :options="mapOption"></l-map>
	</div>
</template>

<script>
import L from "leaflet"
import LMap from "components/leafletMap/LMap"
import LUtil from "libs/leafletUtils"



export default {

  name: 'showMulFieldMap',

  data () {
    return {
    	mapOption:{
          preferCanvas: true, //优先使用canvas 绘画 地图
          zoomControl: false, //缩放控件
          attributionControl: false, //右下角角标
          maxZoom: 24,
          dragging: true,
          zoom: 14,
          nativeZoom:18,
          scrollWheelZoom: true,
          doubleClickZoom:false  		
    	},
    	map:{

    	},
    	allFieldsLayer:[],
    	markerOpation:{
          "blue":{
            iconUrl: '/statics/location-blue.png',
            iconSize: [20, 20],
            iconAnchor: [10, 20],
            popupAnchor: [0, -20]
          }    		
    	}
    };
  },
  props:{
  	visable:{
  		default:false
  	},
  	fields:{
  		default:function(){
  			return [];
  		}
  	}
  },
  watch:{
  	/*充当初始化函数*/
  	visable(val){
  		if(val){
  			this.$nextTick(()=>{
	  			this.map=this.$refs.map.map;
	  			this.renderAllFields(this.fields);
  			});
  		}
  	},
  	/*土地筛选结果变化时重绘地图*/
  	fields(val){
  		if(this.visable){
	  		this.clear();
	  		this.renderAllFields(val);
  		}
  	}
  },
  components:{
  	LMap
  },
  methods:{
  	renderAllFields(fields){
  		let map=this.map;
  		let maxBounds=new L.latLngBounds();
  		for(let i in fields){
  			let tempBounds=LUtil.wgs2gcj(fields[i].bounds);

	  		maxBounds.extend(tempBounds);

  			let handleP=L.polygon(tempBounds,{
		        color: "white",
		        opacity: 0.5,
		        weight: 2,
		        fillColor: "green",
		        fillOpacity: 0.4  				
  			}).addTo(map)
  			.bindTooltip(fields[i].name)
  			.on("click",()=>{
  				console.log(fields[i]);
  				this.$bus.$emit("mul-field-map-click",fields[i]);
  			});


  			/*mark 图标*/
  			let icon= L.icon(this.markerOpation.blue);
  			let center=L.latLngBounds(tempBounds).getCenter();

	  		let marker=L.marker(center,{
	  			icon:icon
	  		}).addTo(map)
  			.on("click",()=>{
  				this.$bus.$emit("mul-field-map-click",fields[i]);
  			});	  	

  			// handleP.
  			this.allFieldsLayer.push({
  				polygon:handleP,
  				marker:marker
  			});
  		}
  		map.fitBounds(maxBounds);
  	},
  	clear(){
  		let allLayer=this.allFieldsLayer;
  		for(let i in allLayer){
  			if(allLayer[i].polygon){
  				allLayer[i].polygon.remove();
  			}
  			if(allLayer[i].marker){
  				allLayer[i].marker.remove();
  			}  			
  		}

  		this.allFieldsLayer=[];
  	}
  }
};
</script>

<style lang="less" scoped>
.show-mul-field-map{
	height:30.0rem;
	margin-bottom:0.5rem;
}
</style>