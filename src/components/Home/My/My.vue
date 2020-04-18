<template>
  <div>
    <van-sticky z-index="1">
      <headers></headers>
    </van-sticky>
    <lists></lists>
    <records></records>
    <usermusiclist></usermusiclist>
  </div>
</template>

<script>
import headers from "./Children/User.vue";
import lists from "./Children/List.vue";
import records from "./Children/Record.vue";
import usermusiclist from "./Children/UserMusiclist.vue";

export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    async getUserinfo() {
      const { data: detail } = await this.$http.get(
        "/user/detail?uid=" + this.$store.state.userinfo.account.id
      );
      //用户的详情
      this.$store.commit("userDetail", detail);

      const { data: playlist } = await this.$http.get(
        "/user/playlist?uid=" + this.$store.state.userinfo.account.id
      );
      //用户的全部歌单
      this.$store.commit("userPlaylist", playlist.playlist);

      const { data: info1 } = await this.$http.get(
        "/playlist/detail?id=" + this.$store.state.userplaylist[0].id
      );
      //用户的 我喜欢的音乐 歌单内容
      this.$store.commit("userLoveplaylist", info1.playlist.tracks);

      // const data = await this.$http.get(
      //   "/user/record?uid=" + this.$store.state.userinfo.account.id
      // );
      // console.log(data);

      //轮播图
      const { data: info2 } = await this.$http.get("/banner?type=1");
      this.$store.commit("banners", info2.banners);
    }
  },
  created() {
    this.getUserinfo();
  },
  components: {
    headers,
    lists,
    records,
    usermusiclist
  }
};
</script>

<style scoped>
</style>