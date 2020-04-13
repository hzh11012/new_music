<template>
  <div>
    <van-nav-bar @click-left="onClickLeft">
      <div class="back" slot="left">
        <van-icon name="arrow-left" size="23px" color="black" />
      </div>
      <div slot="title">
        <div class="title">手机号登录</div>
      </div>
    </van-nav-bar>
    <div class="content">
      <van-form @submit="login">
        <van-field
          :autofocus="autofocus"
          v-model="$store.state.pwd"
          maxlength="30"
          type="password"
          placeholder="请输入密码"
        >
          <template #button>
            <van-button size="mini" plain type="info">忘记密码?</van-button>
          </template>
        </van-field>
        <van-button class="login_btn" round block native-type="submit">
          <p class="login_btn_text">登录</p>
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      autofocus: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async login() {
      if (this.$store.state.pwd === "") {
        return this.$toast("请输入密码");
      }
      const { data: info } = await this.$http.get(
        "/login/cellphone?phone=" +
          this.$store.state.phone +
          "&password=" +
          this.$store.state.pwd
      );
      if (info.code === 502) {
        return this.$toast("用户名或密码错误！");
      }
      window.localStorage.setItem("token", info.token);
      this.$store.commit('userInfo', info);
      Toast.loading({
        forbidClick: true,
        duration: 1500,
        onClose: this.goHome()
      });
    },
    goHome() {
      setTimeout(() => {
        this.$router.push("/home");
      }, 1500);
    }
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
.login_btn {
  position: absolute;
  transform: translateX(50%) translateY(100%);
  right: 50%;
  width: 90%;
  height: 33px;
  background-color: #de2d19;
  color: white;
  border-radius: 20px;
  text-align: center;
}
.login_btn_text {
  margin: 0px;
  font-size: 0.9rem;
  line-height: 33px;
}
.content {
  padding-top: 72px;
}
</style>