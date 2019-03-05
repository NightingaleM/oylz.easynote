import Vue from 'vue'
import Vuex from 'vuex'
import API from './api/api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: null,
    tagOptions: [],
    noteList: [],
    selectInfo: {
      tags: [],
      originKeyword: '',
      checkSelf: true,
      cout: 20,
    },
    page: 1,
    snackbar: {
      text: '哈？',
      color: null,
      status: false,
      timeout: 4000,
    },
    noteTotal: 1,
  },
  getters: {
    keywords: state => {
      return state.selectInfo.originKeyword ? state.selectInfo.originKeyword.replace(/ +/g, ",") : '';
    },
  },
  mutations: {
    removeTag(state, item) {
      const index = state.selectInfo.tags.indexOf(item);
      if (index >= 0) state.selectInfo.tags.splice(index, 1);
    },
    updateTags(state, data) {
      state.selectInfo.tags = [...data]
    },
    updateCheckSelf(state) {
      state.selectInfo.checkSelf = !state.selectInfo.checkSelf
    },
    closeSnackbar(state) {
      state.snackbar.status = false
    },
    awakeSnackbar(state, { text = '哈？', color = null, status = true, timeout = 4000 }) {
      state.snackbar = {
        text, color, status, timeout
      }
    },
    setTags(state, data) { // 设置tags列表
      state.tagOptions = data.data
    },
    initNoteList(state, data) { // 设置note列表
      const { notes, init, total } = data
      state.noteList = init ? [] : state.noteList
      state.noteList.push(...notes)
      state.noteTotal = total
    },
    addPage(state, data) {
      state.page = data
    }
  },
  actions: {
    async getTags({ commit, dispatch, state }) {
      let res = await API.getTags()
      commit('setTags', res)
    },
    async login({ commit, dispatch, state }, { email, password }) {
      let res = await API.login({ email, password })
    },
    async logout({ commit, dispatch, state }) {
      let res = await API.logout()
    },
    async getSearchNote({ commit, dispatch, state, getters }, { init = false }) {
      if (Math.ceil(state.noteTotal / state.selectInfo.cout) < state.selectInfo.page) return
      let tags = state.selectInfo.tags.map(item => item.id).toString();
      let res = await API.getSearchNote({
        isSelf: state.selectInfo.checkSelf,
        page: state.selectInfo.page,
        cout: state.selectInfo.cout,
        keywords: getters.keywords,
        tags: tags
      });
      commit('initNoteList', { notes: res.data.result.data, init, total: res.data.result.total })
    }
  }
})
