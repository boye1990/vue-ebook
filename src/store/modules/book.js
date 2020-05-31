const book = {
  state: {
    fileName: ''
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      console.log(fileName)
      state.fileName = fileName
    }
  },
  actions: {
    setFileName: ({ commit }, fileName) => {
      console.log('actions')
      return commit('SET_FILENAME', fileName)
    }
  }
}

export default book
