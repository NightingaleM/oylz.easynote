<template>
  <div id="note-page">
    <v-tabs centered color="cyan" dark text height="35px" class="top-tag">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab to="/">Search</v-tab>
      <v-tab to="/writer">write</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#note-page {
  .tag-icon {
    // font-size: 0.6em;
  }
}
</style>
