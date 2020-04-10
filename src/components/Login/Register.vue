<template>
  <div>
    <van-nav-bar @click-left="onClickLeft">
      <div class="back" slot="left">
        <van-icon name="arrow-left" size="23px" color="black" />
      </div>
      <div slot="title">
        <div class="title">手机号验证</div>
      </div>
    </van-nav-bar>
    <div>
      <p>验证码已发送至</p>
    </div>
    <div class="content">
      <div class="phone">
        <span>+86 {{ $store.state.phone }}</span>
      </div>
      <div class="time_btn">
        <van-count-down ref="countDown" :time="time" @finish="finish" v-show="isShow">
          <template v-slot="timeData">
            <span class="item">{{ timeData.seconds }}s</span>
          </template>
        </van-count-down>
        <span class="reset_btn" v-show="!isShow" @click="reset">重新获取</span>
      </div>
    </div>
    <div class="input_box">
      <van-password-input
        :value="value"
        :focused="showKeyboard"
        :length="4"
        :mask="false"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 60 * 1000,
      isShow: true,
      value: "",
      showKeyboard: true
    };
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //倒计时完成
    finish() {
      this.isShow = false;
    },
    //重新获取
    reset() {
      this.getEmail();
      this.$refs.countDown.reset();
      this.$toast("发送成功,请查收");
      this.isShow = true;
    },
    //发送验证码 获取
    async getEmail() {
      const data = await this.$http.get(
        "/captcha/sent?phone=" + this.$store.state.phone
      );
      console.log(data);
    },
    async onInput(key) {
      this.value = (this.value + key).slice(0, 4);
      if (this.value.length === 4) {
        const data = await this.$http.get(
          "/captcha/verify?phone=" + this.$store.state.phone + "&captcha=" + this.value
        );
        console.log(data);
        
      } 
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  mounted() {
    this.getEmail();
  }
};
</script>

<style scoped>
.back {
  display: flex;
}
.title {
  font-size: 0.9rem;
  font-weight: 600;
}
.time_btn {
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 16px;
}
.content {
  position: relative;
}
p {
  padding-top: 35px;
  font-size: 14px;
  padding-left: 16px;
  margin-bottom: 10px;
}
.reset_btn {
  font-size: 13px;
  line-height: 18px;
  color: rgb(29, 95, 202);
}
.phone {
  padding-left: 16px;
  font-size: 13px;
  color: gray;
}
.item {
  text-align: center;
}
.input_box {
  padding-top: 60px;
}
</style>