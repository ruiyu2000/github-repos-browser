import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './registerServiceWorker'

Vue.use(Vuetify, {
  theme: {
    primary: '#24292e'
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
