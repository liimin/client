import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import router  from '@/router';
import ui from './ui';
import '../public/style/style.less'
import store from "@/store";
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