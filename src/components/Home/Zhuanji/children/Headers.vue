<template>
  <div>
    <div class="backImg" :style="{'background': this.$store.state.backcolor}"></div>
    <div class="main">
      <div class="box">
        <div class="thumbdiv">
          <div class="index2">
            <van-image width="110" height="110" :src="album.picUrl" radius="5" />
          </div>
        </div>
        <div class="van-multi-ellipsis--l2 contentdiv">
          <div class="van-ellipsis">{{album.name}}</div>
          <div class="content">
            <span>歌手:</span>
            <span>{{album.artist.name}}</span>
            <van-icon name="arrow" />
          </div>
          <div v-if="album.description !== null" class="desc">
            <div class="van-multi-ellipsis--l2">{{album.description}}</div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="mask"></div>
      </div>
      <div class="icons">
        <div class="childDiv">
          <van-icon name="chat-o" />
          <span>{{album.info.commentCount}}</span>
        </div>
        <div class="childDiv">
          <van-icon name="weapp-nav" />
          <span>{{album.info.shareCount}}</span>
        </div>
        <div class="childDiv">
          <van-icon name="down" />
          <span>下载</span>
        </div>
        <div class="childDiv">
          <van-icon name="certificate" />
          <span>多选</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      album: {
        artist: {},
        info: {
          commentCount: ""
        },
        colors: ""
      }
    };
  },
  methods: {
    async getMusicList() {
      const { data: data } = await this.$http.get(
        "/album?id=" + this.$store.state.musiclistid
      );
      this.album = data.album;
    }
  },
  created() {
    this.getMusicList();
  }
};
</script>

<style scoped>
.backImg {
  position: absolute;
  z-index: 0;
  height: 235px;
  width: 100%;
}
.main {
  position: relative;
  z-index: 1;
  height: 235px;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  color: white;
}
.box {
  display: flex;
}
.thumbdiv {
  width: 110px;
  height: 110px;
  margin: 10px 10px 10px 10px;
  box-sizing: border-box;
}
.index2 {
  width: 110px;
  height: 110px;
  background: black;
  border-radius: 50%;
  padding-top: 20px;
}
.index2 .van-image {
  border: 1px solid #ddd;
}
.contentdiv {
  flex: 1;
  height: 110px;
  padding-top: 30px;
  font-size: 15px;
}
.mask {
  width: 10px;
}
.content {
  font-size: 12px;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  padding-top: 10px;
}
.content span {
  line-height: 24px;
  padding-right: 5px;
}
.content .van-icon {
  flex: 1;
}
.avatar {
  width: 24px;
  height: 24px;
  border-radius: 100%;
}
.desc {
  font-size: 12px;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  padding-top: 25px;
}
.icons {
  width: 100%;
  height: 60px;
  display: flex;
  padding-top: 10px;
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