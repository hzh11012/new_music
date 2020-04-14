<template>
  <div>
    <div class="title">推荐歌单</div>
    <div>
      <div class="title1">为你精挑细选</div>
      <van-button round size="mini">查看更多</van-button>
    </div>
    <div class="list">
      <div class="child">
        <div>
          <van-image fit="cover" radius="10px" :src="this.$store.state.recommend[0].picUrl" />
          <div class="listtitle">{{this.$store.state.recommend[0].name}}</div>
        </div>
      </div>
      <div class="child">
        <div>
          <van-image fit="cover" radius="10px" :src="this.$store.state.recommend[num].picUrl" />
          <div class="listtitle">{{this.$store.state.recommend[num].name}}</div>
        </div>
      </div>
      <div class="child">
        <div>
          <van-image fit="cover" radius="10px" :src="this.$store.state.recommend[num1].picUrl" />
          <div class="listtitle">{{this.$store.state.recommend[num1].name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    num: {
      type: Number
    },
    num1: {
      type: Number
    }
  }
};
</script>

<style scoped>
.title {
  padding-left: 9px;
  padding-top: 5px;
  font-size: 12px;
  color: rgb(190, 190, 190);
}
.title1 {
  font-weight: 600;
  padding-left: 9px;
  padding-bottom: 10px;
  display: inline-block;
}
.van-button {
  position: absolute;
  right: 9px;
}
.list {
  display: flex;
}
.list .child {
  flex: 1;
  text-align: center;
  height: 45vw;
  width: 100%;
}
.van-image {
  width: 28vw;
  height: 28vw;
}
.listtitle {
  font-size: 12px;
  word-break: break-all;
  display: inline-block;
  text-align: left;
  width: 28vw;
}
/* .child div {
  height: 20vw;
  background: red;
  
} */
</style>