import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 1
  },
  mutations: {
    SET_TEST: (state, newTest) => {
      console.log(newTest)
      state.test = newTest
    }
  },
  actions: {
    setTest: ({ commit, state }, newTest) => {
      console.log('actions')
      return commit('SET_TEST', newTest)
    }
  },
  modules: {
  }
})
