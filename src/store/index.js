import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null
  },
  mutations: {
    setUsername(state,name){
        state.username = name;
    }
  },
  actions: {
  },
  modules: {
  }
})
