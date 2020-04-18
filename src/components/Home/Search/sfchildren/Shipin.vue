<template>
  <div>
    <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
      <div class="lists1" v-for="(item, index) in this.videos" :key="index">
        <div class="index1" :style="{'background-image':'url(' + (item.coverUrl) + ')'}"></div>
        <div class="content1 van-multi-ellipsis--l2">
          <div class="name1 van-multi-ellipsis--l2">
            <van-icon name="new-arrival-o" color="red" v-if="item.type === 0" />
            {{item.title}}
          </div>
          <div class="desc1 van-ellipsis">
            <span>{{changeTime(item.durationms)}}</span>
            <span v-if="item.type !== 0">by</span>
            <span>{{item.creator[0].userName}}</span>
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
      videos: [],
      page1: 0,
      loading1: false,
      finished1: false,
      videoCount: ""
    };
  },
  methods: {
    onLoad1() {
      console.log(2);
      setTimeout(async () => {
        await this.$http
          .get(
            "/search?keywords=" +
              this.$store.state.searchname +
              "&type=1014&limit=15&offset=" +
              this.page1
          )
          .then(res => {
            this.videoCount = res.data.result.videoCount;
            if (res.data.result.videos !== undefined) {
              res.data.result.videos.forEach(element => {
                this.videos.push(element);
              });
            }
            this.loading1 = false;
            //数据全部加载完毕
            if (this.page1 >= this.videoCount) {
              //让正在加载中的提示隐藏
              this.finished1 = true;
            }
            this.page1 += 15;
          });
      }, 1000);
    },
    changeTime(time) {
      let minutes =
        parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) < 10
          ? "0" + parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
          : parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((time % (1000 * 60)) / 1000 < 10)
        ? "0" + Math.floor((time % (1000 * 60)) / 1000)
        : Math.floor((time % (1000 * 60)) / 1000);
      return minutes + ":" + seconds;
    }
  }
};
</script>

<style scoped>
.lists1 {
  height: 65px;
  display: flex;
  align-items: center;
}
.lists1:active {
  background: #e0e0e0;
}
.index1 {
  width: 99px;
  height: 56px;
  border-radius: 5px;
  margin-left: 12px;
  margin-right: 12px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.index1 div {
  font-size: 12px;
  color: #eae6e4;
}
.content1 {
  flex: 1;
  font-size: 12px;
  width: 100%;
  margin-right: 12px;
}
.name1 {
  position: relative;
}
.desc1 {
  color: rgb(173, 173, 173);
  font-weight: 500;
}
</style>