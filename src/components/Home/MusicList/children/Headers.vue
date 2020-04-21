<template>
  <div>
    <div class="backImg" :style="{'background': this.$store.state.backcolor}"></div>
    <div class="main">
      <div class="box">
        <div class="thumbdiv">
          <img class="thumb" :src="playlist.coverImgUrl" />
        </div>
        <div class="van-multi-ellipsis--l2 contentdiv">
          <div class="van-ellipsis">{{playlist.name}}</div>
          <div class="content">
            <img class="avatar" :src="playlist.creator.avatarUrl" />
            <span>{{playlist.creator.nickname}}</span>
            <van-icon name="arrow" />
          </div>
          <div v-if="playlist.description !== null" class="desc">
            <div class="van-multi-ellipsis--l2">{{playlist.description}}</div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="mask"></div>
      </div>
      <div class="icons">
        <div class="childDiv">
          <van-icon name="chat-o" />
          <span>{{playlist.commentCount}}</span>
        </div>
        <div class="childDiv">
          <van-icon name="weapp-nav" />
          <span>{{playlist.shareCount}}</span>
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
      playlist: {
        creator: {}
      }
    };
  },
  methods: {
    async getMusicList() {
      const { data: data } = await this.$http.get(
        "/playlist/detail?id=" + this.$store.state.musiclistid
      );
      this.playlist = data.playlist;
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
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
  padding: 30px 10px 10px 10px;
}
.thumb {
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
  padding-left: 5px;
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
.thumb {
  height: 110px;
  width: 110px;
  border-radius: 5px;
}
.icons {
  width: 100%;
  height: 60px;
  display: flex;
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