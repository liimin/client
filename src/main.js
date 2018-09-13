// import './common/rem';
// import 'lib-flexible/flexible.js'
import Vue from 'vue';
import App from './App.vue';
import router  from '@/router';
import ui from './ui';
import '@/assets/style/style.less'
import '@/assets/style/css.less'
import store from "@/store";
import 'normalize.css/normalize.css'
// window.eventBus=new Vue();
for (const key in ui) {
  Vue.use(ui[key])
}
new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
});