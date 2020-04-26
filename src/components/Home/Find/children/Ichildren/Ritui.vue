<template>
  <div>
    <van-sticky>
      <navs></navs>
    </van-sticky>
    <headers></headers>
    <lists></lists>
  </div>
</template>

<script>
import navs from "./Nav";
import headers from "./Header";
import lists from "./List";
export default {
  data() {
    return {};
  },
  components: {
    navs,
    headers,
    lists
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
}
.btn {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
}
</style>
