// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from 'qs'
import store from "./store"
import "./assets/css/reset.css"
//引入element-ui
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI);

//引入组件
import components from "./components"
for (let i in components) {
  Vue.component(i, components[i])
}
//引入过滤器
import filters from "./filters"
for (let i in filters) {
  Vue.filter(i, filters[i])
}
//引入axios
import axios from "axios"
axios.interceptors.response.use(response => {
  console.log("---------请求的数据" + response.config.url + "---------");
  console.log(response);
  console.log("---------over--------");
  if (response.data.code == -1) {
    router.replace('/login')
    return
  }
  return response;
})
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
//拦截


//全局守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
    return;
  }
  if (!localStorage.getItem('isAdmin')) {
    next('/login');
    return
  }
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
