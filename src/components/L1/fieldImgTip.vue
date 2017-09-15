<template>
  <div class="field-tip-wrap">
    <p class="tips-text">点击地图，选择农田区域</p>
    <img src="../../assets/field_tips.gif" alt="">
  </div>
</template>

<script>
export default {

  name: 'fieldImgTip',

  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .field-tip-wrap{
    padding:10px;
    border-radius:2px;
    width:220px;
    height: 196px;
    background-color:white;
    overflow:hidden;

    img{
      width:100%;
      max-width: 100%;
      height:auto;
    }
    .tips-text{
      color:#495060;
      font-size:14px;
      text-align: center;
    }
  }
</style>