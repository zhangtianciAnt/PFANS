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
import plTable from 'pl-table'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'pl-table/themes/index.css' // 引入样式（必须引入)，请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦

// import 'pl-table/themes/plTableStyle.css' // 默认表格样式很丑 引入这个样式就可以好看啦（如果你不喜欢这个样式，就不要引入，不引入就跟ele表格样式一样）

Vue.use(plTable);
Vue.config.productionTip = false
Vue.use(VCharts);
Vue.use(CnRegionPicker)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  /* 路由发生变化修改页面title */
  if (to.meta.title && to.meta.type === 'wx') {
    document.title = to.meta.title;
  } else {
    document.title = 'P-FANS';
  }
  next()
});

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

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

