import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import Toasted from 'vue-toasted';
Vue.use(Toasted);

new Vue({
  store,
  beforeCreate(){
    this.store.dispatch('loading');
  },
  render: h => h(App),
}).$mount('#app')
