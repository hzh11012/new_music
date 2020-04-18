<template>
  <div>
    <van-sticky>
      <navs></navs>
    </van-sticky>
    <hotsearch></hotsearch>
  </div>
</template>

<script>
import navs from "./children/Nav";
import hotsearch from "./children/Hotsearch";

export default {
  components: {
    navs,
    hotsearch
  }
};
</script>

<style scoped>
</style>