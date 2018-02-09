<template>
  <div class="test-box">
    <!-- <calculate-by-field-bounds></calculate-by-field-bounds> -->
    <!-- <calculate-by-field-district></calculate-by-field-district> -->
  </div>
</template>

<script>
export default {

  name: 'test',

  data () {
    return {

    };
  },
  components: {
    // 'calculate-by-field-bounds': () => import(
    //   /* webpackChunkName: "chooseFieldBounds" */
    //   'components/L1/calculateByFieldBounds'
    // ),
    // 'calculate-by-field-district': () => import(
    //   /* webpackChunkName: "calculateByDistrict" */
    //   'components/L1/calculateByDistrict'
    // )
  }
};
</script>

<style lang="css" scoped>
.test-box{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
