import Vue from 'vue'
import Router from 'vue-router'
import frameView from '@/view/frame/frameView.vue'
import logInFrameView from '@/view/logInFrame/logInFrameView.vue'
import EasyLogin from '@/components/EasyLogin'
import orgTreeView from '@/view/orgTree/orgTreeView.vue'
import orgTreeFormView from '@/view/orgTree/orgTreeFormView.vue'
import invoiceFormView from '@/view/orgTree/invoiceFormView.vue'
import bankFormView from '@/view/orgTree/bankFormView.vue'
import indexView from '@/view/index/indexView.vue'
import roleView from '@/view/role/roleView.vue'
import roleFormView from '@/view/role/roleFormView.vue'
import personalCenterView from '@/view/personalCenter/personalCenterView.vue'
import usersView from '@/view/users/usersView.vue'
import usersFormView from '@/view/users/usersFormView.vue'
import usersToRoleView from '@/view/users/usersToRoleView.vue'
import { getToken } from '@/utils/auth'
import workflowView from '@/view/workflow/workflowView.vue'
import workflowFormView from '@/view/workflow/workflowFormView.vue'
import PFANS8008View from '@/view/PFANS/PFANS8000/PFANS8008/PFANS8008View.vue'
import PFANS8008FormView from '@/view/PFANS/PFANS8000/PFANS8008/PFANS8008FormView.vue'
import { Message } from 'element-ui'
import i18n from '../assets/js/i18n'
import PFANS1001View from '@/view/PFANS/PFANS1000/PFANS1001/PFANS1001View.vue'
import PFANS1001FormView from '@/view/PFANS/PFANS1000/PFANS1001/PFANS1001FormView.vue'
import PFANS1002FormView from '@/view/PFANS/PFANS1000/PFANS1002/PFANS1002FormView.vue'
import PFANS1035FormView from '@/view/PFANS/PFANS1000/PFANS1035/PFANS1035FormView.vue'
import PFANS1003FormView from '@/view/PFANS/PFANS1000/PFANS1003/PFANS1003FormView.vue'
import PFANS1004FormView from '@/view/PFANS/PFANS1000/PFANS1004/PFANS1004FormView.vue'
import PFANS1005FormView from '@/view/PFANS/PFANS1000/PFANS1005/PFANS1005FormView.vue'
import PFANS1006FormView from '@/view/PFANS/PFANS1000/PFANS1006/PFANS1006FormView.vue'
import PFANS1007FormView from '@/view/PFANS/PFANS1000/PFANS1007/PFANS1007FormView.vue'
import PFANS1008FormView from '@/view/PFANS/PFANS1000/PFANS1008/PFANS1008FormView.vue'
import PFANS1009FormView from '@/view/PFANS/PFANS1000/PFANS1009/PFANS1009FormView.vue'
import PFANS1010FormView from '@/view/PFANS/PFANS1000/PFANS1010/PFANS1010FormView.vue'
import PFANS1012View from '@/view/PFANS/PFANS1000/PFANS1012/PFANS1012View.vue'
import PFANS1012PointFormView from '@/view/PFANS/PFANS1000/PFANS1012/PFANS1012PointFormView.vue'
import PFANS1012FormView from '@/view/PFANS/PFANS1000/PFANS1012/PFANS1012FormView.vue'
import PFANS1013View from '@/view/PFANS/PFANS1000/PFANS1013/PFANS1013View.vue'
import PFANS1013FormView from '@/view/PFANS/PFANS1000/PFANS1013/PFANS1013FormView.vue'
import PFANS1014View from '@/view/PFANS/PFANS1000/PFANS1014/PFANS1014View.vue'
import PFANS1015View from '@/view/PFANS/PFANS1000/PFANS1015/PFANS1015View.vue'
import PFANS1017View from '@/view/PFANS/PFANS1000/PFANS1017/PFANS1017View.vue'
import PFANS1017FormView from '@/view/PFANS/PFANS1000/PFANS1017/PFANS1017FormView.vue'
import PFANS2000View from '@/view/PFANS/PFANS2000/PFANS2000/PFANS2000View.vue'
import PFANS2001View from '@/view/PFANS/PFANS2000/PFANS2001/PFANS2001View.vue'
import PFANS2001FormView from '@/view/PFANS/PFANS2000/PFANS2001/PFANS2001FormView.vue'
import PFANS2002View from '@/view/PFANS/PFANS2000/PFANS2002/PFANS2002View.vue'
import PFANS2002FormView from '@/view/PFANS/PFANS2000/PFANS2002/PFANS2002FormView.vue'
import PFANS2003View from '@/view/PFANS/PFANS2000/PFANS2003/PFANS2003View.vue'
import PFANS2003FormView from '@/view/PFANS/PFANS2000/PFANS2003/PFANS2003FormView.vue'
import PFANS2005View from '@/view/PFANS/PFANS2000/PFANS2005/PFANS2005View.vue'
import PFANS2005FormView from '@/view/PFANS/PFANS2000/PFANS2005/PFANS2005FormView.vue'
import PFANS2006View from '@/view/PFANS/PFANS2000/PFANS2006/PFANS2006View.vue'
import PFANS2007View from '@/view/PFANS/PFANS2000/PFANS2007/PFANS2007View.vue'
import PFANS2009View from '@/view/PFANS/PFANS2000/PFANS2009/PFANS2009View.vue'
import PFANS2011View from '@/view/PFANS/PFANS2000/PFANS2011/PFANS2011View.vue'
import PFANS2011FormView from '@/view/PFANS/PFANS2000/PFANS2011/PFANS2011FormView.vue'
import PFANS2013View from '@/view/PFANS/PFANS2000/PFANS2013/PFANS2013View.vue'
import PFANS2014View from '@/view/PFANS/PFANS2000/PFANS2014/PFANS2014View.vue'
import PFANS2014FormView from '@/view/PFANS/PFANS2000/PFANS2014/PFANS2014FormView.vue'
import PFANS2016View from '@/view/PFANS/PFANS2000/PFANS2016/PFANS2016View.vue'
import PFANS2016FormView from '@/view/PFANS/PFANS2000/PFANS2016/PFANS2016FormView.vue'
import PFANS2017View from '@/view/PFANS/PFANS2000/PFANS2017/PFANS2017View.vue'
import PFANS2018View from '@/view/PFANS/PFANS2000/PFANS2018/PFANS2018View.vue'
import PFANS2018FormView from '@/view/PFANS/PFANS2000/PFANS2018/PFANS2018FormView.vue'
import PFANS2020View from '@/view/PFANS/PFANS2000/PFANS2020/PFANS2020View.vue'
import PFANS2020FormView from '@/view/PFANS/PFANS2000/PFANS2020/PFANS2020FormView.vue'
import PFANS2022View from '@/view/PFANS/PFANS2000/PFANS2022/PFANS2022View.vue'
import PFANS2022FormView from '@/view/PFANS/PFANS2000/PFANS2022/PFANS2022FormView.vue'
import PFANS2023View from '@/view/PFANS/PFANS2000/PFANS2023/PFANS2023View.vue'
import PFANS2023FormView from '@/view/PFANS/PFANS2000/PFANS2023/PFANS2023FormView.vue'
import PFANS2024View from '@/view/PFANS/PFANS2000/PFANS2024/PFANS2024View.vue'
import PFANS2024FormView from '@/view/PFANS/PFANS2000/PFANS2024/PFANS2024FormView.vue'
import PFANS2026View from '@/view/PFANS/PFANS2000/PFANS2026/PFANS2026View.vue'
import PFANS2026FormView from '@/view/PFANS/PFANS2000/PFANS2026/PFANS2026FormView'
import PFANS2025View from '@/view/PFANS/PFANS2000/PFANS2025/PFANS2025View.vue'
import PFANS2025FormView from '@/view/PFANS/PFANS2000/PFANS2025/PFANS2025FormView'
import PFANS3001View from '@/view/PFANS/PFANS3000/PFANS3001/PFANS3001View'
import PFANS3001FormView from '@/view/PFANS/PFANS3000/PFANS3001/PFANS3001FormView'
import PFANS3002View from '@/view/PFANS/PFANS3000/PFANS3002/PFANS3002View.vue'
import PFANS3002FormView from '@/view/PFANS/PFANS3000/PFANS3002/PFANS3002FormView'
import PFANS3003View from '@/view/PFANS/PFANS3000/PFANS3003/PFANS3003View.vue'
import PFANS3003FormView from '@/view/PFANS/PFANS3000/PFANS3003/PFANS3003FormView'
import PFANS3004View from '@/view/PFANS/PFANS3000/PFANS3004/PFANS3004View.vue'
import PFANS3004FormView from '@/view/PFANS/PFANS3000/PFANS3004/PFANS3004FormView'
import PFANS3005View from '@/view/PFANS/PFANS3000/PFANS3005/PFANS3005View.vue'
import PFANS3005FormView from '@/view/PFANS/PFANS3000/PFANS3005/PFANS3005FormView'
import PFANS3006View from '@/view/PFANS/PFANS3000/PFANS3006/PFANS3006View.vue'
import PFANS3006FormView from '@/view/PFANS/PFANS3000/PFANS3006/PFANS3006FormView'
import PFANS3007View from '@/view/PFANS/PFANS3000/PFANS3007/PFANS3007View.vue'
import PFANS3007FormView from '@/view/PFANS/PFANS3000/PFANS3007/PFANS3007FormView'
import PFANS4001View from '@/view/PFANS/PFANS4000/PFANS4001/PFANS4001View'
import PFANS4001FormView from '@/view/PFANS/PFANS4000/PFANS4001/PFANS4001FormView'
import PFANS5001View from '@/view/PFANS/PFANS5000/PFANS5001/PFANS5001View.vue'
import PFANS5001FormView from '@/view/PFANS/PFANS5000/PFANS5001/PFANS5001FormView.vue'
import PFANS5008View from '@/view/PFANS/PFANS5000/PFANS5008/PFANS5008View.vue'
import PFANS5008FormView from '@/view/PFANS/PFANS5000/PFANS5008/PFANS5008FormView.vue'
import PFANS8001View from '@/view/PFANS/PFANS8000/PFANS8001/PFANS8001View.vue'
import PFANS8002View from '@/view/PFANS/PFANS8000/PFANS8002/PFANS8002View.vue'
import PFANS8007View from '@/view/PFANS/PFANS8000/PFANS8007/PFANS8007View.vue'
Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'logInFrame',
    component: logInFrameView,
    children: [
      {
        path: '/',
        name: 'logIn',
        component: EasyLogin
      }
    ]
  },
  {
    path: '/frame',
    name: 'frame',
    component: frameView,
    children: [
      {
        path: '/org',
        name: 'org',
        component: orgTreeView
      },
      {
        path: '/orgFormEdit',
        name: 'orgFormEdit',
        component: orgTreeFormView
      },
      {
        path: '/invoiceForm',
        name: 'invoiceForm',
        component: invoiceFormView
      },
      {
        path: '/bankForm',
        name: 'bankForm',
        component: bankFormView
      },
      {
        path: '/index',
        name: 'index',
        component: indexView
      },
      {
        path: '/roleView',
        name: 'roleView',
        component: roleView
      },
      {
        path: '/workflowView',
        name: 'workflowView',
        component: workflowView
      },
      {
        path: '/roleFormView',
        name: 'roleFormView',
        component: roleFormView
      },
      {
        path: '/personalCenter',
        name: 'personalCenterView',
        component: personalCenterView
      },
      {
        path: '/usersView',
        name: 'usersView',
        component: usersView
      },
      {
        path: '/usersFormView',
        name: 'usersFormView',
        component: usersFormView
      },
      {
        path: '/usersToRoleView',
        name: 'usersToRoleView',
        component: usersToRoleView
      },
      {
        path: '/workflowFormView',
        name: 'workflowFormView',
        component: workflowFormView
      },
      {
        path: '/PFANS1001View',
        name: 'PFANS1001View',
        component: PFANS1001View,
      },
      {
        path: '/PFANS1001FormView',
        name: 'PFANS1001FormView',
        component: PFANS1001FormView,
      },
      {
        path: '/PFANS1002FormView',
        name: 'PFANS1002FormView',
        component: PFANS1002FormView,
      },
      {
        path: '/PFANS1035FormView',
        name: 'PFANS1035FormView',
        component: PFANS1035FormView,
      },
      {
        path: '/PFANS1003FormView',
        name: 'PFANS1003FormView',
        component: PFANS1003FormView,
      },
      {
        path: '/PFANS1004FormView',
        name: 'PFANS1004FormView',
        component: PFANS1004FormView,
      },
      {
        path: '/PFANS1005FormView',
        name: 'PFANS1005FormView',
        component: PFANS1005FormView,
      },
      {
        path: '/PFANS1006FormView',
        name: 'PFANS1006FormView',
        component: PFANS1006FormView,
      },
      {
        path: '/PFANS1007FormView',
        name: 'PFANS1007FormView',
        component: PFANS1007FormView,
      },
      {
        path: '/PFANS1008FormView',
        name: 'PFANS1008FormView',
        component: PFANS1008FormView,
      },
      {
        path: '/PFANS1009FormView',
        name: 'PFANS1009FormView',
        component: PFANS1009FormView,
      },
      {
        path: '/PFANS1010FormView',
        name: 'PFANS1010FormView',
        component: PFANS1010FormView,
      },
      {
        path: '/PFANS1012View',
        name: 'PFANS1012View',
        component: PFANS1012View,
      },
      {
        path: '/PFANS1012PointFormView',
        name: 'PFANS1012PointFormView',
        component: PFANS1012PointFormView,
      },
      {
        path: '/PFANS1012FormView',
        name: 'PFANS1012FormView',
        component: PFANS1012FormView,
      },
      {
        path: '/PFANS1013View',
        name: 'PFANS1013View',
        component: PFANS1013View,
      },
      {
        path: '/PFANS1013FormView',
        name: 'PFANS1013FormView',
        component: PFANS1013FormView,
      },
      {
        path: '/PFANS1014View',
        name: 'PFANS1014View',
        component: PFANS1014View,
      },
      {
        path: '/PFANS1015View',
        name: 'PFANS1015View',
        component: PFANS1015View,
      },
      {
        path: '/PFANS1017View',
        name: 'PFANS1017View',
        component: PFANS1017View,
      },
      {
        path: '/PFANS1017FormView',
        name: 'PFANS1017FormView',
        component: PFANS1017FormView,
      },
      {
        path: '/PFANS2000View',
        name: 'PFANS2000View',
        component: PFANS2000View,
      },
      {
        path: '/PFANS2001View',
        name: 'PFANS2001View',
        component: PFANS2001View,
      },
      {
        path: '/PFANS2001FormView',
        name: 'PFANS2001FormView',
        component: PFANS2001FormView,
      },
      {
        path: '/PFANS2002View',
        name: 'PFANS2002View',
        component: PFANS2002View,
      },
      {
        path: '/PFANS2002FormView',
        name: 'PFANS2002FormView',
        component: PFANS2002FormView,
      },
      {
        path: '/PFANS2003View',
        name: 'PFANS2003View',
        component: PFANS2003View,
      },
      {
        path: '/PFANS2003FormView',
        name: 'PFANS2003FormView',
        component: PFANS2003FormView,
      },
      {
        path: '/PFANS2005View',
        name: 'PFANS2005View',
        component: PFANS2005View,
      },
      {
        path: '/PFANS2005FormView',
        name: 'PFANS2005FormView',
        component: PFANS2005FormView,
      },
      {
        path: '/PFANS2006View',
        name: 'PFANS2006View',
        component: PFANS2006View,
      },
      {
        path: '/PFANS2007View',
        name: 'PFANS2007View',
        component: PFANS2007View,
      },
      {
        path: '/PFANS2009View',
        name: 'PFANS2009View',
        component: PFANS2009View,
      },
      {
        path: '/PFANS2011View',
        name: 'PFANS2011View',
        component: PFANS2011View,
      },
      {
        path: '/PFANS2011FormView',
        name: 'PFANS2011FormView',
        component: PFANS2011FormView,
      },
      {
        path: '/PFANS2013View',
        name: 'PFANS2013View',
        component: PFANS2013View,
      },
      {
        path: '/PFANS2014View',
        name: 'PFANS2014View',
        component: PFANS2014View,
      },
      {
        path: '/PFANS2014FormView',
        name: 'PFANS2014FormView',
        component: PFANS2014FormView,
      },
      {
        path: '/PFANS2016View',
        name: 'PFANS2016View',
        component: PFANS2016View
      },
      {
        path: '/PFANS2016FormView',
        name: 'PFANS2016FormView',
        component: PFANS2016FormView
      },
      {
        path: '/PFANS2017View',
        name: 'PFANS2017View',
        component: PFANS2017View
      },
      {
        path: '/PFANS2018View',
        name: 'PFANS2018View',
        component: PFANS2018View
      },
      {
        path: '/PFANS2018FormView',
        name: 'PFANS2018FormView',
        component: PFANS2018FormView
      },
      {
        path: '/PFANS2020View',
        name: 'PFANS2020View',
        component: PFANS2020View
      },
      {
        path: '/PFANS2020FormView',
        name: 'PFANS2020FormView',
        component: PFANS2020FormView
      },
      {
        path: '/PFANS2022View',
        name: 'PFANS2022View',
        component: PFANS2022View
      },
      {
        path: '/PFANS2022FormView',
        name: 'PFANS2022FormView',
        component: PFANS2022FormView
      },
      {
        path: '/PFANS2023View',
        name: 'PFANS2023View',
        component: PFANS2023View
      },
      {
        path: '/PFANS2023FormView',
        name: 'PFANS2023FormView',
        component: PFANS2023FormView
      },
      {
        path: '/PFANS2024View',
        name: 'PFANS2024View',
        component: PFANS2024View
      },
      {
        path: '/PFANS2024FormView',
        name: 'PFANS2024FormView',
        component: PFANS2024FormView
      },
      {
        path: '/PFANS2026View',
        name: 'PFANS2026View',
        component: PFANS2026View
      },
      {
        path: '/PFANS2026FormView',
        name: 'PFANS2026FormView',
        component: PFANS2026FormView
      },
      {
        path: '/PFANS2025View',
        name: 'PFANS2025View',
        component: PFANS2025View
      },
      {
        path: '/PFANS2025FormView',
        name: 'PFANS2025FormView',
        component: PFANS2025FormView
      },
      {
        path: '/PFANS3001View',
        name: 'PFANS3001View',
        component: PFANS3001View
      },{
        path: '/PFANS3001FormView',
        name: 'PFANS3001FormView',
        component: PFANS3001FormView
      },
      {
        path: '/PFANS3002View',
        name: 'PFANS3002View',
        component: PFANS3002View
      },
      {
        path: '/PFANS3002FormView',
        name: 'PFANS3002FormView',
        component: PFANS3002FormView
      },
      {
        path: '/PFANS3003View',
        name: 'PFANS3003View',
        component: PFANS3003View
      },
      {
        path: '/PFANS3003FormView',
        name: 'PFANS3003FormView',
        component: PFANS3003FormView
      },
      {
        path: '/PFANS3004View',
        name: 'PFANS3004View',
        component: PFANS3004View
      },
      {
        path: '/PFANS3004FormView',
        name: 'PFANS3004FormView',
        component: PFANS3004FormView
      },
      {
        path: '/PFANS3005View',
        name: 'PFANS3005View',
        component: PFANS3005View
      },
      {
        path: '/PFANS3005FormView',
        name: 'PFANS3005FormView',
        component: PFANS3005FormView
      },
      {
        path: '/PFANS3006View',
        name: 'PFANS3006View',
        component: PFANS3006View
      },
      {
        path: '/PFANS3006FormView',
        name: 'PFANS3006FormView',
        component: PFANS3006FormView
      },
      {
        path: '/PFANS3007View',
        name: 'PFANS3007View',
        component: PFANS3007View
      },
      {
        path: '/PFANS3007FormView',
        name: 'PFANS3007FormView',
        component: PFANS3007FormView
      },
      {
        path: '/PFANS4001View',
        name: 'PFANS4001View',
        component: PFANS4001View,
      },
      {
        path: '/PFANS4001FormView',
        name: 'PFANS4001FormView',
        component: PFANS4001FormView,
      },
      {
        path: '/PFANS5001View',
        name: 'PFANS5001View',
        component: PFANS5001View
      },
      {
        path: '/PFANS5001FormView',
        name: 'PFANS5001FormView',
        component: PFANS5001FormView
      },
      {
        path: '/PFANS5008View',
        name: 'PFANS5008View',
        component: PFANS5008View
      },
      {
        path: '/PFANS5008FormView',
        name: 'PFANS5008FormView',
        component: PFANS5008FormView
      },
      {
        path: '/PFANS8001View',
        name: 'PFANS8001View',
        component: PFANS8001View
      },
      {
        path: '/PFANS8002View',
        name: 'PFANS8002View',
        component: PFANS8002View
      },
      {
        path: '/PFANS8007View',
        name: 'PFANS8007View',
        component: PFANS8007View
      },
      {
        path: '/PFANS8008View',
        name: 'PFANS8008',
        component: PFANS8008View,
      },
      {
        path: '/PFANS8008FormView',
        name: 'PFANS8008FormView',
        component: PFANS8008FormView,
      },
    ]
  }
];

const whiteList = [
  '/register',
  '/',
];

const router = new Router({
  routes
});


router.beforeEach((to, from, next) => {
  if (getToken()) {
    next();
  }
  else if (whiteList.indexOf(to.path) !== -1) { // ????????????????????????????????????
    next()
  } else {
    Message({
      message: i18n.t('normal.error_05'),
      type: 'error',
      duration: 5 * 1000
    });
    next('/')
  }
});

export default router;
