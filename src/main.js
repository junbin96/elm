import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import seller from './components/seller/seller'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import './assets/stylus/index.styl'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  { path: '/seller', component: seller },
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})
router.push('/seller')
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
