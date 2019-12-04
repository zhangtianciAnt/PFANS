// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VCharts from 'v-charts'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "babel-polyfill";
import i18n from './assets/js/i18n'
import '../static/theme/index.css'
import moment from 'moment'
import CnRegionPicker from 'cn-region-picker'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
Vue.config.productionTip = false
Vue.use(VCharts);
Vue.use(CnRegionPicker)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

router.beforeEach((to, from, next) => {

  /* 路由发生变化修改页面title */
  if (to.meta.title && to.meta.type === 'wx') {
    document.title = to.meta.title;
  } else {
    document.title = 'P-FANS';
  }
  next()
});

Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

