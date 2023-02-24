import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import Toasted from 'vue-toasted';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.use(Toasted);

const router = new VueRouter({
  mode:'history',
  routes:[

    {
      path: '/main',
      component: () => import('./components/MainPage.vue')
    },
    {
      path: '/templates',
      component: () => import('./components/pages/TemplateHolder.vue')
    },
    {
      path: '/*',
      redirect: '/main'
    }

  ]
})

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
