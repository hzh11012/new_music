<template>
  <div>
    <van-grid :column-num="5" :border="false">
      <van-grid-item @click="go(index)" v-for="(item,index) in gridItem" :key="index">
        <div class="icons">
          <van-icon :name="item.icon" size="20px" />
        </div>
        <span class="font">{{ item.text }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridItem: [
        { index: 0, icon: "like-o", text: "每日推荐" },
        { index: 1, icon: "chat-o", text: "歌单" },
        { index: 2, icon: "chat-o", text: "排行榜" },
        { index: 3, icon: "chat-o", text: "电台" },
        { index: 4, icon: "chat-o", text: "直播" }
      ]
    };
  },
  methods: {
    go(index) {
      if (index === 0) {
        this.$router.push("/ritui");
      }
    }
  }
};
</script>

<style scoped>
.font {
  font-size: 12px;
  padding-top: 6px;
}
.icons {
  height: 45px;
  width: 45px;
  background: red;
  border-radius: 100%;
  position: relative;
}
.van-icon {
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  left: 50%;
  color: white;
}
</style>