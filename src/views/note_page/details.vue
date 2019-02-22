<template>
  <div id="note-detail">
    <div class="card-box">
      <div class="card-title">
        <div class="name-box">
          <!-- <p
            :class="['word','word-'+widx]"
            v-for="(witm,widx) in noteDetail.usernames"
            :key="widx"
          >{{witm}}</p>-->
          {{noteDetail.usersex === 'man' ? '♂': noteDetail.usersex === 'woman'?'♀':'😶'}}
        </div>
        <div class="tag-list">
          <span v-for="(tag,tidx) in noteDetail.tags" :key="tidx">#{{tag.tag}}</span>
        </div>
      </div>
      <v-card-title primary-title>
        <div>
          <p class="note-pre" v-html="noteDetail.note"></p>
        </div>
      </v-card-title>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      noteid: null,
      noteDetail: {
        created_at: null,
        id: null,
        note: "",
        usernames: [],
        usersex: "",
        tags: "",
        DeviceOrientationEventInfo: {}
      }
    };
  },
  methods: {
    ...mapMutations(["awakeSnackbar"]),
    getDeviceorientation() {
      if (window.DeviceOrientationEvent) {
        window.addEventListener(
          "deviceorientation",
          function(event) {
            gamma = event.gamma;
          },
          false
        );
      } else {
        document.querySelector("body").innerHTML = "你的瀏覽器不支援喔";
      }
    },
    async getNoteDetail(id) {
      try {
        let res = await this.$http.getNoteDetail({ id });
        console.log(res);
        Object.assign(this.noteDetail, res.data.result);
      } catch (e) {
        console.log(e);
        this.awakeSnackbar({ text: e });
      }
    }
  },
  created() {
    this.noteid = this.$route.params.id;
    this.getNoteDetail(this.noteid);
  }
};
</script>

<style lang="less" scoped>
#note-detail {
  .card-box {
    .card-title {
      display: flex;
      height: 40px;
      padding-left: 20px;
      // justify-content: space-around;
      align-items: center;
      .name-box {
        position: relative;
        width: 40px;
        height: 40px;
        line-height: 40px;
        .word {
          position: absolute;
          border: 1px solid #cfd;
          text-align: center;
          line-height: 40px;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
