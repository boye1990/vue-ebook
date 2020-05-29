const book = {
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
  }
}

export default book
