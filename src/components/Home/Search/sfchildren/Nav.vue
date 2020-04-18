<template>
  <div class="nav">
    <div class="lefticon">
      <van-icon class="btn" name="arrow-left" size="20px" @click="back()" />
    </div>
    <div class="center" >
      <van-cell-group>
        <van-field :clearable="true" @keydown.enter="serach(searchName)" :autofocus="true" v-model="searchName" border :placeholder="defaultSearch" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchName: '',
      defaultSearch:''
    };
  },
  methods: {
    async getSearch(){
      const {data:data} = await this.$http.get('/search/default');
      this.defaultSearch = data.data.showKeyword;
    },
    back(){
      this.$router.go(-1);
    },
    serach(name){
      this.$store.commit('searchName', name);
      this.$router.go(0);
    }
  },
  created(){
    this.getSearch();
  }
};
</script>

<style scoped>
.nav {
  height: 44px;
  display: flex;
}
.lefticon {
  width: 44px;
  background: white;
  position: relative;
}
.center {
  flex-grow: 1;
  display: flex;
  height: 44px;
}
.btn {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
}
.van-cell-group {
  width: 100%;
}
</style>