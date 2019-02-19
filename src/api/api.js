import axios from "./instance"

const API = {
  // 注册
  register({ email, username, password, sex }) {
    return axios({
      method: 'post',
      url: '/user',
      data: {
        email, username, password, sex
      }
    })
  },
  // 登录
  login({ email, password }) {
    return axios({
      method: "post",
      url: "/login",
      data: {
        email, password
      }
    })
  },
  // 获取tags
  getTags() {
    return axios({
      method: 'get',
      url: '/tags'
    })
  },
  // 创建新的note
  createNewNote({ note, tags }) {
    return axios({
      method: 'post',
      url: '/easynote',
      data: {
        note,
        tags
      }
    })
  },
  // 搜索note
  getSearchNote({ isSelf, page, cout, keywords, tags }) {
    return axios({
      method: 'get',
      url: '/easynote',
      params: { isSelf, page, cout, keywords, tags }
    })
  }
}

export default API