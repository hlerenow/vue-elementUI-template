import * as types from './mutation-types'

export default {
  [types.RESET_STORE] (state) {
    state.token = ''
    state.username = ''
    state.role = ''
  }
}
