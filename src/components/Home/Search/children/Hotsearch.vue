<template>
  <div>
    <div class="title">热搜榜</div>
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="lists" v-for="(item, index) in hotSearch" :key="index">
          <div class="index">
            <div :class="index < 3 ? 'first_third_index':'last_idnex'">{{index + 1}}</div>
          </div>
          <div class="content" :class="index < 3 ? 'first_third_content' : ''">
            <div class="name">
              {{item.searchWord}}
              <van-icon :name="item.iconUrl" :size=" item.iconType == 5 ? '13' : '22'"/>
            </div>
            <div class="desc">{{item.content}}</div>
          </div>
          <div class="score">
            <div>{{item.score}}</div>
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
      hotSearch: [],
      page: 0,
      number: 15,
      hotlength: "",
      loading: false,
      finished: false
    };
  },
  mounted() {
    this.getHot();
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.page = this.page + 15;
        this.number = this.number + 15;
        this.$http.get("/search/hot/detail").then(res => {
          var date = res.data.data.slice(this.page, this.number);
          date.forEach(element => {
            this.hotSearch.push(element);
          });
        });

        this.loading = false;
        //数据全部加载完毕
        if (this.hotSearch.length >= this.hotlength) {
          //让正在加载中的提示隐藏
          this.finished = true;
        }
      }, 1000);
    },
    async getHot() {
      const data = await this.$http.get("/search/hot/detail");
      this.hotlength = data.data.data.length;
      this.hotSearch = data.data.data.slice(this.page, this.number);

      
    }
  }
};
</script>

<style scoped>
.lists {
  height: 44px;
  display: flex;
  align-items: center;
}
.index,
.score {
  width: 44px;
  height: 44px;
  background: white;
  position: relative;
}
.score {
  width: 59px;
}
.content {
  flex: 1;
  font-size: 14px;
  width: 100%;
}
.index div {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
  font-size: 13px;
}
.score div {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
  font-size: 9px;
  color: rgb(204, 204, 204);
}
.first_third_content {
  font-weight: 600;
  color: rgb(58, 58, 58);
}
.first_third_index {
  color: rgb(255, 58, 58);
}
.last_idnex {
  color: rgb(153, 153, 153);
}
.title {
  font-size: 12px;
  font-weight: 600;
  padding: 30px 14px 10px;
}
.name {
    position: relative;
}
.desc {
  font-size: 9px;
  color: rgb(173, 173, 173);
  font-weight: 500;
}
.van-icon {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  padding-left: 5px;
}
</style>