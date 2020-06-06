const actions = {
  setFileName: ({ commit }, fileName) => {
    console.log('actions')
    return commit('SET_FILENAME', fileName)
  }
}
export default actions
