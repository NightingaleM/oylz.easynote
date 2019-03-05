<template>
  <div id="search-page">
    <span class="is-self-btn" @click="updateCheckSelf">看自己的！{{selectInfo.checkSelf?'': '还有别人的！'}}</span>
    <v-expansion-panel v-model="panel" class="search-expansiton-box">
      <v-expansion-panel-content class="expansion-header">
        <div slot="header">搜索内容：{{selectInfo.originKeyword.replace(/ +/g,',')}}</div>
        <v-card>
          <v-card-text>
            <v-text-field
              v-model.trim="selectInfo.originKeyword"
              :counter="40"
              label="search your note"
              required
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content class="expansion-header">
        <div
          slot="header"
        >标签：{{selectInfo.tags.lenght ? '' : selectInfo.tags.map(i=>{return i.tag})}}</div>
        <v-card>
          <v-card-text>
            <v-autocomplete
              v-model="selectInfo.tags"
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
    <div id="note-content-box" v-scroll:#note-content-box="onScroll">
      <v-list two-line v-show="noteList.length" id="scroll-box">
        <template v-for="(item) in noteList">
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
      <span v-if="!noteList.length">啥都没有呐</span>
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
      timeOut: null,
      addPageLock: false,
      panel: null, // 控制扩展面板的展开、关闭
      panelTimeOut: null // 到事件自动闭合所有扩展面板
    };
  },
  methods: {
    ...mapMutations([
      "updateOriginKeyword",
      "awakeSnackbar",
      "updateTags",
      "updateCheckSelf",
      "removeTag",
      "addPage"
    ]),
    ...mapActions(["getSearchNote"]),
    noteDetail(id) {
      this.$router.push(`/details/${id}`);
    },
    onScroll(e) {
      if (this.addPageLock) return;
      let domOffsetHeight = document.querySelector("#scroll-box").offsetHeight;
      let scrollTop = e.target.scrollTop;
      let windowHeight = window.innerHeight;
      if (scrollTop + windowHeight > domOffsetHeight + 34) {
        this.addPageLock = true;
        this.addPage(this.page + 1);
      }
    }
  },
  created() {},
  mounted() {},
  computed: {
    selectInfo: {
      get() {
        return this.$store.state.selectInfo;
      }
    },
    ...mapState(["userinfo", "tagOptions", "noteList", "page"]),
    ...mapGetters(["keywords"])
  },
  watch: {
    panel: {
      handler(status) {
        if (status === null) return;
        clearTimeout(this.panelTimeOut);
        this.panelTimeOut = setTimeout(() => {
          this.panel = null;
        }, 4000);
      }
    },
    selectInfo: {
      handler(selectInfo) {
        if (selectInfo.tags.length > 5) {
          selectInfo.tags = selectInfo.tags.splice(0, 5);
          this.awakeSnackbar({ text: "标签数不可超过5！", timeout: 2000 });
        }
        clearTimeout(this.panelTimeOut);
        this.panelTimeOut = setTimeout(() => {
          this.panel = null;
        }, 4000);
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(async () => {
          let res = await this.getSearchNote({ init: true });
          this.addPageLock = false;
        }, 600);
      },
      deep: true
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
  #note-content-box {
    height: calc(100vh - 35px - 71px);
    overflow-y: scroll;
  }
}
</style>
