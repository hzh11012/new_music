<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view />
    <audios></audios>
  </div>
</template>
<script>
import audios from "./components/Home/Audio/Auido";
export default {
  created() {
    window.addEventListener("beforeunload", () => {
      this.$store.commit('audio_ing_song', []);
      window.localStorage.setItem("state", JSON.stringify(this.$store.state));
    });

    localStorage.getItem("state") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(localStorage.getItem("state"))
        )
      );
  },
  components: {
    audios
  }
};
</script>