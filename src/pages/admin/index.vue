<template>
  <div id="admin">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'admin'
};
</script>

<style lang="less" scoped>
  #admin {
    width: 100%;
    height: 100%;
    background-color: #f1f6ff;
    .nav-container {
      width: 100%;
      height: 64px;
    }
  }
</style>
