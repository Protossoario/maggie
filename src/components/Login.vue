<template>
  <div class="login">
    <h1>Login</h1>
    <label for="username">Username</label>
    <input id="username" v-model="username" placeholder="username">
    <label for="password">Password</label>
    <input id="password" v-model="password" placeholder="password">
    <button @click="onSubmit">Submit</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit: function () {
      const username = this.username
      const password = this.password
      this.$store.dispatch('login', { username, password })
    }
  }
}
</script>
