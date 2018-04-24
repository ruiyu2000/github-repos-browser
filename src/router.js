import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/' },
    { path: '/:language/:page(\\d+)?' }
  ]
})
