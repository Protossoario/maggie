import Vue from 'vue'
import VueResource from 'vue-resource'

const API_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : 'http://localhost:8080/api'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export const AuthResource = Vue.resource(API_URL + 'auth')
