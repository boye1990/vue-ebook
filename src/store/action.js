const actions = {
  setFileName: ({ commit }, fileName) => {
    return commit('SET_FILENAME', fileName)
  },
  setDefaultFontSize: ({ commit }, defaultFontSize) => {
    return commit('SET_FONTSIZE', defaultFontSize)
  },
  setDefaultTheme: ({ commit }, theme) => {
    return commit('SET_THEME', theme)
  },
  setBookAvailable: ({ commit }, bookAvailable) => {
    return commit('SET_BOOKAVAILABLE', bookAvailable)
  },
  setIsShow: ({ commit }) => {
    return commit('SET_ISSHOW')
  },
  setEpubBook: ({ commit }, epubBook) => {
    return commit('SET_EPUB_BOOK', epubBook)
  }

}
export default actions
