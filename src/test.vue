<template>
  <div class="test-box">
  </div>
</template>

<script>
export default {

  name: 'test',

  data () {
    return {}
  },
  components: {
    /* code split 按需加载例子 */
    // 'calculate-by-field-bounds': () => import(
    //   /* webpackChunkName: "chooseFieldBounds" */
    //   'components/L1/calculateByFieldBounds'
    // ),
    // 'calculate-by-field-district': () => import(
    //   /* webpackChunkName: "calculateByDistrict" */
    //   'components/L1/calculateByDistrict'
    // )
  }
}
</script>

<style lang="css" scoped>
.test-box{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
}

</style>