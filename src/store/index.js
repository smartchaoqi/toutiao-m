import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOKEN_KEY="TOUTIAO_USER"

export default new Vuex.Store({
  state: {
    //用户对象
    user:JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  getters: {
  },
  mutations: {
    setUser(state,data){
      state.user=data
    //  持久化
      window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
