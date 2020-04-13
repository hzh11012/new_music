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
      window.localStorage.setItem('state', JSON.stringify(this.$store.state));
    })

    localStorage.getItem("state") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("state"))));
  }
}
</script>