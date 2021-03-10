import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/style.css'
import VueI18n from 'vue-i18n'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    zh_CN: require('./lang/zh_CN'),
    en_US: require('./lang/en_US')
  }
})

Vue.config.productionTip = false

const vue = new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue
