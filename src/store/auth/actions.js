import auth from '../../api/auth'

export const logout = ({ commit }) => {
  delete localStorage.token
  commit('LOGOUT')
}

export const login = ({ commit }, data) => {
  return auth.login({}, data)
    .then(response => {
      return response.json()
    })
    .then(data => {
      localStorage.token = data.token
      return data
    })
    .catch(err => {
      throw err
    })
}
