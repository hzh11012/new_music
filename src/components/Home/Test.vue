<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="标签 1">
        <danqu></danqu>
      </van-tab>
      <van-tab title="标签 2">
        <shipin></shipin>
      </van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import danqu from "./Search/sfchildren/Danqu";
import shipin from "./Search/sfchildren/Shipin";
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      list1: [],
      loading1: false,
      finished1: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onLoad1() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          this.list1.push(this.list1.length + 1);
        }

        // 加载状态结束
        this.loading1 = false;

        // 数据全部加载完成
        if (this.list1.length >= 50) {
          this.finished1 = true;
        }
      }, 1000);
    }
  },
  components: {
    danqu,
    shipin
  }
};
</script>

<style scoped>
</style>