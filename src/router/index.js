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
import usersView2 from '@/view/users/usersView2.vue'
import usersFormView2 from '@/view/users/usersFormView2.vue'
import usersToRoleView from '@/view/users/usersToRoleView.vue'
import { getToken } from '@/utils/auth'
import workflowView from '@/view/workflow/workflowView.vue'
import workflowFormView from '@/view/workflow/workflowFormView.vue'
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
import PFANS1011FormView from '@/view/PFANS/PFANS1000/PFANS1011/PFANS1011FormView.vue'
import PFANS1012View from '@/view/PFANS/PFANS1000/PFANS1012/PFANS1012View.vue'
import PFANS1012PointFormView from '@/view/PFANS/PFANS1000/PFANS1012/PFANS1012PointFormView.vue'
import PFANS1012FormView from '@/view/PFANS/PFANS1000/PFANS1012/PFANS1012FormView.vue'
import PFANS1013View from '@/view/PFANS/PFANS1000/PFANS1013/PFANS1013View.vue'
import PFANS1013FormView from '@/view/PFANS/PFANS1000/PFANS1013/PFANS1013FormView.vue'
import PFANS1015View from '@/view/PFANS/PFANS1000/PFANS1015/PFANS1015View.vue'
import PFANS1016View from '@/view/PFANS/PFANS1000/PFANS1016/PFANS1016View.vue'
import PFANS1016FormView from '@/view/PFANS/PFANS1000/PFANS1016/PFANS1016FormView.vue'
import PFANS1017View from '@/view/PFANS/PFANS1000/PFANS1017/PFANS1017View.vue'
import PFANS1017FormView from '@/view/PFANS/PFANS1000/PFANS1017/PFANS1017FormView.vue'
import PFANS1018View from '@/view/PFANS/PFANS1000/PFANS1018/PFANS1018View.vue'
import PFANS1018FormView from '@/view/PFANS/PFANS1000/PFANS1018/PFANS1018FormView.vue'
import PFANS1019View from '@/view/PFANS/PFANS1000/PFANS1019/PFANS1019View.vue'
import PFANS1019FormView from '@/view/PFANS/PFANS1000/PFANS1019/PFANS1019FormView.vue'
import PFANS1020View from '@/view/PFANS/PFANS1000/PFANS1020/PFANS1020View.vue'
import PFANS1020FormView from '@/view/PFANS/PFANS1000/PFANS1020/PFANS1020FormView.vue'
import PFANS1021View from '@/view/PFANS/PFANS1000/PFANS1021/PFANS1021View.vue'
import PFANS1021FormView from '@/view/PFANS/PFANS1000/PFANS1021/PFANS1021FormView.vue'
import PFANS1022View from '@/view/PFANS/PFANS1000/PFANS1022/PFANS1022View.vue'
import PFANS1022FormView from '@/view/PFANS/PFANS1000/PFANS1022/PFANS1022FormView.vue'
import PFANS1023View from '@/view/PFANS/PFANS1000/PFANS1023/PFANS1023View.vue'
import PFANS1023FormView from '@/view/PFANS/PFANS1000/PFANS1023/PFANS1023FormView.vue'
import PFANS1024View from '@/view/PFANS/PFANS1000/PFANS1024/PFANS1024View.vue'
import PFANS1024FormView from '@/view/PFANS/PFANS1000/PFANS1024/PFANS1024FormView.vue'
import PFANS1025View from '@/view/PFANS/PFANS1000/PFANS1025/PFANS1025View.vue'
import PFANS1025FormView from '@/view/PFANS/PFANS1000/PFANS1025/PFANS1025FormView.vue'
import PFANS1026View from '@/view/PFANS/PFANS1000/PFANS1026/PFANS1026View.vue'
import PFANS1026FormView from '@/view/PFANS/PFANS1000/PFANS1026/PFANS1026FormView.vue'
import PFANS1027View from '@/view/PFANS/PFANS1000/PFANS1027/PFANS1027View.vue'
import PFANS1027FormView from '@/view/PFANS/PFANS1000/PFANS1027/PFANS1027FormView.vue'
import PFANS1028View from '@/view/PFANS/PFANS1000/PFANS1028/PFANS1028View.vue'
import PFANS1028FormView from '@/view/PFANS/PFANS1000/PFANS1028/PFANS1028FormView.vue'
import PFANS1029View from '@/view/PFANS/PFANS1000/PFANS1029/PFANS1029View.vue'
import PFANS1029FormView from '@/view/PFANS/PFANS1000/PFANS1029/PFANS1029FormView.vue'
import PFANS1030View from '@/view/PFANS/PFANS1000/PFANS1030/PFANS1030View.vue'
import PFANS1030FormView from '@/view/PFANS/PFANS1000/PFANS1030/PFANS1030FormView.vue'
import PFANS1031View from '@/view/PFANS/PFANS1000/PFANS1031/PFANS1031View.vue'
import PFANS1031FormView from '@/view/PFANS/PFANS1000/PFANS1031/PFANS1031FormView.vue'
import PFANS1032View from '@/view/PFANS/PFANS1000/PFANS1032/PFANS1032View.vue'
import PFANS1032FormView from '@/view/PFANS/PFANS1000/PFANS1032/PFANS1032FormView.vue'
import PFANS1033View from '@/view/PFANS/PFANS1000/PFANS1033/PFANS1033View.vue'
import PFANS1033FormView from '@/view/PFANS/PFANS1000/PFANS1033/PFANS1033FormView.vue'
import PFANS1034View from '@/view/PFANS/PFANS1000/PFANS1034/PFANS1034View.vue'
import PFANS1036View from '@/view/PFANS/PFANS1000/PFANS1036/PFANS1036View.vue'
import PFANS1036FormView from '@/view/PFANS/PFANS1000/PFANS1036/PFANS1036FormView.vue'
import PFANS1037View from '@/view/PFANS/PFANS1000/PFANS1037/PFANS1037View.vue'
import PFANS1037FormView from '@/view/PFANS/PFANS1000/PFANS1037/PFANS1037FormView.vue'
import PFANS1038View from '@/view/PFANS/PFANS1000/PFANS1038/PFANS1038View.vue'
import PFANS1038FormView from '@/view/PFANS/PFANS1000/PFANS1038/PFANS1038FormView.vue'
import PFANS1039View from '@/view/PFANS/PFANS1000/PFANS1039/PFANS1039View.vue'
import PFANS1040View from '@/view/PFANS/PFANS1000/PFANS1040/PFANS1040View.vue'
import PFANS1041View from '@/view/PFANS/PFANS1000/PFANS1041/PFANS1041View.vue'
import PFANS1042View from '@/view/PFANS/PFANS1000/PFANS1042/PFANS1042View.vue'
import PFANS1043View from '@/view/PFANS/PFANS1000/PFANS1043/PFANS1043View.vue'
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
import PFANS2007FormView from '@/view/PFANS/PFANS2000/PFANS2007/PFANS2007FormView.vue'
import PFANS2009View from '@/view/PFANS/PFANS2000/PFANS2009/PFANS2009View.vue'
import PFANS2010View from '@/view/PFANS/PFANS2000/PFANS2010/PFANS2010View.vue'
import PFANS2010FormView from '@/view/PFANS/PFANS2000/PFANS2010/PFANS2010FormView.vue'
import PFANS2011View from '@/view/PFANS/PFANS2000/PFANS2011/PFANS2011View.vue'
import PFANS2011FormView from '@/view/PFANS/PFANS2000/PFANS2011/PFANS2011FormView.vue'
import PFANS2013View from '@/view/PFANS/PFANS2000/PFANS2013/PFANS2013View.vue'
import PFANS2014View from '@/view/PFANS/PFANS2000/PFANS2014/PFANS2014View.vue'
import PFANS2014FormView from '@/view/PFANS/PFANS2000/PFANS2014/PFANS2014FormView.vue'
import PFANS2016View from '@/view/PFANS/PFANS2000/PFANS2016/PFANS2016View.vue'
import PFANS2016FormView from '@/view/PFANS/PFANS2000/PFANS2016/PFANS2016FormView.vue'
import PFANS2017View from '@/view/PFANS/PFANS2000/PFANS2017/PFANS2017View.vue'
import PFANS2017FormView from '@/view/PFANS/PFANS2000/PFANS2017/PFANS2017FormView.vue'
import PFANS2029View from '@/view/PFANS/PFANS2000/PFANS2029/PFANS2029View.vue'
import PFANS2029FormView from '@/view/PFANS/PFANS2000/PFANS2029/PFANS2029FormView.vue'
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
import PFANS2025View from '@/view/PFANS/PFANS2000/PFANS2025/PFANS2025View.vue'
import PFANS2025FormView from '@/view/PFANS/PFANS2000/PFANS2025/PFANS2025FormView'
import PFANS2026View from '@/view/PFANS/PFANS2000/PFANS2026/PFANS2026View.vue'
import PFANS2026FormView from '@/view/PFANS/PFANS2000/PFANS2026/PFANS2026FormView'
import PFANS2027View from '@/view/PFANS/PFANS2000/PFANS2027/PFANS2027View.vue'
import PFANS2027FormView from '@/view/PFANS/PFANS2000/PFANS2027/PFANS2027FormView'
import PFANS2028View from '@/view/PFANS/PFANS2000/PFANS2028/PFANS2028View.vue'
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
import PFANS5002View from '@/view/PFANS/PFANS5000/PFANS5002/PFANS5002View.vue'
import PFANS5002FormView from '@/view/PFANS/PFANS5000/PFANS5002/PFANS5002FormView.vue'
import PFANS5004View from '@/view/PFANS/PFANS5000/PFANS5004/PFANS5004View.vue'
import PFANS5004FormView from '@/view/PFANS/PFANS5000/PFANS5004/PFANS5004FormView.vue'
import PFANS5005View from '@/view/PFANS/PFANS5000/PFANS5005/PFANS5005View.vue'
import PFANS5005FormView from '@/view/PFANS/PFANS5000/PFANS5005/PFANS5005FormView.vue'
import PFANS5008View from '@/view/PFANS/PFANS5000/PFANS5008/PFANS5008View.vue'
import PFANS5008FormView from '@/view/PFANS/PFANS5000/PFANS5008/PFANS5008FormView.vue'
import PFANS5009View from '@/view/PFANS/PFANS5000/PFANS5009/PFANS5009View.vue'
import PFANS5011FormView from '@/view/PFANS/PFANS5000/PFANS5011/PFANS5011FormView.vue'
import PFANS5011View from '@/view/PFANS/PFANS5000/PFANS5011/PFANS5011View.vue'
import PFANS5009FormView from '@/view/PFANS/PFANS5000/PFANS5009/PFANS5009FormView.vue'
import PFANS5012View from '@/view/PFANS/PFANS5000/PFANS5012/PFANS5012View.vue'
import PFANS5012FormView from '@/view/PFANS/PFANS5000/PFANS5012/PFANS5012FormView.vue'
import PFANS5013View from '@/view/PFANS/PFANS5000/PFANS5013/PFANS5013View.vue'
import PFANS5013FormView from '@/view/PFANS/PFANS5000/PFANS5013/PFANS5013FormView.vue'
import PFANS5014View from '@/view/PFANS/PFANS5000/PFANS5014/PFANS5014View.vue'
import PFANS5014FormView from '@/view/PFANS/PFANS5000/PFANS5014/PFANS5014FormView.vue'
import PFANS6001View from '@/view/PFANS/PFANS6000/PFANS6001/PFANS6001View.vue'
import PFANS6001FormView from '@/view/PFANS/PFANS6000/PFANS6001/PFANS6001FormView.vue'
import PFANS6002View from '@/view/PFANS/PFANS6000/PFANS6002/PFANS6002View.vue'
import PFANS6002FormView from '@/view/PFANS/PFANS6000/PFANS6002/PFANS6002FormView.vue'
import PFANS6003View from '@/view/PFANS/PFANS6000/PFANS6003/PFANS6003View.vue'
import PFANS6003FormView from '@/view/PFANS/PFANS6000/PFANS6003/PFANS6003FormView.vue'
import PFANS6004View from '@/view/PFANS/PFANS6000/PFANS6004/PFANS6004View.vue'
import PFANS6004FormView from '@/view/PFANS/PFANS6000/PFANS6004/PFANS6004FormView.vue'
import PFANS6005View from '@/view/PFANS/PFANS6000/PFANS6005/PFANS6005View.vue'
import PFANS6005FormView from '@/view/PFANS/PFANS6000/PFANS6005/PFANS6005FormView.vue'
import PFANS6006View from '@/view/PFANS/PFANS6000/PFANS6006/PFANS6006View.vue'
import PFANS6007View from '@/view/PFANS/PFANS6000/PFANS6007/PFANS6007View.vue'
import PFANS6007FormView from '@/view/PFANS/PFANS6000/PFANS6007/PFANS6007FormView.vue'
import PFANS6008View from '@/view/PFANS/PFANS6000/PFANS6008/PFANS6008View.vue'
import PFANS6009View from '@/view/PFANS/PFANS6000/PFANS6009/PFANS6009View.vue'
import PFANS8001View from '@/view/PFANS/PFANS8000/PFANS8001/PFANS8001View.vue'
import PFANS8002View from '@/view/PFANS/PFANS8000/PFANS8002/PFANS8002View.vue'
import PFANS8003View from '@/view/PFANS/PFANS8000/PFANS8003/PFANS8003View.vue'
import PFANS8003FormView from '@/view/PFANS/PFANS8000/PFANS8003/PFANS8003FormView.vue'
import PFANS8007View from '@/view/PFANS/PFANS8000/PFANS8007/PFANS8007View.vue'
import PFANS8008View from '@/view/PFANS/PFANS8000/PFANS8008/PFANS8008View.vue'
import PFANS8008FormView from '@/view/PFANS/PFANS8000/PFANS8008/PFANS8008FormView.vue'
import PFANS8009View from '@/view/PFANS/PFANS8000/PFANS8009/PFANS8009View.vue'
import PFANS8009PointView from '@/view/PFANS/PFANS8000/PFANS8009/PFANS8009PointView.vue'
import PFANS8009FormView from '@/view/PFANS/PFANS8000/PFANS8009/PFANS8009FormView.vue'
import ASSETS1001View from '@/view/ASSETS/ASSETS1000/ASSETS1001/ASSETS1001View.vue'
import ASSETS1001FormView from '@/view/ASSETS/ASSETS1000/ASSETS1001/ASSETS1001FormView.vue'
import ASSETS1002View from '@/view/ASSETS/ASSETS1000/ASSETS1002/ASSETS1002View.vue'
import ASSETS1002FormView from '@/view/ASSETS/ASSETS1000/ASSETS1002/ASSETS1002FormView.vue'
import ASSETS1002ExportFormView from '@/view/ASSETS/ASSETS1000/ASSETS1002/ASSETS1002ExportFormView.vue'
import ASSETS1003View from '@/view/ASSETS/ASSETS1000/ASSETS1003/ASSETS1003View.vue'
import usersFormViewByPerson from '@/view/users/usersFormViewByPerson.vue'
import PFANS1044View from '@/view/PFANS/PFANS1000/PFANS1044/PFANS1044View.vue'

