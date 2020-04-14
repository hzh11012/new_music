<template>
  <div>
    <van-tabs
      class="tabs"
      v-model="active"
      line-height="0px"
      :border="false"
      :swipeable="true"
      :sticky="true"
      :background="active==0 ? 'rgba(0,0,0,0)' : 'white'"
      lazy-render
    >
      <div :style="titleclass" slot="nav-left" class="menu_btn">
        <van-icon class="btn" name="wap-nav" @click="showPopup" size="20px" />
      </div>
      <div :style="titleclass" slot="nav-right" class="menu_btn">
        <van-icon class="btn" name="search" size="20px" />
      </div>
      <van-tab class="tab0" title="我的" :title-style="titleclass">
        <my></my>
      </van-tab>
      <van-tab class="tab" title="发现" :title-style="titleclass1">
        <find></find>
      </van-tab>
      <van-tab class="tab" title="云村" :title-style="titleclass2">
        <cloud></cloud>
      </van-tab>
      <van-tab class="tab" title="视频" :title-style="titleclass3"></van-tab>
    </van-tabs>
    <van-popup v-model="show" position="left" :style="{ width: '80%',height: '100%'}">sd</van-popup>
  </div>
</template>

<script>
import my from "../Home/My/My";
import find from "../Home/Find/Find";
import cloud from "../Home/Cloud/Cloud";

export default {
  data() {
    return {
      active: 0,
      titleclass: "font-weight:600;font-size:18px;color:white",
      titleclass1: "font-weight:600;font-size:15px;color:white",
      titleclass2: "font-weight:600;font-size:15px;color:white",
      titleclass3: "font-weight:600;font-size:15px;color:white",
      show: false
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    }
  },
  components: {
    my,
    find,
    cloud
  },
  watch: {
    active: function() {
      if (this.active == 0) {
        this.titleclass = "font-weight:600;font-size:18px;color:white";
        this.titleclass1 = "font-weight:500;font-size:15px;color:white";
        this.titleclass2 = "font-weight:500;font-size:15px;color:white";
        this.titleclass3 = "font-weight:500;font-size:15px;color:white";
      } else if (this.active == 1) {
        this.titleclass = "font-weight:500;font-size:15px;";
        this.titleclass1 = "font-weight:600;font-size:18px;";
        this.titleclass2 = "font-weight:500;font-size:15px;";
        this.titleclass3 = "font-weight:500;font-size:15px;";
      } else if (this.active == 2) {
        this.titleclass = "font-weight:500;font-size:15px;";
        this.titleclass1 = "font-weight:500;font-size:15px;";
        this.titleclass2 = "font-weight:600;font-size:18px;";
        this.titleclass3 = "font-weight:500;font-size:15px;";
      } else if (this.active == 3) {
        this.titleclass = "font-weight:500;font-size:15px;";
        this.titleclass1 = "font-weight:500;font-size:15px;";
        this.titleclass2 = "font-weight:500;font-size:15px;";
        this.titleclass3 = "font-weight:600;font-size:18px;";
      }
    }
  }
};
</script>

<style scoped>
.van-popup {
  z-index: 9999;
}
.menu_btn {
  position: relative;
  width: 44px;
}
.btn {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
}
.tabs {
  z-index: 1;
  position: absolute;
  width: 100%;
}
.tabs,
.tab,
.tab0 {
  position: absolute;
  width: 100%;
  min-height: 90%;
  height: 100%;
}
.tab0 {
  margin-top: -44px;
  z-index: -1;
}
</style>