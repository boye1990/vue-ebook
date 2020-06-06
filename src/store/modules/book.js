const book = {
  state: {
    fileName: ''
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      console.log(fileName)
      state.fileName = fileName
    }
  }
}

export default book
