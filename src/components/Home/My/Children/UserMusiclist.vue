<template>
  <div>
    <div class="tabs">
      <div class="tab">
        <div
          @click="active = 0"
          class="child"
          :style="active==0?'':'color:rgba(164,164,164,1)'"
        >创建歌单</div>
        <div
          @click="active = 1"
          class="child"
          :style="active==1?'':'color:rgba(164,164,164,1)'"
        >收藏歌单</div>
      </div>
      <div class="content">
        <div v-show="active == 0">
          <van-grid :column-num="2" :border="false" :center="false">
            <van-grid-item v-for="(item,index) in playlist.slice(1,playlistnum)" :key="index">
              <div class="items">
                <div class="img" :style="{'background-image':'url(' + (item.coverImgUrl) + ')'}"></div>
                <div class="listinfo">
                  <div class="listname">{{item.name}}</div>
                  <div class="musiccount">{{item.trackCount}}首</div>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <div v-show="active == 1">
          <van-grid :column-num="1" :border="false" :center="false">
            <van-grid-item v-for="(item,index) in playlist.slice(playlistnum)" :key="index">
              <div class="items">
                <div class="img" :style="{'background-image':'url(' + (item.coverImgUrl) + ')'}"></div>
                <div class="listinfo">
                  <div class="listname">{{item.name}}</div>
                  <div class="musiccount">{{item.trackCount}}首</div>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  computed: {
    playlist() {
      return this.$store.state.userplaylist;
    },
    playlistnum() {
      return this.$store.state.userplaylist
        .map(function(x) {
          return x.subscribed;
        })
        .indexOf(true);
    }
  }
};
</script>

<style scoped>
.tab {
  display: inline;
}
.child {
  display: inline-block;
  text-align: center;
  line-height: 30px;
  padding: 5px 9px 0px 9px;
  font-size: 16px;
  font-weight: 600;
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
  -webkit-justify-content: center;
  justify-content: center;
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
/* .listname {
  padding-bottom: 8px;
} */
.listname,
.musiccount {
  font-size: 12px;
  word-break: break-all;
}
.musiccount {
  color: rgb(153, 153, 153);
}
</style>