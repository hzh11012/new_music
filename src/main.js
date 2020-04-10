import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入全局样式表
import './assets/css/global.css'
Vue.config.productionTip = false

import { Button, NavBar, Icon, Field, CellGroup, Toast, Form, CountDown,
  PasswordInput,NumberKeyboard  } from 'vant'
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Toast);
Vue.use(Form);
Vue.use(CountDown);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);


//配置请求的根路径
import axios from 'axios'
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
