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
    <div>
      <p class="head_text">未注册手机号登录后将自动创建账号</p></div>
    <div>
      <van-form @submit="login">
        <van-field
          v-model="$store.state.phone"
          label="+86"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
          label-width="40px"
          :clearable="autofocus"
          :autofocus="autofocus"
        />
        
        <van-button class="next_btn" round block native-type="submit">
          <p class="next_btn_text">下一步</p>
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
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
      if(this.$store.state.phone === ''){
        return this.$toast('请输入手机号');
      }
      //判断手机号是否注册
      const { data: info } = await this.$http.get(
        "/cellphone/existence/check?phone=" + this.$store.state.phone
      );
      if (info.exist === -1) {
        //手机号未注册 跳转注册
        return this.$router.push('/register');
      }else {
        //手机号已注册 跳转登录
        return this.$router.push('/login1');
      }
    }
  }
};
</script>

<style scoped>
.back {
  display: flex;
}
.title {
  font-size: .9rem;
  font-weight: 600;
}
.next_btn {
  position: absolute;
  transform: translateX(50%) translateY(100%);
  right: 50%;
  width: 90%;
  height: 33px;
  background-color: #DE2D19;
  color: white;
  border-radius: 20px;
  text-align: center;
}
.next_btn_text {
  margin: 0px;
  font-size: .9rem;
  line-height: 33px;
}
.head_text {
  font-size: 12px;
  letter-spacing: .03rem;
  color: gray;
  padding: 16px;
  display: inline-block;
}
</style>