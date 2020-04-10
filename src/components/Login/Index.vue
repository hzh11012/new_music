<template>
    <body>
        <div class="logo">
            <img src="../../assets/logo.png">
        </div>
        <div class="login_btn" @click="goLogin"><p>手机号登录</p></div>
    </body>
        
</template>

<script>

export default {
    methods: {
        goLogin() {
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
body {
    background-color: #DE2D19;
}
div {
    position: absolute;
}
.login_btn {
    transform: translateX(50%) translateY(-250%);
    right: 50%;
    bottom: 0%;
    width: 65%;
    height: 30px;
    background-color: white;
    color: #DE2D19;
    border-radius: 20px;
    text-align: center;
}
.login_btn:active {
    background-color: whitesmoke;
}
.logo {
    transform: translateX(50%) translateY(250%);
    right: 50%;
    background-color: red;
    height: 65px;
    width: 65px;
    border-radius: 100%;
}
img {
    padding: 10px 10px 10px 10px;
    width: 44px;
    height: 42px;
}
p {
    margin: 0px;
    font-size: 1rem;
    line-height: 30px;
}
</style>