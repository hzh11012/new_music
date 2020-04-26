<template>
  <div class="nav">
    <div class="lefticon">
      <van-icon class="btn" name="arrow-left" size="20px" @click="back()" />
    </div>
    <div class="center">
      <div>每日推荐</div>
    </div>
  </div>
</template>

<script>
export default {
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
  background: #ee5253;
}
.lefticon {
  width: 44px;
  position: relative;
}
.center {
  flex: 1;
  height: 44px;
  position: relative;
}
.center div {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
}
.btn {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
}
</style>
