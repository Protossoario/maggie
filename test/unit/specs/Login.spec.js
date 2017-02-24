import Vue from 'vue'
import Login from 'src/components/Login'

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.login h1').textContent)
      .to.equal('Login')
    expect(vm.$el.querySelector('.login label[for="username"]').textContent)
      .to.equal('Username')
    expect(vm.$el.querySelector('.login label[for="password"]').textContent)
      .to.equal('Password')
    expect(vm.$el.querySelector('.login button').textContent)
      .to.equal('Submit')
  })
})
