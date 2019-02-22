<template>
  <div id="search-page">
    <span class="is-self-btn" @click="isSelf = !isSelf">看自己的！{{isSelf?'': '还有别人的！'}}</span>
    <v-expansion-panel class="search-expansiton-box">
      <v-expansion-panel-content class="expansion-header">
        <div slot="header">搜索内容：{{originKeyword.replace(/ +/g,',')}}</div>
        <v-card>
          <v-card-text>
            <v-text-field
              v-model.trim="originKeyword"
              :counter="40"
              label="search your note"
              required
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content class="expansion-header">
        <div slot="header">标签：{{tagsName.lenght ? '' : tagsName}}</div>
        <v-card>
          <v-card-text>
            <v-autocomplete
              v-model="tags"
              :items="tagOptions"
              label="tags"
              item-text="tag"
              return-object
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
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <div id="note-content-box">
      <v-list two-line v-if="noteOption.length">
        <template v-for="(item) in noteOption">
          <v-list-tile :key="item.title" class="note-li" @click="noteDetail(item.id)">
            <!-- <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>-->
            <v-list-tile-content style="padding:0">
              <v-list-tile-sub-title>
                <pre class="note-pre">{{item.note}}</pre>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="note-tag" v-for="(tag,tid) in item.tags" :key="tid">{{tag.tag}},</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <span v-else>啥都没有呐</span>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
import { clearTimeout, setTimeout } from "timers";

export default {
  data() {
    return {
      // originKeyword: ""
      tags: [],
      page: 1,
      cout: 20,
      isSelf: true,
      timeOut: null,
      noteOption: []
    };
  },
  methods: {
    ...mapMutations(["updateOriginKeyword", "awakeSnackbar"]),
    ...mapActions(["getTags"]),
    removeTag(item) {
      const index = this.tags.indexOf(item);
      if (index >= 0) this.tags.splice(index, 1);
    },
    noteDetail(id) {
      this.$router.push(`/details/${id}`);
    },
    async getSearchNote(init) {
      console.log(init ? 1 : 222);
      this.page = init ? 1 : this.page;
      let tags = this.tags.map(item => item.id).toString();
      let res = await this.$http.getSearchNote({
        isSelf: this.isSelf,
        page: this.page,
        cout: this.cout,
        keywords: this.keywords,
        tags: tags
      });
      this.noteOption = init ? [] : this.noteOption;
      this.noteOption.push(...res.data.result.data);
    }
  },
  created() {
    this.getSearchNote();
  },
  computed: {
    tagsName() {
      return this.tags.map(item => {
        return item.tag;
      });
    },
    originKeyword: {
      get() {
        return this.$store.state.originKeyword;
      },
      set(value) {
        this.updateOriginKeyword(value);
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          this.getSearchNote(true);
        }, 600);
      }
    },
    ...mapState(["userinfo", "tagOptions"]),
    ...mapGetters(["keywords"])
  },
  watch: {
    tags: {
      handler() {
        if (this.tags.length > 5) {
          this.tags = this.tags.splice(0, 5);
          this.awakeSnackbar({ text: "标签数不可超过5！", timeout: 2000 });
        }
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          this.getSearchNote(true);
        }, 600);
      },
      deep: true
    },
    isSelf() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.getSearchNote(true);
      }, 400);
    }
  }
};
</script>

<style lang="less" scoped>
#search-page {
  margin-top: 75px;
  .is-self-btn {
    position: fixed;
    top: 110px;
    right: 5px;
    z-index: 499;
    font-size: 12px;
    border: 1px solid #b3b3b3;
    color: #939393;
    border-radius: 3px;
    padding: 0 3px;
  }
  .search-expansiton-box {
    padding: 0 20px;
    background-color: #fff;
    position: fixed;
    top: 35px;
    left: 0;
    z-index: 500;
    width: 100%;
    .expansion-header {
      .v-expansion-panel__header {
        padding: 0 24px;
        min-height: 30px;
      }
    }
    .v-card__text {
      padding: 0 10px;
    }
  }
  .note-li {
    // padding: 0 20px;
    border-bottom: 1px solid #bebebe;
    .note-pre {
      height: 45px;
      color: rgba(0, 0, 0, 0.54);
    }
    .note-tag {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
