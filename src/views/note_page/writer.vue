<template>
  <div id="writer-page">
    <v-autocomplete
      v-model="tags"
      :items="tagOptions"
      label="tags"
      item-text="tag"
      item-value="id"
      multiple
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          :selected="data.selected"
          small
          close
          class="chip--select-multi"
          @input="removeTag(data.item)"
        >{{ data.item.tag }}</v-chip>
      </template>
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.tag"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
    <v-textarea
      class="textarea"
      name="writer-input"
      v-model="content"
      rows="20"
      label="Default style"
      counter
    ></v-textarea>
    <!-- <textarea name="df" id="ssd" cols="30" rows="10" v-model="content"></textarea> -->
    <div class="button-box">
      <v-btn class="button submitted" @click="createNewNote" color="success">Submitted</v-btn>
      <v-btn class="button cancel" color="normal">Cancel</v-btn>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";

export default {
  data: () => ({
    content: "",
    tags: [],
    createKey: false
  }),
  methods: {
    ...mapMutations(["awakeSnackbar"]),
    ...mapActions(["getSearchNote"]),
    removeTag(item) {
      const index = this.tags.indexOf(item.id);
      if (index >= 0) this.tags.splice(index, 1);
    },
    async createNewNote() {
      if (this.createKey) return;
      try {
        this.createKey = true;
        let res = await this.$http.createNewNote({
          note: this.content,
          tags: this.tags
        });
        this.awakeSnackbar({ text: "发表成功！" });
        this.getSearchNote({ init: true });
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } catch (e) {
        this.awakeSnackbar({ text: e.response.data.message, type: "error" });
        this.createKey = false;
      }
    }
  },
  computed: {
    ...mapGetters(["searchTagsList"]),
    ...mapState(["tagOptions"])
  }
};
</script>

<style lang="less" scoped>
#writer-page {
  width: 100%;
  padding: 20px;
  .textarea {
  }
  .button-box {
    // right: 10px;
    // position: fixed;
    // bottom: 20px;
  }
}
</style>
