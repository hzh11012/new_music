<template>
  <div>
    <van-list v-model="loading3" :finished="finished3" finished-text="没有更多了" @load="onLoad3">
      <div class="lists3" v-for="(item, index) in playlists" :key="index">
        <div>
          <van-image width="60px" :src="item.coverImgUrl" height="60px" fit="cover" radius="5" />
        </div>
        <div class="content3 van-ellipsis">
          <div class="name3 van-ellipsis">
            <span>{{item.name}}</span>
          </div>
          <div class="desc3 van-ellipsis">
            <span>{{item.trackCount}}首</span>
            <span> by {{item.creator.nickname}}</span>
            <span>, 播放{{item.playCount}}次</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlists: [],
      page3: 0,
      loading3: false,
      finished3: false,
      playlistCount: ""
    };
  },
  methods: {
    onLoad3() {
      console.log(4);
      setTimeout(async () => {
        await this.$http
          .get(
            "/search?keywords=" +
              this.$store.state.searchname +
              "&type=1000&limit=15&offset=" +
              this.page3
          )
          .then(res => {
            this.playlistCount = res.data.result.playlistCount;
            if (res.data.result.playlists !== undefined) {
              res.data.result.playlists.forEach(element => {
                this.playlists.push(element);
              });
            }
            this.loading3 = false;
            //数据全部加载完毕
            if (this.page3 >= this.playlistCount) {
              //让正在加载中的提示隐藏
              this.finished3 = true;
            }
            this.page3 += 15;
          });
      }, 1000);
    }
  }
};
</script>

<style scoped>
.lists3 {
  height: 65px;
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 10px;
}
.lists3:active {
  background: #e0e0e0;
}
.desc3 {
  color: rgb(173, 173, 173);
  font-weight: 500;
  font-size: 10px;
}
.content3 {
  flex: 1;
  width: 100%;
  margin-left: 12px;
}
.name3 {
  position: relative;
  font-size: 13px;
}
</style>