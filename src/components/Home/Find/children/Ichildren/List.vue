<template>
  <div class="main">
    <van-sticky :offset-top="44">
      <div class="header" @click="startPlayall">
        <div class="icon">
          <van-icon size="20px" name="play-circle-o" />
        </div>
        <div class="content1">
          <div class="name1">
            <span class="title">播放全部</span>
          </div>
        </div>
      </div>
    </van-sticky>
    <div
      @click="fullScreen(item,index)"
      class="lists"
      v-for="(item, index) in this.songs"
      :key="index"
    >
      <div class="index">
        <div>
          <van-image width="44px" height="44px" fit="cover" radius="5" :src="item.album.picUrl" />
        </div>
      </div>
      <div class="content van-ellipsis">
        <div class="name van-ellipsis">
          <span>{{item.name}}</span>
          <span class="alias" v-if="item.alias != ''">({{item.alias[0]}})</span>
        </div>
        <div class="desc van-ellipsis">
          <span>{{item.artists[0].name}}</span>
          <span>-</span>
          <span class="zhuanji">{{item.album.name}}</span>
        </div>
      </div>
      <div class="score">
        <van-icon v-if="item.mvid !== 0" name="video-o" />
      </div>
      <div class="score">
        <van-icon class="icon2" name="ellipsis" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [],
      songs1: []
    };
  },
  methods: {
    async getRitui() {
      await this.$http.get("/recommend/songs").then(res => {
        const data = res.data.recommend;
        this.songs = data;
      });
      this.songs.forEach(async element => {
        const song = await this.$http.get("/song/detail?ids=" + element.id);
        this.songs1.push(song.data.songs[0]);
      });
    },
    startPlayall() {
      this.$store.dispatch("startPlayAll", this.songs1);
      this.$store.commit("audio_ing_song",  [this.songs1[0]]);
      this.$store.commit("startMusic", this.songs1[0].id);
      this.$store.commit("isFull", true);
    },
    fullScreen(item, index) {
      this.$store.commit("returnIndex", index);
      this.$http("/song/detail?ids=" + item.id).then(res => {
        this.$store.dispatch("startPlayAll", this.songs1);
        this.$store.commit("audio_ing_song", res.data.songs);
        this.$store.commit("startMusic", item.id);
        this.$store.commit("isFull", true);
      });
    },
  },
  mounted() {
    this.getRitui();
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  margin-top: -15px;
}
.header {
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 15px 15px 0px 0px;
}
.header .icon {
  height: 44px;
  width: 44px;
  position: relative;
}
.icon .van-icon {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
}
.lists {
  height: 60px;
  display: flex;
  align-items: center;
  background: white;
}
.lists:active {
  background: #e0e0e0;
}
.index,
.score {
  width: 60px;
  height: 60px;
  position: relative;
  color: #a3a3a3;
}
.score {
  width: 30px;
}
.content {
  flex: 1;
  font-size: 13px;
  width: 100%;
}
.name {
  position: relative;
}
.alias {
  color: #a2a2a2;
}
.index div {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
  font-size: 13px;
}
.score .van-icon {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
  font-size: 20px;
}
.desc {
  font-size: 10px;
  color: #a2a2a2;
}
</style>