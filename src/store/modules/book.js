const book = {
  state: {
    fileName: '',
    defaultFontSize: 16
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      console.log(fileName)
      state.fileName = fileName
    },
    SET_FONTSIZE: (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    }
  }
}

export default book
