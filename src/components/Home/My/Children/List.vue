<template>
  <div>
    <div class="title">我的音乐</div>
    <div class="list">
      <div
        class="childDiv"
        :style="{'background-image':'url(' + (this.$store.state.userloveplaylist[0].al.picUrl) + ')'}"
      >
        <van-icon name="like" color="rgb(255,77,61)"/>
        <span>我喜欢的音乐</span>
      </div>
      <div class="childDiv">
        <van-icon name="aim" />
        <span>私人FM</span>
      </div>
      <div class="childDiv">
        <van-icon name="star" color="rgb(51,51,51)"/>
        <span>Sati空间</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title {
  font-weight: 600;
  padding-left: 9px;
  padding-bottom: 6px;
}
.list {
  color: #fff;
  height: 165px;
  text-align: center;
  display: flex;
}
.list .childDiv {
  flex: 1;
  margin: 6px 6px 6px 0;
  border-radius: 5px;
  font-size: 13px;
  background-size: cover;
  background-position: center;
  background-image: url(https://img.yzcdn.cn/vant/cat.jpeg);
}
.childDiv .van-icon {
  display: block;
  font-size: 24px;
  padding-top: 52px;
}
.list .childDiv:first-child {
  margin-left: 9px;
  background-size: 100%;
}
.list .childDiv:last-child {
  margin-right: 9px;
  background: rgb(231, 231, 231);
  color: rgb(51,51,51);
}
</style>