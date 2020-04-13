import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phone: '',
    pwd:'',
    userinfo: '',
    userdetail: '',
    userplaylist: '',
    userloveplaylist: ''
  },
  mutations: {
    //用户的信息
    userInfo (state, info) {
      state.userinfo = info;
    },
    //用户的详情
    userDetail (state, info) {
      state.userdetail = info;
    },
    //用户的全部歌单
    userPlaylist(state, info){
      state.userplaylist = info;
    },
    //用户的 我喜欢的音乐 歌单
    userLoveplaylist(state, info){
      state.userloveplaylist = info;
    }
  },
  actions: {
  },
  modules: {
  }
})
