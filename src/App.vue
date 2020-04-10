<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem('info', JSON.stringify(this.$store.state));
    })

    localStorage.getItem("info") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("info"))));
  }
}
</script>