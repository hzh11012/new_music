<template>
  <div class="main">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in $store.state.banners" :key="index">
          <img :src="item.pic" class="bannersimg" />
          <van-tag class="title" :color="item.titleColor">{{item.typeTitle}}</van-tag>
        </van-swipe-item>
      </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {}
};
</script>

<style scoped>
.main {
  padding: 9px 9px 0px 9px;
}
.bannersimg {
  width: 100%;
  height: auto;
  display: block;
}
.van-swipe {
  border-radius: 6px;
}
.title {
  position: absolute;
  right: 0;
  bottom: 0;
  border-top-left-radius: 6px;
}
</style>