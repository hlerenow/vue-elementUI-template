// import * as api from 'service/api'

import * as types from 'store/mutation-types'

/* 保存一份data 的初始状态 */
const initData = {
  'token': false,
  'productType': ''
}

const state = {
  ...initData
}

// getters
const getters = {

}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.LOGIN_SUCCESS] (state, {token, type}) {
    state.token = token
    state.productType = type
  },
  [types.RESET_STORE] (state) {
    for (let i in initData) {
      state[i] = initData[i]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
