import Vue from 'vue'
import App from './App.vue'
import spClock from 'sp-clock'
import "../node_modules/sp-clock/sp-clock.css";

Vue.config.productionTip = false
Vue.use(spClock);
new Vue({
  render: h => h(App),
}).$mount('#app')
