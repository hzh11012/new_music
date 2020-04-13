import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '../components/Login/Hello'
import Index from '../components/Login/Index'
import Login from '../components/Login/Login'
import Register from '../components/Login/Register'
import Login1 from '../components/Login/Login1'
import Home from '../components/Home/Home'
// import My from '../components/Home/My/My'
// import Find from '../components/Home/Find/Find'
// import Cloud from '../components/Home/Cloud/Cloud'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'hello', component: Hello },
  { path: '/index', name: 'index', component: Index },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/login1', name: 'login1', component: Login1 },
  {
    path: '/home', name: 'home', component: Home,
    // children: [
    //   { path: '/home/my', component: My },
    //   { path: '/home/find', component: Find },
    //   { path: '/home/cloud', component: Cloud },
    // ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //to代表将要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数，表示放行
  if (to.path === '/index' || to.path === '/login' || to.path === '/' ||
    to.path === '/login1' || to.path === '/register' || to.path === '/hello') {
    return next();
  }
  const tokenStr = window.localStorage.getItem('token');
  if (!tokenStr) {
    return next('/index');
  }
  next();
})


export default router
