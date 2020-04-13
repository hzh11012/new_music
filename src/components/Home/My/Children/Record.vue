<template>
  <div>
    <div class="title">最近播放</div>
    <!-- <div class="list">
      <div class="child">
        <div
          class="imgurl"
          :style="{'background-image':'url(' + (this.$store.state.userloveplaylist[0].al.picUrl) + ')'}"
        ></div>
      </div>
    </div>-->
    <van-grid :column-num="1" :border="false" :center="false">
      <van-grid-item>
        <div class="items">
          <div class="img">
            <van-icon name="bar-chart-o" class="icon" size="30px" color="white"/>
          </div>
          <div class="listinfo">
            <div class="listname">听歌排行</div>
            <div class="musiccount">累计共听歌{{ this.$store.state.userdetail.listenSongs}}首</div>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title {
  font-weight: 600;
  padding-left: 9px;
  padding-top: 20px;
}
.items {
  display: flex;
  height: 58px;
  padding-left: 1px;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.img {
  height: 58px;
  width: 58px;
  background: rgb(240, 135, 122);
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.listinfo {
  flex: 1;
  width: 100%;
  padding-left: 6px;
}
.listname,
.musiccount {
  font-size: 12px;
  word-break: break-all;
  padding-top: 6px;
  padding-bottom: 6px;
}
.musiccount {
  color: rgb(153, 153, 153);
}
.icon {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
}
</style>