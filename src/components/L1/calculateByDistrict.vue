<template>
  <div class="calculate-by-district-wrap">
    <div class="header">按行政区域计算</div>
    <div class="body">
      <!-- 省 -->
      <div class="province col">
        <div class="label">省</div>
        <div class="content">
            <h-list @select="changePrivince" :list="district">
              <template slot="listItem" scope="props" >
                <div class="list-item">
                  {{props.item.label}}
                </div>
              </template>                
            </h-list>
        </div>
      </div>
      <!-- 省 end -->
      <!-- 市 -->
      <div class="city col">
        <div class="label">市</div>
        <div class="content">
            <h-list @select="changeCity" :list="cityList">
              <template slot="listItem" scope="props" >
                <div class="list-item">
                  {{props.item.label}}
                </div>
              </template>                
            </h-list>            
        </div>
      </div>
      <!-- 市 end -->
      <!-- 区 -->
      <div class="district col">
        <div class="label">区</div>
        <div class="content">
            <h-list @select="changeDistrict"   :list="districtList">
              <template slot="listItem" scope="props" >
                <div class="list-item">
                  {{props.item.label}}
                </div>
              </template>                
            </h-list>            
        </div>
      </div>
      <div class="info-show">
<!--         <p>所选行政区:</p>
        <p class="district-text">
          {{tips || '无'}}
        </p> -->
        <p>耕地面积：{{farmlanArea | formatArea}}</p>
      </div>
      <div class="tool-btn">
        <el-button type="primary" v-show='!requestState' @click="calculateArea">按行政区域计算耕地面积</el-button>
        <el-button type="primary" v-if='requestState' :loading="true">计算中</el-button>
      </div>
      <!-- 区 end -->
    </div>
  </div>
</template>
<script>
import * as api from 'service/api'
import hList from 'components/common/hList'
import district from 'util/district'

export default {

  name: 'calculateByDistrict',

  data () {
    return {
      requestState: false,
      district: district,
      privince: {},
      city: {},
      area: {},
      tips: '',
      farmlanArea: 0
    }
  },
  components: {
    hList
  },
  created () {
  },
  computed: {
    cityList () {
      if (this.privince.children && (this.privince.children.length > 0)) {
        return this.privince.children
      } else {
        return []
      }
    },
    districtList () {
      if (this.city.children && (this.city.children.length > 0)) {
        return this.city.children
      } else {
        return []
      }
    }
  },
  methods: {
    changePrivince ({item, index}) {
      if (item) {
        this.privince = item
      } else {
        this.privince = {}
      }
    },
    changeCity ({item, index}) {
      if (item) {
        this.city = item
      } else {
        this.city = {}
      }
    },
    changeDistrict ({item, index}) {
      if (item) {
        this.area = item
      } else {
        this.area = {}
      }
    },
    async calculateArea () {
      if (!this.privince.code) {
        this.$message({
          type: 'info',
          message: '请至少选择一个省份'
        })
        return
      }
      this.requestState = true

      let level = 2
      let gcode = '000000'
      let shapetype = 'admindivision'
      this.tips = ''

      if (this.privince.code) {
        gcode = this.privince.code
        level = 2
        this.tips += this.privince.label
      }

      if (this.city.code) {
        gcode = this.city.code
        level = 3
        this.tips += '  ' + this.city.label
      }

      if (this.area.code) {
        gcode = this.area.code
        level = 4
        this.tips += '  ' + this.area.label
      }
      let res = ''
      try {
        res = await api.calculateByDistrict({
          level,
          gcode,
          shapetype
        })
      } catch (e) {
        console.log(e)
        let errInfo = e.noPower
        this.$message({
          type: 'error',
          message: errInfo || '服务器繁忙，请稍后再试'
        })

        this.requestState = false
        return
      }

      if (res.code !== 2000) {
        this.$message({
          type: 'error',
          message: '服务器繁忙，请稍后再试'
        })
        return
      }
      this.farmlanArea = res.data.area
      this.requestState = false
    }
  },
  filters: {
    formatArea (val) {
      let temp = parseFloat(val)
      if (temp < 10000) {
        return temp.toFixed(2) + ' 平方米'
      } else {
        return (temp / 10000).toFixed(2) + ' 公顷'
      }
    }
  }
}
</script>

<style lang="less" scoped>

.calculate-by-district-wrap{
  background-color:white;
  border-radius:2px;
  overflow:hidden;
  width:410px;
  .header{
    color:white;
    text-align:center;
    background-color:#333333;
    padding:10px 0;
  }
  .body{
    padding:4px;
  }
  .content{
    margin-top:10px;
    padding:2px;
    font-size:12px;
    overflow:auto;
    height:180px;
    border:1px solid #ececec;
  }
  .label{
    text-align:center;
  }
  .col{
    margin:5px;
    width:120px;
    float:left;
    &.city{
      width:130px;
    }
  }
  p{
    font-size:14px;
    line-height:1.5;
  }
  .tool-btn{
    padding:10px 0 15px;
    clear:both;
    text-align:center;
    button{
      width:90%;
    }
  }

  .district-text{
    font-size:12px;
  }

  .info-show{
    clear:both;
    padding-top: 0px;
    padding-left:10px;
  }
}
</style>
