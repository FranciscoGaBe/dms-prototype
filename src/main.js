import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import 'typeface-roboto'
import './plugins/alert'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
