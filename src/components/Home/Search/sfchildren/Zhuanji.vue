<template>
  <div>
    <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
      <div class="lists2" v-for="(item, index) in albums" :key="index">
        <div class="index2">
          <van-image width="60px" height="60px" :src="item.picUrl" fit="cover" radius='5'/>
        </div>
        <div class="content2 van-ellipsis">
          <div class="name2 van-ellipsis">
            <span>{{item.name}}</span>
            <span v-if="item.alias != ''" class="alias">({{item.alias[0]}})</span>
          </div>
          <div class="desc2 van-ellipsis">
            <span>{{item.artist.name}}</span>
            <span> {{item.publishTime | formatDate}}</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import {formatDate} from '../../../../assets/js/date'
export default {
  data() {
    return {
      albums: [],
      page2: 0,
      loading2: false,
      finished2: false,
      albumCount: ""
    };
  },
  methods: {
    onLoad2() {
      console.log(3);
      setTimeout(async () => {
        await this.$http
          .get(
            "/search?keywords=" +
              this.$store.state.searchname +
              "&type=10&limit=15&offset=" +
              this.page2
          )
          .then(res => {
            this.albumCount = res.data.result.albumCount;
            if (res.data.result.albums !== undefined) {
              res.data.result.albums.forEach(element => {
                this.albums.push(element);
              });
            }
            this.loading2 = false;
            //数据全部加载完毕
            if (this.page2 >= this.albumCount) {
              //让正在加载中的提示隐藏
              this.finished2 = true;
            }
            this.page2 += 15;
          });
      }, 1000);
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
};
</script>

<style scoped>
.lists2 {
  height: 65px;
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 10px;
}
.lists2:active {
  background: #e0e0e0;
}
.index2 {
  width: 70px;
  height: 60px;
  background: #303030;
  border-radius: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.index2 div {
  font-size: 12px;
  color: #eae6e4;
}
.content2 {
  flex: 1;
  
  width: 100%;
  margin-left: 12px;
}
.name2 {
  position: relative;
  font-size: 13px;
}
.desc2 {
  color: rgb(173, 173, 173);
  font-weight: 500;
  font-size: 12px;
}
.alias{
  color: rgb(173, 173, 173);
}
</style>