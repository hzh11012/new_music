<template>
  <div>
    <!-- <van-tabs
        @change="onClick"
        class="tabs"
        v-model="active"
        line-height="0px"
        :border="false"
        :swipeable="true"
        :sticky="true"
        :background="active==0 ? 'rgba(0,0,0,0)' : 'white'"
        lazy-render>
        <div :style="titleclass" slot="nav-left" class="menu_btn">
          <van-icon class="btn" name="wap-nav" @click="showPopup" size="20px" />
        </div>
        <div :style="titleclass" slot="nav-right" class="menu_btn">
          <van-icon class="btn" name="search" size="20px" @click="goSearch" />
        </div>
        <van-tab class="tab0" title="我的" :title-style="titleclass" to="/my"></van-tab>
        <van-tab class="tab" title="发现" :title-style="titleclass1" to="/find"></van-tab>
        <van-tab class="tab" title="云村" :title-style="titleclass2" to="cloud"></van-tab>
        <van-tab class="tab" title="视频" :title-style="titleclass3"></van-tab>
    </van-tabs>-->
    <van-sticky>
      <div class="nav">
        <div class="lefticon">
          <van-icon class="btn" name="wap-nav" @click="showPopup" size="20px" />
        </div>
        <div class="centertitle">
          <div class="child">
            <router-link to="/home/my">
              <div class="tab-link">我的</div>
            </router-link>
          </div>
          <div class="child">
            <router-link to="/home/find">
              <div class="tab-link">发现</div>
            </router-link>
          </div>
          <div class="child">
            <router-link to="/home/cloud">
              <div class="tab-link">云村</div>
            </router-link>
          </div>
          <div class="child">
            <router-link to="/home/video">
              <div class="tab-link">视频</div>
            </router-link>
          </div>
        </div>
        <div class="righticon">
          <van-icon class="btn" name="search" size="20px" @click="goSearch" />
        </div>
      </div>
    </van-sticky>
    <router-view></router-view>
    <van-popup v-model="show" position="left" :style="{ width: '80%',height: '100%'}">sd</van-popup>
  </div>
</template>

<script>
// import my from "../Home/My/My";
// import find from "../Home/Find/Find";
// import cloud from "../Home/Cloud/Cloud";

export default {
  data() {
    return {
      active: 0,
      show: false
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    goSearch() {
      this.$router.push("/search");
    },
    onClick(name) {
      this.active = name;
      console.log(this.active);
    }
  },
  components: {
    // my,
    // find,
    // cloud
  },
  watch: {
    // active: function() {
    //   if (this.active == 0) {
    //     this.titleclass = "font-weight:600;font-size:18px;";
    //     // this.titleclass1 = "font-weight:500;font-size:15px;";
    //     // this.titleclass2 = "font-weight:500;font-size:15px;";
    //     // this.titleclass3 = "font-weight:500;font-size:15px;";
    //   } else if (this.active == 1) {
    //     // this.titleclass = "font-weight:500;font-size:15px;";
    //     this.titleclass1 = "font-weight:600;font-size:18px;";
    //     // this.titleclass2 = "font-weight:500;font-size:15px;";
    //     // this.titleclass3 = "font-weight:500;font-size:15px;";
    //   } else if (this.active == 2) {
    //     // this.titleclass = "font-weight:500;font-size:15px;";
    //     // this.titleclass1 = "font-weight:500;font-size:15px;";
    //     this.titleclass2 = "font-weight:600;font-size:18px;";
    //     // this.titleclass3 = "font-weight:500;font-size:15px;";
    //   } else if (this.active == 3) {
    //     // this.titleclass = "font-weight:500;font-size:15px;";
    //     // this.titleclass1 = "font-weight:500;font-size:15px;";
    //     // this.titleclass2 = "font-weight:500;font-size:15px;";
    //     this.titleclass3 = "font-weight:600;font-size:18px;";
    //   }
    // }
  }
};
</script>

<style scoped>
.van-popup {
  z-index: 9999;
}
.nav {
  height: 44px;
  display: flex;
  line-height: 44px;
}
.nav div {
  height: 44px;
}
.lefticon,
.righticon {
  width: 44px;
  background: white;
  position: relative;
}
.centertitle {
  flex-grow: 1;
  background: white;
  display: flex;
  height: 44px;
}
.centertitle div {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.btn {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
}
.tab-link {
  display: inline-block;
  border-radius: 100%;
  color: #000;
}
.router-link-active .tab-link {
  font-size: 17px;
  font-weight: 600;
  height: 44px;
  width: 44px;
  color: #000;
}
.tab-link:link {
  color: #000;
}
.tab-link:active {
  color: #000;
  background: rgba(165, 165, 165, 0.1);
}
/* .menu_btn {
  position: relative;
  width: 44px;
}
.btn {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
} */
/* .tabs {
  z-index: 1;
  position: absolute;
  width: 100%;
}
.tabs,
.tab,
.tab0 
{
  position: absolute;
  width: 100%;
  min-height: 90%;
  height: 100%;
}
.tab0 {
  margin-top: -44px;
  z-index: -1;
} */
</style>