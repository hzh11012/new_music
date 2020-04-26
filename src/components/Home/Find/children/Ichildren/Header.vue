<template>
  <div class="main">
    <div class="title">
      <div class="time">
        <span>{{date.day}}/</span>
        <span>{{date.month}}</span>
      </div>
      <div class="des">查收属于您的今日推荐</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: {}
    };
  },
  methods: {
    getDate() {
      const nowDate = new Date();
      let date = {
        month: nowDate.getMonth() + 1,
        day: nowDate.getDate()
      };
      if (date.month < 10) {
        date.month = "0" + date.month;
      }
      this.date = date;
    },
    startPlayall() {}
  },
  mounted() {
    this.getDate();
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 40vw;
  background: #ee5253;
}
.title {
  position: relative;
  height: 100%;
  color: white;
}
.time {
  position: absolute;
  bottom: 80px;
  left: 10px;
}
.des {
  position: absolute;
  bottom: 30px;
  left: 10px;
}
.time span:first-child {
  font-size: 28px;
}
.time span:last-child {
  font-size: 20px;
}
</style>