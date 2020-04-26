<template>
  <div>
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          class="lists"
          @click="fullScreen(item)"
          v-for="(item, index) in this.songs"
          :key="index"
        >
          <div class="content van-ellipsis">
            <div class="name van-ellipsis">
              <span>{{item.name}}</span>
              <span class="alias" v-if="item.alias != ''">({{item.alias[0]}})</span>
            </div>
            <div class="desc van-ellipsis">
              <span class="zuozhe">{{item.artists[0].name}}</span>
              <span>-</span>
              <span class="zhuanji">{{item.album.name}}</span>
            </div>
            <div class="desc van-ellipsis">{{item.alias[0]}}</div>
          </div>
          <div class="score">
            <van-icon v-if="item.mv !== 0" name="video-o" />
          </div>
          <div class="score">
            <van-icon name="ellipsis" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [],
      page: 0,
      loading: false,
      finished: false,
      songCount: "",
      audioList: []
    };
  },
  methods: {
    onLoad() {
      setTimeout(async () => {
        await this.$http
          .get(
            "/search?keywords=" +
              this.$store.state.searchname +
              "&type=1&limit=15&offset=" +
              this.page
          )
          .then(res => {
            this.songCount = res.data.result.songCount;
            if (res.data.result.songs !== undefined) {
              res.data.result.songs.forEach(element => {
                this.songs.push(element);
              });
            }
            this.loading = false;
            //数据全部加载完毕
            if (this.page >= this.songCount) {
              //让正在加载中的提示隐藏
              this.finished = true;
            }
            this.page += 15;
          });
      }, 1000);
    },
    fullScreen(item) {
      this.$http("/song/detail?ids=" + item.id).then(res => {
        this.$store.commit("audio_ing_song", res.data.songs);
        this.$store.dispatch("startPlayAll", res.data.songs);
        this.$store.commit("startMusic", item.id);
        this.$store.commit("isFull", true);
      });
    }
  }
};
</script>

<style scoped>
.main {
  padding-top: 7px;
}
.lists {
  display: flex;
  align-items: center;
  padding: 7px 0px 7px 12px;
}
.lists:active {
  background: #e0e0e0;
}
.score {
  width: 30px;
  height: 44px;
  position: relative;
  color: #a3a3a3;
}
.score .van-icon {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
  font-size: 20px;
}
.icon2 {
  transform: rotate(90deg);
}
.content {
  flex: 1;
  font-size: 14px;
  width: 100%;
}
.name {
  position: relative;
}
.alias {
  color: #a2a2a2;
}
.desc {
  font-size: 12px;
  color: #a2a2a2;
  font-weight: 500;
}
.zuozhe {
  color: #527fb0;
}
</style>