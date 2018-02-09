// import * as api from 'service/api'

import * as types from '../types';

/* 保存一份data 的初始状态 */
const initData = {
  'token': '',
  // 0 未登陆，1 登陆中， 2 已登陆成功， 3 登陆失败
  'loginState': 0,
  'username': '',
  'rememberMe': false
};

const state = {
  ...initData
};

// getters
const getters = {

};

// actions
const actions = {
};

// mutations
const mutations = {
  [types.LOGIN_SUCCESS] (state, {
    token,
    username
  }) {
    state.token = token;
    state.loginState = 2;
    state.username = username;
  },
  [types.LOGINING] (state) {
    state.loginState = 1;
  },
  [types.LOGIN_FAIL] (state) {
    state.loginState = 3;
  },
  [types.RESET_STORE] (state) {
    var tempState = {...initData};
    // 保留记住我们状态
    tempState.rememberMe = state.rememberMe;
    tempState.username = state.username;
    for (var i in tempState) {
      state[i] = tempState[i];
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
