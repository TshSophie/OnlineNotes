```js
import Vue from 'vue'
import App from './App.vue'
import LoadPlugin from './plugins/FullScreenLoading'
// 引入插件
Vue.use(LoadPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')


```