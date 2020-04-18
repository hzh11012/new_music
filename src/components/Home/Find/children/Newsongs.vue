<template>
  <div>
    <div class="title">新歌</div>
    <lazy-component>
      <van-grid :column-num="1" :border="false" :center="false">
        <van-grid-item v-for="(item,index) in this.$store.state.newsongs" :key="index">
          <div class="items">
            <div class="img" :style="{'background-image':'url(' + (item.picUrl) + ')'}"></div>
            <div class="listinfo">
              <div class="listname">
                <div>{{item.name}}</div>
                <div class="artist">- {{item.song.artists[0].name}}</div>
              </div>
              <div class="musiccount">{{item.song.alias[0]}}</div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </lazy-component>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload, {
  lazyComponent: true
});
export default {};
</script>

<style scoped>
.title {
  font-weight: 600;
  padding-left: 9px;
}
.items {
  display: flex;
  height: 58px;
  padding-left: 1px;
  margin-top: -8px;
  margin-bottom: -8px;
  margin-right: -2px;
  -webkit-align-items: center;
  align-items: center;
}
.img {
  height: 58px;
  width: 58px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
}
.listinfo {
  flex: 1;
  width: 100%;
  padding-left: 6px;
}
.listname {
  display: flex;
  -webkit-align-items: center;
  align-items: center;
}
.listname div {
  word-break: break-all;
  display: inline-block;
  padding-right: 4px;
}
.listname:first-child {
  font-size: 14px;
}
.listname .artist {
  font-size: 12px;
  color: rgb(153, 153, 153);
}
.musiccount {
  font-size: 12px;
  word-break: break-all;
}
.musiccount {
  color: rgb(138, 138, 138);
}
</style>