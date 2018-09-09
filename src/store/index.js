/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:36
 * @Last Modified by: limin
 * @Last Modified time: 2018-09-09 15:09:21
 */
import Vue from 'vue'
import app from './modules/app'
import Vuex from 'vuex'
Vue.use(Vuex)
const modules =[
   app
 ]
const store = new Vuex.Store({
  modules
})
export default store
