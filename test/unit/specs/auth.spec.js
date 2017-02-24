import { mutations } from 'store/auth/mutations'
import { getters } from 'store/auth/getters'

const actionsInjector = require('inject-loader!store/auth/actions')
const actions = actionsInjector({
  '../../api/auth': {
    login (props, data) {
      expect(data.username).to.exist.and.equal('test@dev.com')
      expect(data.password).to.exist.and.equal('secret')
      return new Promise(resolve => {
        resolve({
          json () {
            return new Promise(resolve => {
              resolve('TEST-TOKEN')
            })
          }
        })
      })
    }
  }
})

const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]
    expect(mutation.type).to.equal(type)
    if (payload) {
      expect(mutation.payload).to.deep.equal(payload)
    }
    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }

  // call the action with mocked store and arguments
  action({ commit, state }, payload)

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}

describe('auth.js', () => {
  describe('mutation: LOGIN', () => {
    it('should set the user info', () => {
      const state = { userInfo: null }
      const userInfo = {
        name: 'Test',
        createdAt: 'XXXX-XX-XX'
      }

      mutations.LOGIN(state, userInfo)

      expect(state.userInfo).to.not.be.null
      expect(state.userInfo.name).to.equal('Test')
    })
  })
  describe('mutation: LOGOUT', () => {
    it('should remove the user info', () => {
      const state = {
        userInfo: {
          name: 'Test'
        }
      }

      mutations.LOGOUT(state)

      expect(state.userInfo).to.be.null
    })
  })
  describe('action: login', () => {
    it('should send the username and password to the API, then save the auth token', (done) => {
      const data = {
        username: 'test@dev.com',
        password: 'secret'
      }
      testAction(actions.login, data, {}, [], done)
    })
  })
  describe('action: logout', () => {
    it('should delete the localStorage token and invoke the LOGOUT mutation', (done) => {
      const state = {
        userInfo: {
          name: 'Test'
        }
      }
      localStorage.token = 'TEST-TOKEN'
      testAction(actions.logout, {}, state, [
        { type: 'LOGOUT' }
      ], (err) => {
        if (err) return done(err)
        expect(localStorage.token).to.not.exist
        done()
      })
    })
  })
  describe('getter: isAuthenticated()', () => {
    it('should return false by default', () => {
      const state = { userInfo: null }

      const result = getters.isAuthenticated(state)

      expect(result).to.equal(false)
    })
    it('should return true when user info exists', () => {
      const state = {
        userInfo: {
          name: 'Test',
          createdAt: 'XXXX-XX-XX'
        }
      }

      const result = getters.isAuthenticated(state)

      expect(result).to.equal(true)
    })
  })
})
