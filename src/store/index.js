import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phone: '',
    pwd: '',
    userinfo: '',
    userdetail: '',
    userplaylist: '',
    userloveplaylist: '',
    banners: '',
    recommend: '',
    newsongs: '',
    searchname: '',
    musiclistid: '',
    backcolor: '',
    isFull: false,
    isShowgeci: true,
    audioList: [],
    audio_ing_song: [],
    startMusic: null,
    playState: false,  //是否正在播放
    index: -1,  //当前歌曲的坐标
  },
  getters: {
    isFull(state) {
      return state.isFull
    },
    isShowgeci(state) {
      return state.isShowgeci
    },
    playState(state) {
      return state.playState
    },
    audio_ing_song(state) {
      return state.audio_ing_song
    },
    startPlayAll(state){
      return state.audioList
    },
    returnIndex(state){
      return state.index
    }
  },
  mutations: {
    //用户的信息
    userInfo(state, info) {
      state.userinfo = info;
    },
    //用户的详情
    userDetail(state, info) {
      state.userdetail = info;
    },
    //用户的全部歌单
    userPlaylist(state, info) {
      state.userplaylist = info;
    },
    //用户的 我喜欢的音乐 歌单
    userLoveplaylist(state, info) {
      state.userloveplaylist = info;
    },
    //轮播图
    banners(state, info) {
      state.banners = info;
    },
    //推荐歌单
    recommend(state, info) {
      state.recommend = info;
    },
    //新歌推荐
    newSongs(state, info) {
      state.newsongs = info;
    },
    //搜索关键词
    searchName(state, info) {
      state.searchname = info;
    },
    //歌单ID
    musicListId(state, info) {
      state.musiclistid = info;
    },
    backColor(state, info) {
      state.backcolor = info;
    },
    //是否显示大播放器
    isFull(state, info) {
      state.isFull = info;
    },
    //是否显示歌词
    isShowgeci(state, info) {
      state.isShowgeci = info;
    },
    startMusic(state, info) {
      state.startMusic = info;
    },
    playState(state, info) {
      state.playState = info;
    }, 
    audioList(state, info) {
      state.audioList = info;
    },
    audio_ing_song(state, info){
      state.audio_ing_song = info;
    },
    returnIndex(state, info){
      state.index = info;
    }
  },
  actions: {
    startPlayAll(context, list) {
      context.commit('audioList', list);
    }
  },
  modules: {
  }
})