import error401 from '@/components/EasyErrorPage/401.vue'

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
        path: '/error401',
        name: 'error401',
        component: error401
      },
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
        path: '/OnlyusersView',
        name: 'usersView2',
        component: usersView2
      },
      {
        path: '/OnlyusersFormView',
        name: 'OnlyusersFormView',
        component: usersFormView2
      },
      {
        path: '/usersFormViewByPerson',
        name: 'usersFormViewByPerson',
        component: usersFormViewByPerson
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
        path: '/PFANS1011FormView',
        name: 'PFANS1011FormView',
        component: PFANS1011FormView,
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
        path: '/PFANS1015View',
        name: 'PFANS1015View',
        component: PFANS1015View,
      },
      {
        path: '/PFANS1016View',
        name: 'PFANS1016View',
        component: PFANS1016View,
      },
      {
        path: '/PFANS1016FormView',
        name: 'PFANS1016FormView',
        component: PFANS1016FormView,
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
        path: '/PFANS1018View',
        name: 'PFANS1018View',
        component: PFANS1018View,
      },
      {
        path: '/PFANS1018FormView',
        name: 'PFANS1018FormView',
        component: PFANS1018FormView,
      },
      {
        path: '/PFANS1019View',
        name: 'PFANS1019View',
        component: PFANS1019View,
      },
      {
        path: '/PFANS1019FormView',
        name: 'PFANS1019FormView',
        component: PFANS1019FormView,
      },
      {
        path: '/PFANS1020View',
        name: 'PFANS1020View',
        component: PFANS1020View,
      },
      {
        path: '/PFANS1020FormView',
        name: 'PFANS1020FormView',
        component: PFANS1020FormView,
      },
      {
        path: '/PFANS1021View',
        name: 'PFANS1021View',
        component: PFANS1021View,
      },
      {
        path: '/PFANS1021FormView',
        name: 'PFANS1021FormView',
        component: PFANS1021FormView,
      },
      {
        path: '/PFANS1022View',
        name: 'PFANS1022View',
        component: PFANS1022View,
      },
      {
        path: '/PFANS1022FormView',
        name: 'PFANS1022FormView',
        component: PFANS1022FormView,
      },
      {
        path: '/PFANS1023View',
        name: 'PFANS1023View',
        component: PFANS1023View,
      },
      {
        path: '/PFANS1023FormView',
        name: 'PFANS1023FormView',
        component: PFANS1023FormView,
      },
      {
        path: '/PFANS1024View',
        name: 'PFANS1024View',
        component: PFANS1024View,
      },
      {
        path: '/PFANS1024FormView',
        name: 'PFANS1024FormView',
        component: PFANS1024FormView,
      },
      {
        path: '/PFANS1025View',
        name: 'PFANS1025View',
        component: PFANS1025View,
      },
      {
        path: '/PFANS1044View',
        name: 'PFANS1044View',
        component: PFANS1044View,
        meta: {
          keepAlive: true,
          isBack:false
        }
      },
      {
        path: '/PFANS1025FormView',
        name: 'PFANS1025FormView',
        component: PFANS1025FormView,
      },
      {
        path: '/PFANS1026View',
        name: 'PFANS1026View',
        component: PFANS1026View,
      },
      {
        path: '/PFANS1026FormView',
        name: 'PFANS1026FormView',
        component: PFANS1026FormView,
      },
      {
        path: '/PFANS1027View',
        name: 'PFANS1027View',
        component: PFANS1027View,
      },
      {
        path: '/PFANS1027FormView',
        name: 'PFANS1027FormView',
        component: PFANS1027FormView,
      },
      {
        path: '/PFANS1028View',
        name: 'PFANS1028View',
        component: PFANS1028View,
      },
      {
        path: '/PFANS1028FormView',
        name: 'PFANS1028FormView',
        component: PFANS1028FormView,
      },
      {
        path: '/PFANS1029View',
        name: 'PFANS1029View',
        component: PFANS1029View,
      },
      {
        path: '/PFANS1029FormView',
        name: 'PFANS1029FormView',
        component: PFANS1029FormView,
      },
      {
        path: '/PFANS1030View',
        name: 'PFANS1030View',
        component: PFANS1030View,
      },
      {
        path: '/PFANS1030FormView',
        name: 'PFANS1030FormView',
        component: PFANS1030FormView,
      },
      {
        path: '/PFANS1031View',
        name: 'PFANS1031View',
        component: PFANS1031View,
      },
      {
        path: '/PFANS1031FormView',
        name: 'PFANS1031FormView',
        component: PFANS1031FormView,
      },
      {
        path: '/PFANS1032View',
        name: 'PFANS1032View',
        component: PFANS1032View,
      },
      {
        path: '/PFANS1032FormView',
        name: 'PFANS1032FormView',
        component: PFANS1032FormView,
      },
      {
        path: '/PFANS1033View',
        name: 'PFANS1033View',
        component: PFANS1033View,
      },
      {
        path: '/PFANS1033FormView',
        name: 'PFANS1033FormView',
        component: PFANS1033FormView,
      },
      {
        path: '/PFANS1034View',
        name: 'PFANS1034View',
        component: PFANS1034View,
      },
      {
        path: '/PFANS1036View',
        name: 'PFANS1036View',
        component: PFANS1036View,
      },
      {
        path: '/PFANS1036FormView',
        name: 'PFANS1036FormView',
        component: PFANS1036FormView,
      },
      {
        path: '/PFANS1037View',
        name: 'PFANS1037View',
        component: PFANS1037View,
      },
      {
        path: '/PFANS1037FormView',
        name: 'PFANS1037FormView',
        component: PFANS1037FormView,
      },
      {
        path: '/PFANS1038View',
        name: 'PFANS1038View',
        component: PFANS1038View,
      },
      {
        path: '/PFANS1038FormView',
        name: 'PFANS1038FormView',
        component: PFANS1038FormView,
      },
      {
        path: '/PFANS1039View',
        name: 'PFANS1039View',
        component: PFANS1039View,
      },
      {
        path: '/PFANS1040View',
        name: 'PFANS1040View',
        component: PFANS1040View,
      },
      {
        path: '/PFANS1041View',
        name: 'PFANS1041View',
        component: PFANS1041View,
      },
      {
        path: '/PFANS1042View',
        name: 'PFANS1042View',
        component: PFANS1042View,
      },
      {
        path: '/PFANS1043View',
        name: 'PFANS1043View',
        component: PFANS1043View,
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
        path: '/PFANS2007FormView',
        name: 'PFANS2007FormView',
        component: PFANS2007FormView,
      },
      {
        path: '/PFANS2009View',
        name: 'PFANS2009View',
        component: PFANS2009View,
      },
      {
        path: '/PFANS2010View',
        name: 'PFANS2010View',
        component: PFANS2010View,
      },
      {
        path: '/PFANS2010FormView',
        name: 'PFANS2010FormView',
        component: PFANS2010FormView,
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
        path: '/PFANS2017FormView',
        name: 'PFANS2017FormView',
        component: PFANS2017FormView
      },
      {
        path: '/PFANS2029View',
        name: 'PFANS2029View',
        component: PFANS2029View
      },
      {
        path: '/PFANS2029FormView',
        name: 'PFANS2029FormView',
        component: PFANS2029FormView
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
        path: '/PFANS2027View',
        name: 'PFANS2027View',
        component: PFANS2027View
      },
      {
        path: '/PFANS2027FormView',
        name: 'PFANS2027FormView',
        component: PFANS2027FormView
      },
      {
        path: '/PFANS2028View',
        name: 'PFANS2028View',
        component: PFANS2028View,
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
        path: '/PFANS5002View',
        name: 'PFANS5002View',
        component: PFANS5002View
      },
      {
        path: '/PFANS5002FormView',
        name: 'PFANS5002FormView',
        component: PFANS5002FormView
      },
      {
        path: '/PFANS5004View',
        name: 'PFANS5004View',
        component: PFANS5004View
      },
      {
        path: '/PFANS5004FormView',
        name: 'PFANS5004FormView',
        component: PFANS5004FormView
      },
      {
        path: '/PFANS5005View',
        name: 'PFANS5005View',
        component: PFANS5005View
      },
      {
        path: '/PFANS5005FormView',
        name: 'PFANS5005FormView',
        component: PFANS5005FormView
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
        path: '/PFANS5009View',
        name: 'PFANS5009View',
        component: PFANS5009View
      },
      {
        path: '/PFANS5009FormView',
        name: 'PFANS5009FormView',
        component: PFANS5009FormView
      },
      {
        path: '/PFANS5011View',
        name: 'PFANS5011View',
        component: PFANS5011View
      },
      {
        path: '/PFANS5011FormView',
        name: 'PFANS5011FormView',
        component: PFANS5011FormView
      },
      {
        path: '/PFANS5012View',
        name: 'PFANS5012View',
        component: PFANS5012View
      },
      {
        path: '/PFANS5012FormView',
        name: 'PFANS5012FormView',
        component: PFANS5012FormView
      },
      {
        path: '/PFANS5013View',
        name: 'PFANS5013View',
        component: PFANS5013View
      },
      {
        path: '/PFANS5013FormView',
        name: 'PFANS5013FormView',
        component: PFANS5013FormView
      },
      {
        path: '/PFANS5014View',
        name: 'PFANS5014View',
        component: PFANS5014View
      },
      {
        path: '/PFANS5014FormView',
        name: 'PFANS5014FormView',
        component: PFANS5014FormView
      },
      {
        path: '/PFANS6001View',
        name: 'PFANS6001View',
        component: PFANS6001View
      },
      {
        path: '/PFANS6001FormView',
        name: 'PFANS6001FormView',
        component: PFANS6001FormView
      },
      {
        path: '/PFANS6002View',
        name: 'PFANS6002View',
        component: PFANS6002View
      },
      {
        path: '/PFANS6002FormView',
        name: 'PFANS6002FormView',
        component: PFANS6002FormView
      },
      {
        path: '/PFANS6003View',
        name: 'PFANS6003View',
        component: PFANS6003View
      },
      {
        path: '/PFANS6003FormView',
        name: 'PFANS6003FormView',
        component: PFANS6003FormView
      },
      {
        path: '/PFANS6004View',
        name: 'PFANS6004View',
        component: PFANS6004View
      },
      {
        path: '/PFANS6004FormView',
        name: 'PFANS6004FormView',
        component: PFANS6004FormView
      },
      {
        path: '/PFANS6005View',
        name: 'PFANS6005View',
        component: PFANS6005View
      },
      {
        path: '/PFANS6005FormView',
        name: 'PFANS6005FormView',
        component: PFANS6005FormView
      },
      {
        path: '/PFANS6006View',
        name: 'PFANS6006View',
        component: PFANS6006View
      },
      {
        path: '/PFANS6007View',
        name: 'PFANS6007View',
        component: PFANS6007View
      },
      {
        path: '/PFANS6007FormView',
        name: 'PFANS6007FormView',
        component: PFANS6007FormView
      },
      {
        path: '/PFANS6008View',
        name: 'PFANS6008View',
        component: PFANS6008View
      },
      {
        path: '/PFANS6009View',
        name: 'PFANS6009View',
        component: PFANS6009View
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
        path: '/PFANS8003FormView',
        name: 'PFANS8003FormView',
        component: PFANS8003FormView
      },{
        path: '/PFANS8003View',
        name: 'PFANS8003View',
        component: PFANS8003View
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
      {
        path: '/PFANS8009PointView',
        name: 'PFANS8009PointView',
        component: PFANS8009View,
      },
      {
        path: '/PFANS8009View',
        name: 'PFANS8009View',
        component: PFANS8009PointView,
      },
      {
        path: '/PFANS8009FormView',
        name: 'PFANS8009FormView',
        component: PFANS8009FormView,
      },
      {
        path: '/ASSETS1001View',
        name: 'ASSETS1001View',
        component: ASSETS1001View,
      },
      {
        path: '/ASSETS1001FormView',
        name: 'ASSETS1001FormView',
        component: ASSETS1001FormView,
      },
      {
        path: '/ASSETS1002View',
        name: 'ASSETS1002View',
        component: ASSETS1002View,
      },
      {
        path: '/ASSETS1002FormView',
        name: 'ASSETS1002FormView',
        component: ASSETS1002FormView,
      },
      {
        path: '/ASSETS1002ExportFormView',
        name: 'ASSETS1002ExportFormView',
        component: ASSETS1002ExportFormView,
      },
      {
        path: '/ASSETS1003View',
        name: 'ASSETS1003View',
        component: ASSETS1003View,
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
  else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
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
