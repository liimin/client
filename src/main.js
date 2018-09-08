import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import router  from '@/router';
import ui from './ui';
for (const key in ui) {
  Vue.use(ui[key])
}
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
