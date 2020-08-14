import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入inconfont
import './assets/fonts/iconfont.css'


// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// bus传递
Vue.prototype.$bus = new Vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
