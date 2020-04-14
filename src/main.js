import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入全局样式表
import './assets/css/global.css'
Vue.config.productionTip = false

import {
  Button, NavBar, Icon, Field, Toast, Form, CountDown,
  PasswordInput, NumberKeyboard, Tab, Tabs, Popup, Sticky, Image, Card,
  Tag, Swipe, SwipeItem, Grid, GridItem, Skeleton, PullRefresh
} from 'vant'
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Form);
Vue.use(CountDown);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(Image);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Skeleton);
Vue.use(PullRefresh);

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
