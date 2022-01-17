import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/vuetify'
import MultiFiltersPlugin from './plugins/MultiFilters'

Vue.config.productionTip = false

Vue.use(MultiFiltersPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
