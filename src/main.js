import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
// axios
import axios from 'axios'

Vue.prototype.$axios = axios;     // Vue2.0+官方推荐

// vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
import routes from './routes'

import 'font-awesome/css/font-awesome.min.css'
//jQuery
import $ from 'jquery';

import { setLocalStorage, getLocalStorage } from './api/api';
import api_port from './api/api_address';

Vue.use(api_port)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  mode: 'history',       // 需要后台配置支持
  routes
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
    }
    let user = localStorage.getItem('user') ? getLocalStorage('user') : JSON.parse(sessionStorage.getItem('user'));
    // if (!user && to.path != '/login') {
    //     next({ path: '/login' })
    // } else {
    //     next()
    // }
    next();
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

