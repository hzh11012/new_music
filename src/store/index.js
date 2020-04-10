import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phone: '',
    pwd:'',
    userinfo: ''
  },
  mutations: {
    userInfo (state, info) {
      state.userinfo = info;
    }
  },
  actions: {
  },
  modules: {
  }
})
