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
import navs from "./children/Nav";
import headers from "./children/Headers";
import lists from "./children/List";

export default {
  components: {
    navs,
    headers,
    lists
  }
};
</script>

<style scoped>
</style>