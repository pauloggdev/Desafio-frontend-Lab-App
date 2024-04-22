import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// Import Bootstrap and BootstrapVue CSS files (order is important)


new Vue({
  render: h => h(App),
}).$mount('#app')
