<template>
  <div class="main">
    <van-sticky>
      <navs></navs>
    </van-sticky>
    <van-tabs
      class="tabs"
      title-active-color="rgb(255,104,104)"
      v-model="active"
      swipeable
      sticky
      offset-top="44"
    >
      <van-tab class="tab" title="单曲">
        <danqu></danqu>
      </van-tab>
      <van-tab class="tab" title="视频">
        <shipin></shipin>
      </van-tab>
      <van-tab class="tab" title="专辑">
        <zhuanji></zhuanji>
      </van-tab>
      <van-tab class="tab" title="歌单">
        <gedan></gedan>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import navs from "./sfchildren/Nav";
import danqu from "./sfchildren/Danqu";
import shipin from "./sfchildren/Shipin";
import zhuanji from "./sfchildren/Zhuanji";
import gedan from "./sfchildren/Gedan"
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {
    navs,
    danqu,
    shipin,
    zhuanji,
    gedan
  }
};
</script>

<style scoped>
</style>