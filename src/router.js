import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

export default new VueRouter({
  base: "/github-repos-browser",
  mode: 'history',
  routes: [
    { path: '/' },
    { path: '/:language/:page(\\d+)?' },
  ]
})
