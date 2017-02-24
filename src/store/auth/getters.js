export const getters = {
  isAuthenticated: state => {
    return !!state.userInfo // !! - cast to boolean value
  }
}
