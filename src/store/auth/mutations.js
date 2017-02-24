export const mutations = {
  LOGIN (state, data) {
    state.userInfo = data
  },
  LOGOUT (state) {
    state.userInfo = null
  }
}
