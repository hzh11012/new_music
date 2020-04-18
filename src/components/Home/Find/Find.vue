<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <banners></banners>
      <icons></icons>
      <musiclists :num="suijinum" :num1="suijinum1"></musiclists>
      <newsongs></newsongs>
    </van-pull-refresh>
  </div>
</template>

<script>
import banners from "./children/Banners";
import icons from "./children/Icons";
import musiclists from "./children/Musiclist";
import newsongs from "./children/Newsongs"
export default {
  data() {
    return {
      isLoading: false,
      suijinum: 1,
      suijinum1: 2
    };
  },
  methods: {
    async getFindinfo() {
      //每日推荐歌单
      const { data: data } = await this.$http.get("/recommend/resource");
      this.$store.commit("recommend", data.recommend);
      //新歌
      const { data: data1 } = await this.$http.get("/personalized/newsong");
      this.$store.commit("newSongs", data1.result);
    },
    async onRefresh() {
      const { data: data } = await this.$http.get("/recommend/resource");
      this.$store.commit("recommend", data.recommend);
      const { data: data1 } = await this.$http.get("/personalized/newsong");
      this.$store.commit("newSongs", data1.result);
      setTimeout(() => {
        this.suijinum = Math.floor(Math.random() * (this.$store.state.recommend.length/2 - 1) + 1);
        this.suijinum1 = Math.floor(Math.random() * (this.$store.state.recommend.length - this.$store.state.recommend.length/2) + this.$store.state.recommend.length/2);
        this.isLoading = false;
      }, 1000);
    }
  },
  created() {
    this.getFindinfo();
  },
  components: {
    banners,
    icons,
    musiclists,
    newsongs
  }
};
</script>

<style scoped>
</style>