<template>
  <div id="login-page">
    Hellow world !!!
  </div>
</template>

<script>
// import * as api from 'service/api';
// import * as types from 'store/types';
// import { mapGetters, mapMutations } from 'vuex';

export default {

  name: 'login',

  data () {
    return {
      username: '',
      password: ''
    };
  },
  computed: {

  },
  methods: {
  },
  created () {
  }
};

</script>

<style lang="less" scoped>
  @import url('login.less');
</style>

<style lang="less">
/* 兼容 IE9 样式 */
.ie9 {
  #login-page {
    .password, .username-label {
      padding: 10px 0;
    }

    .line:after {
      clear: both;
      content: '';
      display: block;

    }
  }
}
</style>
