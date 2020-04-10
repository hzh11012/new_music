<template>
  <body>
  </body>
</template>

<script>
export default {
  mounted() {
    const that = this;
    setTimeout(() => {
      that.$router.push('/home');
    }, 3000)
  }
}
</script>

<style scoped>
body {
  background-image: url('../../assets/hello.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
