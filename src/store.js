import Vue from 'vue'
import Vuex from 'vuex'
import API from './api/api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: null,
    originKeyword: "",
    snackbar: {
      text: '哈？',
      color: null,
      status: false,
      timeout: 4000,
    },
    tagOptions: []
  },
  getters: {
    keywords: state => {
      return state.originKeyword ? state.originKeyword.replace(/ +/g, ",") : '';
    },
  },
  mutations: {
    updateOriginKeyword(state, data) {
      state.originKeyword = data
    },
    closeSnackbar(state) {
      state.snackbar.status = false
    },
    awakeSnackbar(state, { text = '哈？', color = null, status = true, timeout = 4000 }) {
      state.snackbar = {
        text, color, status, timeout
      }
    },
    setTags(state, data) {
      state.tagOptions = data.data
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
    }
    // async getSearchNote({ commit, dispatch, state }, { value }) {
    //   let keywords = value.split(" ");
    //   let res = await API.getSearchNote(keywords)
    // }
  }
})
