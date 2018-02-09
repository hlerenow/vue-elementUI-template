import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  modules: {
    user
  },
  mutations,
  actions,
  getters,
  plugins: [createPersistedState({
    storage: window.localStorage
  })]
});
