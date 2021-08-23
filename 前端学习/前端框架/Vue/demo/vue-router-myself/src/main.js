import Vue from 'vue'
import App from './App.vue'
import home from './pages/home'
import list from './pages/list'
import news from './pages/news'
import MyVueRouter from './plugins/my-router'
Vue.config.productionTip = false

Vue.use(MyVueRouter)
// 配置路由规则
const router = new MyVueRouter({
  routes: [
      //每一个路由规则都是一个对象
      //path 路由的 hash地址
      //component 路由的所展示的组件
      {
        path: '/',
        // 当访问 '/'的时候 路由重定向 到新的地址 '/home'
        component: home,
      },     
      {
        path: '/news',
        component: news,
      },
      {
        path: '/list',
        component: list,
      },
  ],
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
