<template>
  <div id="note-page">
    <span class="logout" @click="logoutEasynote">登出</span>
    <v-tabs centered color="cyan" dark text height="35px" class="top-tag">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab to="/">Search</v-tab>
      <v-tab to="/writer">write</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapGett, mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  methods: {
    ...mapActions(["logout", "getSearchNote"]),
    ...mapMutations(["awakeSnackbar", "closeSnackbar"]),

    logoutEasynote() {
      this.logout({})
        .then(res => {
          this.$router.push("/login");
        })
        .catch(e => {
          this.awakeSnackbar({
            text: "(╯‵□′)╯︵┻━┻退出登录都能失败！"
          });
        });
    }
  },
  watch: {
    $route(to, from) {
      const toName = to.name;
      const fromName = from.name;
      this.transitionName = toName === "search" ? "slide-right" : "slide-left";
    }
  },
  created() {
    this.getSearchNote({ init: true });
  }
};
</script>

<style lang="less" scoped>
#note-page {
  .logout {
    position: absolute;
    top: 8px;
    right: 5px;
    z-index: 1;
    font-size: 12px;
    border: 1px solid #ffffff73;
    color: #ffffffd6;
    border-radius: 3px;
    padding: 0 3px;
  }
}
</style>
