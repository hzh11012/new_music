<template>
  <div
    class="bgimg"
    :style="{'background-image':'url(' + (this.$store.state.userinfo.profile.backgroundUrl) + ')'}"
  >
    <div class="bgimg-mask">
      <van-card>
        <div slot="thumb" class="touxiangbox">
          <van-image
            round
            width="54px"
            height="54px"
            :src="this.$store.state.userinfo.profile.avatarUrl"
          />
        </div>
        <div slot="title" class="nicknamebox">
          <span class="nickname">{{this.$store.state.userinfo.profile.nickname}}</span>
        </div>
        <div slot="desc" class="descbox">
          <van-tag round color="rgba(173,173,173,.3)" :style="[this.$store.state.userinfo.profile.vipType ? {color:'white'} : {color:'#969799'} ]">
            <i>VIP</i>
          </van-tag>
          <van-tag round color="rgba(173,173,173,.5)" text-color="white">
            <i>Lv.{{ this.$store.state.userdetail.level}}</i>
          </van-tag>
        </div>
      </van-card>
      <div class="icons">
        <div class="childDiv">
          <van-icon name="like-o" />
          <span>本地音乐</span>
        </div>
        <div class="childDiv">
          <van-icon name="down" />
          <span>下载管理</span>
        </div>
        <div class="childDiv">
          <van-icon name="music-o" />
          <span>我的电台</span>
        </div>
        <div class="childDiv">
          <van-icon name="star-o" />
          <span>我的收藏</span>
        </div>
        <div class="childDiv">
          <van-icon name="fire-o" />
          <span>关注新歌</span>
        </div>
      </div>
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  width: 100%;
  height: 12px;
  background: white;
  border-radius: 20px 20px 0px 0px;
}
.bgimg {
  width: 100%;
  height: 235px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.bgimg-mask {
  height: 100%;
  width: 100%;
  background: rgba(39, 39, 39, 0.3);
}
.contents {
  position: absolute;
}
.van-card {
  padding: 10px;
  padding-top: 50px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
}
.touxiangbox {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
  height: 54px;
}
.nicknamebox {
  position: relative;
  top: 22px;
}
.nickname {
  font-size: 14px;
}
.descbox {
  position: relative;
  top: 26px;
}
.van-tag {
  margin-right: 6px;
}
.van-card__thumb {
  width: 66px;
}
.icons {
  width: 100%;
  height: 60px;
  display: flex;
  margin-bottom: 17px;
}
.childDiv {
  flex: 1;
  margin: 5px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
  color: white;
}
.childDiv span {
  font-size: 12px;
  display: block;
}
.childDiv .van-icon {
  display: block;
  padding-top: 6px;
  padding-bottom: 3px;
  font-size: 24px;
}
</style>