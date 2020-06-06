const actions = {
  setFileName: ({ commit }, fileName) => {
    return commit('SET_FILENAME', fileName)
  },
  setDefaultFontSize: ({ commit }, defaultFontSize) => {
    return commit('SET_FONTSIZE', defaultFontSize)
  },
  setDefaultTheme: ({ commit }, theme) => {
    return commit('SET_THEME', theme)
  }
}
export default actions
