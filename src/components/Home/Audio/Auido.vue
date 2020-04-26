<template>
  <div class="main" v-show="this.$store.getters.audio_ing_song != ''">
    <van-overlay
      :style="{'background': this.$store.state.backcolor}"
      :show="this.$store.getters.isFull"
      :z-index="100"
    >
      <div class="nav">
        <div class="lefticon">
          <van-icon class="btn" name="arrow-left" size="20px" @click="returnFull(false)" />
        </div>
        <div class="center">
          <div class="songname">{{name}}</div>
          <div class="author">{{author}}</div>
        </div>
        <div class="righticon">
          <van-icon class="btn" name="friends-o" size="20px" />
        </div>
      </div>
      <div class="content" v-show="this.$store.getters.isShowgeci" @click="returnGeci(false)">
        <div class="pcontent">
          <div :class="isxuanzhuan ?'changzhen1':'changzhen'"></div>
          <div class="heijiao xuanzhuan" ref="xuanzhuan">
            <van-image
              class="coverimg"
              fit="cover"
              round
              width="180px"
              height="180px"
              :src="imgUrl"
            />
          </div>
          <div class="icons">
            <div class="box">
              <div class="lefticon"></div>
              <div class="center center1">
                <van-icon name="like-o" size="20" />
                <van-icon name="down" size="20" />
                <van-icon name="music-o" size="20" />
                <van-icon name="chat-o" size="20" />
                <van-icon name="more-o" size="20" />
              </div>
              <div class="righticon"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref="content11"
        class="content1"
        v-show="!this.$store.getters.isShowgeci"
        @click="returnGeci(true)"
      >
        <div class="nolyric" v-if="noLyric">{{noLyricText}}</div>
        <ul :style="{marginTop: marginTop}">
          <li
            class="van-multi-ellipsis--l2"
            :class="{active: index === nowLyricIndex}"
            v-for="(item,index) in ruleLyric"
            :key="index"
          >{{item | setWords}}</li>
        </ul>
      </div>
      <div class="footer">
        <div class="bar">
          <span>{{playTime}}</span>
          <div class="bar-bg" ref="barBg" @touchstart.prevent="clickBg">
            <div class="bar-layer" :style="{progressWidth:length}"></div>
            <div
              class="point"
              :style="{left:length}"
              @touchstart.prevent="start"
              @touchmove.prevent="move"
              @touchend="end"
            ></div>
          </div>
          <span>{{allTime | setTime}}</span>
        </div>
        <div class="footer_icon">
          <div class="footer_icon_div">
            <van-icon name="exchange" size="30" />
          </div>
          <div class="footer_icon_div">
            <van-icon name="arrow-left" size="30" @click="toUp" />
          </div>
          <div class="footer_icon_div">
            <van-icon
              :name="this.$store.getters.playState ? 'pause-circle-o' : 'play-circle-o'"
              size="50"
              @click="startPlayOrPause"
            />
          </div>
          <div class="footer_icon_div">
            <van-icon name="arrow" size="30" @click="toNext" />
          </div>
          <div class="footer_icon_div">
            <van-icon name="ascending" size="30" @click="showAudioList" />
          </div>
        </div>
      </div>
    </van-overlay>
    <div class="mini" v-show="!this.$store.getters.isFull">
      <div class="mini_left" @click="returnFull(true)">
        <van-image class="mini_img" round width="44px" height="44px" :src="imgUrl" />
      </div>
      <div class="center" @click="returnFull(true)">
        <div class="mini_name">{{name}}</div>
        <div class="mini_geci">{{nowLyric}}</div>
      </div>
      <div class="mini_right1">
        <van-icon
          @click="startPlayOrPause"
          :name="this.$store.getters.playState ? 'pause-circle-o' : 'play-circle-o'"
          class="btn"
          size="30"
          color="black"
        />
      </div>
      <div class="mini_right2" @click="showAudioList">
        <van-icon name="ascending" class="btn" size="30" />
      </div>
    </div>
    <van-action-sheet
      v-model="isAudiolist"
      title="当前播放"
      :close-icon="null"
      :close-on-popstate="true">
      <div class="audiolist">
        <div class="lists" v-for="(item,index) in startplayall" :key="index">
          <div class="center" @click="selectSong(index)">
            <span :class="bijiaoindex === index ? 'changecolor' : ''">{{item.name}}</span>
            <span :class="bijiaoindex === index ? 'changecolor' : ''" v-if="item.name == ''">未知</span>
            <span :class="bijiaoindex === index ? 'changecolor' : ''">-</span>
            <span :class="bijiaoindex === index ? 'changecolor1' : 'arname'">{{item.ar[0].name}}</span>
          </div>
          <div class="righticon">
            <van-icon class="btn" color="#999999" name="cross" size="15" />
          </div>
        </div>
      </div>
    </van-action-sheet>
    <audio
      :src="songUrl"
      autoplay
      ref="audio"
      @ended="end1"
      @canplay="ready"
      @error="error"
      preload="auto"
    ></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isAudiolist: false,
      songUrl: "",
      isPlay: false,
      imgUrl: "",
      author: "",
      name: "",
      allTime: 0,
      progressWidth: 0,
      //歌词
      lyric: [],
      ruleLyric: [],
      //当前时刻的歌词
      nowLyric: [],
      nowLyricIndex: -1,
      nolyric: false,
      nolyricText: "",
      marginTop: "0px",
      playTime: "00:00",
      //bar
      length,
      touch: {},
      readySong: false,
      canSong: true
    };
  },
  methods: {
    returnFull(flag) {
      this.$store.commit("isFull", flag);
    },
    returnGeci(flag) {
      this.$store.commit("isShowgeci", flag);
    },
    async returnUrl(id) {
      await this.$http("/song/url?id=" + id).then(res => {
        const data = res.data;
        this.songUrl = data.data[0].url;
        this.audioTimeUpdate();
        this.toPlay();
      });
    },
    checkSong(id) {
      this.$http("/check/music?id=" + id)
        .then(res => {
          const data = res.data;
          if (data.success) {
            this.canSong = true;
            this.returnUrl(id);
            this.getLyric(id);
          }
        })
        .catch(err => {
          if (err) {
            // 不能播放的时候选择下一首进行播放
            this.canSong = false;
            this.readySong = true;
            this.toNext();
            this.readySong = true;
          }
        });
    },
    startPlayOrPause() {
      if (this.$store.getters.playState) {
        this.toPause();
      } else {
        this.toPlay();
      }
    },
    // 播放音频
    toPlay() {
      this.isPlay = true;
      this.$refs.audio.play();
      this.$store.commit("playState", true);
    },
    // 暂停音频
    toPause() {
      this.isPlay = false;
      this.$refs.audio.pause();
      this.$store.commit("playState", false);
    },
    //展示播放列表
    showAudioList() {
      this.isAudiolist = true;
    },
    //上一首
    toUp() {
      if (!this.readySong) {
        return;
      }
      if (this.$store.state.audioList.length === 1) {
        return false;
      }
      if (this.$store.state.index === 0) {
        var i = this.$store.state.audioList.length - 1;
      } else {
        var i = this.$store.state.index - 1;
      }
      this.$store.commit("returnIndex", i);
      let list = [this.$store.state.audioList[i]];
      this.$store.commit("audio_ing_song", list);
      this.readySong = false;
    },
    //下一首
    toNext() {
      if (!this.readySong) {
        return;
      }
      if (this.$store.state.audioList.length === 1) {
        return false;
      }
      if (this.$store.state.index + 1 === this.$store.state.audioList.length) {
        var i = 0;
      } else {
        var i = this.$store.state.index + 1;
      }
      this.$store.commit("returnIndex", i);
      let list = [this.$store.state.audioList[i]];
      this.$store.commit("audio_ing_song", list);
      this.readySong = false;
    },
    //在当前播放列表中 选择歌曲播放
    selectSong(index) {
      this.$store.commit("returnIndex", index);
      let list = [this.$store.state.audioList[index]];
      this.$store.commit("audio_ing_song", list);
    },
    //获取歌词
    async getLyric(id) {
      await this.$http("/lyric?id=" + id).then(res => {
        const data = res.data;
        if (data.nolyric) {
          //没有歌词
          this.ruleLyric = [];
          this.nowLyric = "";
          this.noLyric = true;
          this.noLyricText = "纯音乐，请欣赏";
          return;
        }
        this.noLyric = false;
        this.lyric = data.lrc.lyric;
        if (!this.lyric.trim()) {
          //歌词为空
          this.noLyricText = "暂时没有歌词";
          this.ruleLyric = [];
          this.nowLyric = "";
          this.noLyric = true;
          return;
        }
        this.ruleLyric = this.creatLrcArray(this.lyric);
      });
    },
    //创建歌词数组
    creatLrcArray(lrc) {
      const parts = lrc.split("\n");
      for (let index = 0; index < parts.length; index++) {
        const element = parts[index];
        parts[index] = this.changeToObject(element);
      }
      return parts;
    },
    //将每行歌词转成对象
    changeToObject(str) {
      const words = str.split("]")[1];
      // 这个正则返回时间信息
      const reg = /\w{0,}:\w{0,}.\w{0,}/g;
      let timeArray = reg.exec(str);
      if (!timeArray) {
        return;
      }
      timeArray = timeArray[0].split(":");
      const minute = parseInt(timeArray[0]); // 分钟数
      const second = parseFloat(timeArray[1]); // 秒数
      const time = minute * 60 + second;
      return {
        time,
        words
      };
    },
    setCurrent(index) {
      // 这里求出中线的位置
      // 通过 歌词容器的高度 / 2 - 每个 li 的高度 / 2
      // 每次移动是移动一行歌词的高度，一行歌词高度
      const midHeight = this.$refs.content11.offsetHeight / 2;
      let top = midHeight - index * 45;
      if (top > 0) {
        //top不能为正数
        top = 0;
      }
      this.marginTop = top + "px";
    },
    //设置当前播放时长
    setTime() {
      // 首先我们计算到当前的播放时间
      const audio = this.$refs.audio;
      let minutes = Math.floor(audio.currentTime / 60);
      let seconds = Math.floor(audio.currentTime - minutes * 60);
      let minuteValue;
      let secondValue;
      // 进行格式转换，当分钟小于10的时候，在前面加0
      if (minutes < 10) {
        minuteValue = "0" + minutes;
      } else {
        minuteValue = minutes;
      }
      // 秒数的格式设置
      if (seconds < 10) {
        secondValue = "0" + seconds;
      } else {
        secondValue = seconds;
      }
      // 进行时间值拼接，展示到页面
      let audioTime = minuteValue + ":" + secondValue;
      this.playTime = audioTime;

      // // // 进度条的长度计算
      let barLength = (audio.currentTime / audio.duration) * 100;
      this.setProgress(barLength);
      // 设置歌词偏移
      const playTime = audio.currentTime;
      const index = this.getCurrentIndex(playTime, this.ruleLyric);
      this.nowLyricIndex = index;
      // 设置歌词显示
      this.showLyric(index, this.ruleLyric);
      this.setCurrent(this.nowLyricIndex);
    },
    // 获取当前歌词索引
    getCurrentIndex(time, lyricArray) {
      for (let i = lyricArray.length - 2; i >= 0; i--) {
        const element = lyricArray[i].time;
        if (time > element) {
          return i;
        }
        if (!element) {
          return -1;
        }
      }
      return -1;
    },
    //添加歌曲时间更新事件
    audioTimeUpdate() {
      this.$refs.audio.addEventListener("timeupdate", this.setTime);
    },
    //设置当前歌词显示信息
    showLyric(index, array) {
      if (index !== -1) {
        const words = array[index].words;
        this.nowLyric = words;
      }
    },
    //当改变进度条时改变歌曲播放时间
    changeTime(time) {
      const audio = this.$refs.audio;
      const current = (time * audio.duration) / 100;
      audio.currentTime = current;
    },
    //设置进度条长度
    setProgress(val) {
      if (val < 0 || val > 100) {
        return;
      }
      this.progressWidth = val;
    },
    //点击小圆点
    start(e) {
      this.touch.state = true;
      const left = this.$refs.barBg.offsetLeft;
      this.touch.startX = e.changedTouches[0].pageX - left;
      this.touch.width = this.$refs.barBg.clientWidth;
    },
    move(e) {
      if (!this.touch.state) {
        return;
      }
      const left = this.$refs.barBg.offsetLeft;
      const deltaX = e.changedTouches[0].pageX - left;
      const width = Math.min(Math.max(0, deltaX), this.touch.width);
      this.touch.offsetWidth = (width / this.touch.width) * 100;
      this._changeWidth(this.touch.offsetWidth);
    },
    _changeWidth(val) {
      this.length = val + "%";
    },
    end() {
      this.touch.state = false;
      this.changeTime(this.touch.offsetWidth);
    },
    clickBg(e) {
      this.touch.width = this.$refs.barBg.clientWidth;
      const left = this.$refs.barBg.offsetLeft;
      this.touch.endX = e.changedTouches[0].pageX - left;
      const offsetWidth = (this.touch.endX / this.touch.width) * 100;
      this._changeWidth(offsetWidth);
      this.changeTime(offsetWidth);
    },
    // 当浏览器可以播放资源时
    ready() {
      this.readySong = true;
    },
    // 当在资源加载期间发生错误时
    error() {
      this.readySong = true;
    },
    // 当歌曲播放完成之后
    end1() {
      this.toNext();
    }
  },
  watch: {
    pstate: function(val) {
      this.imgUrl = val[0].al.picUrl;
      this.author = val[0].ar[0].name;
      this.name = val[0].name;
      this.allTime = val[0].duration
        ? val[0].duration
        : val[0].dt
        ? val[0].dt
        : "";
      this.checkSong(val[0].id);
    },
    isxuanzhuan: function(val) {
      if (val == true) {
        this.$refs.xuanzhuan.style.animationPlayState = "running";
      } else {
        this.$refs.xuanzhuan.style.animationPlayState = "paused";
      }
    },
    progressWidth: function(val) {
      if (val && !this.touch.state) {
        val = val + "%";
        this.length = val;
      }
    }
  },
  computed: {
    ...mapGetters({
      pstate: "audio_ing_song",
      isxuanzhuan: "playState",
      startplayall: "startPlayAll",
      bijiaoindex: "returnIndex"
    })
  },
  filters: {
    setWords: function(val) {
      if (val && val.words) {
        return val.words;
      }
    },
    //将毫秒数转换为正常的时间
    setTime: function(value) {
      if (!value) return "";
      let min = parseInt(value / (1000 * 60));
      if (min < 10) {
        min = "0" + min;
      }
      let sec = parseInt((value % (1000 * 60)) / 1000);
      if (sec < 10) {
        sec = "0" + sec;
      }
      value = `${min}:${sec}`;
      return value;
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes xuanzhuan {
  0% {
    transform: rotate(0deg) translateX(-50%);
  }
  100% {
    transform: rotate(360deg) translateX(-50%);
  }
}
.xuanzhuan {
  animation: xuanzhuan 10s infinite linear;
}
/* 
.full {
} */
.mini {
  height: 54px;
  width: 100%;
  border-top: solid 1px #f3f3f3;
  background: white;
  color: black;
  position: fixed;
  z-index: 9;
  bottom: 0;
  display: flex;
}
.mini_left {
  height: 54px;
  width: 54px;
  position: relative;
}
.mini_right1,
.mini_right2 {
  height: 54px;
  width: 44px;
  position: relative;
}
.mini_name {
  font-size: 15px;
  line-height: 27px;
}
.mini_geci {
  line-height: 27px;
}

.nav {
  height: 44px;
  display: flex;
  align-items: center;
}
.lefticon,
.righticon {
  width: 44px;
  position: relative;
}
.center {
  flex: 1;
  font-size: 14px;
}
.changecolor {
  flex: 1;
  font-size: 15px;
  color: #ff6363;
}
.author {
  font-size: 12px;
}
.pcontent {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  position: absolute;
  width: 100%;
  top: 44px;
  bottom: 150px;
}

.changzhen {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotate(-20deg);
  transform-origin: top left;
  height: 171px;
  width: 120px;
  background: url("../../../assets/zhizhen.png") no-repeat;
  background-size: 100% 100%;
  z-index: 1;
}
.changzhen1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
  transform-origin: top left;
  height: 171px;
  width: 120px;
  background: url("../../../assets/zhizhen.png") no-repeat;
  background-size: 100% 100%;
  z-index: 1;
}
.heijiao {
  position: absolute;
  top: 112px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: 0;
  height: 280px;
  width: 280px;
  background: url("../../../assets/heijiao.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.coverimg,
.mini_img,
.btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.icons {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.box {
  height: 44px;
  display: flex;
}
.center1 {
  display: flex;
}
.center1 .van-icon {
  flex: 1;
  text-align: center;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
}
.footer_icon {
  display: flex;
  height: 80px;
}
.footer_icon .van-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.footer_icon_div {
  flex: 1;
  position: relative;
}
.audiolist {
  height: 100vw;
  width: 100%;
}
.lists {
  display: flex;
  height: 44px;
  padding-left: 10px;
  align-items: center;
}
.arname {
  font-size: 12px;
  color: #999999;
}
.changecolor1 {
  font-size: 12px;
  color: #ff6363;
}
.nolyric {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content1 {
  position: absolute;
  width: 100%;
  top: 44px;
  bottom: 150px;
  color: black;
  overflow: hidden;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
  /* ul元素的margin-top值变化，在0.7秒内完成 */
  transition: margin-top 0.7s;
  li {
    height: 45px;
  }
}
.active {
  color: red;
}
.bar {
  margin: 0.6rem;
  display: flex;
  align-items: center;
  color: #bdc3c7;
  font-size: 0.2rem;
  .bar-bg {
    width: 100%;
    margin: 0 0.16rem;
    height: 3px;
    background-color: #95a5a6;
    position: relative;
    .bar-layer {
      height: 3px;
      background-color: #ecf0f1;
    }
    .point {
      position: absolute;
      top: -3px;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      background-color: #ecf0f1;
    }
  }
}
</style>