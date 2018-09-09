import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: _import('dashboard/index')
  },
  {
    path: '/temple',
    name: 'Temple',
    redirect: '/temple/list'
  },
  {
    path: '/temple/list',
    name: 'TempleList',
    component: _import('temple/list')
  },
  {
    path: '/temple/detail',
    name: 'TempleDetail',
    component: _import('temple/detail')
  }
]
export default new Router({
  routes
})
