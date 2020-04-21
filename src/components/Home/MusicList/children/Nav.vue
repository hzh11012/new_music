<template>
  <div>
    <div class="nav">
      <div class="lefticon">
        <van-icon class="btn" name="arrow-left" size="20px" @click="back()" />
      </div>
      <div class="center">歌单</div>
      <div class="righticon">
        <van-icon class="btn" name="friends-o" size="20px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.nav {
  height: 44px;
  display: flex;
}
.lefticon,
.righticon {
  width: 44px;
  background: white;
  position: relative;
}
.center {
  flex-grow: 1;
  display: flex;
  height: 44px;
  align-items: center;
  font-size: 16px;
  background: white;
}
.btn {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
}
</style>