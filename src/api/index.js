import api from "./api"
const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return api
      }
    }
  })
}

export default {
  install
}
