<template>
  <v-snackbar
    v-model="snackbar.status"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    :top="true"
  >
    {{ snackbar.text }}
    <v-btn dark flat @click="closeSnackbar">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["snackbar"])
  },
  methods: {
    ...mapMutations(["closeSnackbar"])
  }
};
</script>

<style lang="less" scoped>
</style>
