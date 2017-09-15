<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body,div,ul{
  margin: 0;
  padding: 0;
}

html,body{
  width: 100%;
  height: 100%;
  min-height: 100%;
  /*overflow: hidden;*/
}

div{
  box-sizing: border-box;
}

a{
  color: black;
  text-decoration: none;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
