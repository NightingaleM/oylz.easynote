<template>
  <div id="app">
    <v-app>
      <Snackbar></Snackbar>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
import CSSDoodle from "css-doodle";
import Snackbar from "./components/snackbar";
export default {
  components: {
    Snackbar
  },
  name: "app",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getTags"])
  },
  mounted() {},
  created() {
    this.getTags();
  }
};
</script>

<style lang="less">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
#search-page {
  // 搜索页面的手风琴头部高度
  .search-expansiton-box {
    .expansion-header {
      .v-expansion-panel__header {
        padding: 0 24px;
        min-height: 35px;
      }
    }
  }
}
</style>
