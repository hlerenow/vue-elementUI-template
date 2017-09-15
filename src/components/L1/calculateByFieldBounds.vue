<template>
  <div class="calculate-by-field-bound">
    <div class="title">按划定地块计算</div>
    <div class="box-body">
      <p>
        您已划定的土地总面积：<br>
        <span class="field-area">{{area}}</span>公顷
      </p>
      <p v-show="framLandArea">
        区域耕地面积：<br>
        <span class="field-area">{{framLandArea}}</span>公顷
      </p>    
      <el-button v-show="!framLandArea" type="primary" @click="getFramlangArea">计算耕地面积</el-button>
      <p></p>
      <el-button type="danger" @click="reChooose">重新划定土地</el-button>
    </div>
  </div>
</template>

<script>
import * as util from 'util/utils'
import * as api from 'service/api'

export default {

  name: 'calculateByFieldBounds',

  data () {
    return {
      framLandArea: false,
      resetBtnVisable: false
    }
  },
  props: {
    editorMap: {
      default: false
    },
    bounds: {
      default: function () {
        return []
      }
    }
  },
  computed: {
    area () {
      if (this.bounds.length > 0) {
        let tempBounds = [].concat(this.bounds)
        tempBounds = tempBounds.concat([tempBounds[0]])
        this.resetBtnVisable = true
        return (parseFloat(util.calculateArea(tempBounds)) / 10000).toFixed(2)
      } else {
        return 0
      }
    }
  },
  methods: {
    /* 重选土地 */
    reChooose () {
      if (this.editorMap.clear) {
        this.editorMap.clear()
      }
      this.resetBtnVisable = false
      this.framLandArea = false
    },
    /* 从后台获取耕地面积 */
    async getFramlangArea () {
      if (this.bounds.length < 3) {
        this.$message({
          type: 'info',
          message: '请先划定土地'
        })
        return
      }
      /* ajax 请求 */
      var bounds = this.bounds
      try {
        var res = await api.calculateByBounds({
          shapetype: 'polygon',
          points: bounds
        })
      } catch (e) {
        console.log(e)
        let errInfo = e.noPower
        this.$message({
          type: 'error',
          message: errInfo || '服务器繁忙，请稍后再试'
        })
        return
      }

      /*  判断服务器 是否 处理成功  */
      if (res.code !== 2000) {
        this.$message({
          type: 'error',
          message: '服务器繁忙，请稍后再试'
        })
        return
      }
      let webArea = util.calculateArea(this.bounds)

      /* 闭合第一个点 */
      let tempBounds = [].concat(this.bounds)
      tempBounds = tempBounds.concat([tempBounds[0]])

      let temp = util.calculateArea(tempBounds) / 100

      let tempArea = Math.abs(webArea - parseFloat(res.data.area))
      if (tempArea < temp) {
        this.framLandArea = this.area
      } else {
        this.framLandArea = (parseFloat(res.data.area) / 10000).toFixed(2)
      }

      this.resetBtnVisable = true
    }
  }
}
</script>

<style lang="less" scoped>
.calculate-by-field-bound{
  background-color:white;
  border-radius:2px;
  overflow:hidden;
  width:250px;
  .title{
    color:white;
    text-align:center;
    background-color:#333333;
    padding:10px 0;
  }
  p{
    font-size:14px;
    line-height:1.5;
  }
  button{
    display:block;
    margin:0 auto;
    width:90%;
  }
  .box-body{
    padding: 10px 20px;
    .field-area{
      display:inline-block;
      padding-left: 20px;
      padding-top:5px;
    }
  }
}
</style>