const actions = {
  setFileName: ({ commit }, fileName) => {
    console.log('actions')
    return commit('SET_FILENAME', fileName)
  },
  setDefaultFontSize: ({ commit }, defaultFontSize) => {
    return commit('SET_FONTSIZE', defaultFontSize)
  }
}
export default actions
