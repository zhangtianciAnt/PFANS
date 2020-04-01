import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import frameStore from '../view/frame/frameStore'
import indexStore from '../view/index/indexStore'
import global from './global'
import orgTreeStore from '../view/orgTree/orgTreeStore'
import registerStore from '../components/EasyRegister/registerStore'
import usersStore from '../view/users/usersStore'
import roleStore from '../view/role/roleStore'
import personalCenterStore from '../view/personalCenter/personalCenterStore'
import tableStore from '../components/EasyNormalTable/tableStore'
import EasyWorkflowStore from '../components/EasyWorkFlow/EasyWorkflowStore'
import workflowStore from '../view/workflow/workflowStore'
import dictionaryStore from '../view/dictionary/dictionaryStore'
import PFANS1001Store from '../view/PFANS/PFANS1000/PFANS1001/PFANS1001Store'
import PFANS1002Store from '../view/PFANS/PFANS1000/PFANS1002/PFANS1002Store'
import PFANS1035Store from '../view/PFANS/PFANS1000/PFANS1035/PFANS1035Store'
import PFANS1003Store from '../view/PFANS/PFANS1000/PFANS1003/PFANS1003Store'
import PFANS1004Store from '../view/PFANS/PFANS1000/PFANS1004/PFANS1004Store'
import PFANS1005Store from '../view/PFANS/PFANS1000/PFANS1005/PFANS1005Store'
import PFANS1006Store from '../view/PFANS/PFANS1000/PFANS1006/PFANS1006Store'
import PFANS1007Store from '../view/PFANS/PFANS1000/PFANS1007/PFANS1007Store'
import PFANS1008Store from '../view/PFANS/PFANS1000/PFANS1008/PFANS1008Store'
import PFANS1009Store from '../view/PFANS/PFANS1000/PFANS1009/PFANS1009Store'
import PFANS1010Store from '../view/PFANS/PFANS1000/PFANS1010/PFANS1010Store'
import PFANS1011Store from '../view/PFANS/PFANS1000/PFANS1011/PFANS1011Store'
import PFANS1012Store from '../view/PFANS/PFANS1000/PFANS1012/PFANS1012Store'
import PFANS1013Store from '../view/PFANS/PFANS1000/PFANS1013/PFANS1013Store'
import PFANS1016Store from '../view/PFANS/PFANS1000/PFANS1016/PFANS1016Store'
import PFANS1017Store from '../view/PFANS/PFANS1000/PFANS1017/PFANS1017Store'
import PFANS1018Store from '../view/PFANS/PFANS1000/PFANS1018/PFANS1018Store'
import PFANS1019Store from '../view/PFANS/PFANS1000/PFANS1019/PFANS1019Store'
import PFANS1020Store from '../view/PFANS/PFANS1000/PFANS1020/PFANS1020Store'
import PFANS1021Store from '../view/PFANS/PFANS1000/PFANS1021/PFANS1021Store'
import PFANS1022Store from '../view/PFANS/PFANS1000/PFANS1022/PFANS1022Store'
import PFANS1023Store from '../view/PFANS/PFANS1000/PFANS1023/PFANS1023Store'
import PFANS1025Store from '../view/PFANS/PFANS1000/PFANS1025/PFANS1025Store'
import PFANS1026Store from '../view/PFANS/PFANS1000/PFANS1026/PFANS1026Store'
import PFANS1027Store from '../view/PFANS/PFANS1000/PFANS1027/PFANS1027Store'
import PFANS1028Store from '../view/PFANS/PFANS1000/PFANS1028/PFANS1028Store'
import PFANS1029Store from '../view/PFANS/PFANS1000/PFANS1029/PFANS1029Store'
import PFANS1031Store from '../view/PFANS/PFANS1000/PFANS1031/PFANS1031Store'
import PFANS1032Store from '../view/PFANS/PFANS1000/PFANS1032/PFANS1032Store'
import PFANS1034Store from '../view/PFANS/PFANS1000/PFANS1034/PFANS1034Store'
import PFANS1036Store from '../view/PFANS/PFANS1000/PFANS1036/PFANS1036Store'
import PFANS1037Store from '../view/PFANS/PFANS1000/PFANS1037/PFANS1037Store'
import PFANS1038Store from '../view/PFANS/PFANS1000/PFANS1038/PFANS1038Store'
import PFANS1040Store from '../view/PFANS/PFANS1000/PFANS1040/PFANS1040Store'
import PFANS1042Store from '../view/PFANS/PFANS1000/PFANS1042/PFANS1042Store'
import PFANS1043Store from '../view/PFANS/PFANS1000/PFANS1043/PFANS1043Store'
import PFANS2001Store from '../view/PFANS/PFANS2000/PFANS2001/PFANS2001Store'
import PFANS2002Store from '../view/PFANS/PFANS2000/PFANS2002/PFANS2002Store'
import PFANS2003Store from '../view/PFANS/PFANS2000/PFANS2003/PFANS2003Store'
import PFANS2005Store from '../view/PFANS/PFANS2000/PFANS2005/PFANS2005Store'
import PFANS2006Store from '../view/PFANS/PFANS2000/PFANS2006/PFANS2006Store'
import PFANS2007Store from '../view/PFANS/PFANS2000/PFANS2007/PFANS2007Store'
import PFANS2010Store from '../view/PFANS/PFANS2000/PFANS2010/PFANS2010Store'
import PFANS2011Store from '../view/PFANS/PFANS2000/PFANS2011/PFANS2011Store'
import PFANS2013Store from '../view/PFANS/PFANS2000/PFANS2013/PFANS2013Store'
import PFANS2014Store from '../view/PFANS/PFANS2000/PFANS2014/PFANS2014Store'
import PFANS2016Store from '../view/PFANS/PFANS2000/PFANS2016/PFANS2016Store'
import PFANS2017Store from '../view/PFANS/PFANS2000/PFANS2017/PFANS2017Store'
import PFANS2018Store from '../view/PFANS/PFANS2000/PFANS2018/PFANS2018Store'
import PFANS2020Store from '../view/PFANS/PFANS2000/PFANS2020/PFANS2020Store'
import PFANS2022Store from '../view/PFANS/PFANS2000/PFANS2022/PFANS2022Store'
import PFANS2023Store from '../view/PFANS/PFANS2000/PFANS2023/PFANS2023Store'
import PFANS2024Store from '../view/PFANS/PFANS2000/PFANS2024/PFANS2024Store'
import PFANS2026Store from '../view/PFANS/PFANS2000/PFANS2026/PFANS2026Store'
import PFANS2027Store from '../view/PFANS/PFANS2000/PFANS2027/PFANS2027Store'
import PFANS3001Store from '../view/PFANS/PFANS3000/PFANS3001/PFANS3001Store'
import PFANS3002Store from '../view/PFANS/PFANS3000/PFANS3002/PFANS3002Store'
import PFANS3003Store from '../view/PFANS/PFANS3000/PFANS3003/PFANS3003Store'
import PFANS3004Store from '../view/PFANS/PFANS3000/PFANS3004/PFANS3004Store'
import PFANS3005Store from '../view/PFANS/PFANS3000/PFANS3005/PFANS3005Store'
import PFANS3006Store from '../view/PFANS/PFANS3000/PFANS3006/PFANS3006Store'
import PFANS3007Store from '../view/PFANS/PFANS3000/PFANS3007/PFANS3007Store'
import PFANS4001Store from '../view/PFANS/PFANS4000/PFANS4001/PFANS4001Store'
import PFANS5001Store from '../view/PFANS/PFANS5000/PFANS5001/PFANS5001Store'
//import PFANS5002Store from '../view/PFANS/PFANS5000/PFANS5002/PFANS5002Store'
import PFANS5004Store from '../view/PFANS/PFANS5000/PFANS5004/PFANS5004Store'
import PFANS5009Store from '../view/PFANS/PFANS5000/PFANS5009/PFANS5009Store'
import PFANS5013Store from '../view/PFANS/PFANS5000/PFANS5013/PFANS5013Store'
import PFANS5014Store from '../view/PFANS/PFANS5000/PFANS5014/PFANS5014Store'
import PFANS6001Store from '../view/PFANS/PFANS6000/PFANS6001/PFANS6001Store'
import PFANS6002Store from '../view/PFANS/PFANS6000/PFANS6002/PFANS6002Store'
import PFANS6003Store from '../view/PFANS/PFANS6000/PFANS6003/PFANS6003Store'
import PFANS6004Store from '../view/PFANS/PFANS6000/PFANS6004/PFANS6004Store'
import PFANS6005Store from '../view/PFANS/PFANS6000/PFANS6005/PFANS6005Store'
import PFANS6006Store from '../view/PFANS/PFANS6000/PFANS6006/PFANS6006Store'
import PFANS6007Store from '../view/PFANS/PFANS6000/PFANS6007/PFANS6007Store'
import PFANS6008Store from '../view/PFANS/PFANS6000/PFANS6008/PFANS6008Store'
import PFANS6009Store from '../view/PFANS/PFANS6000/PFANS6009/PFANS6009Store'
import PFANS5008Store from '../view/PFANS/PFANS5000/PFANS5008/PFANS5008Store'
import PFANS8001Store from '../view/PFANS/PFANS8000/PFANS8001/PFANS8001Store'
import PFANS8007Store from '../view/PFANS/PFANS8000/PFANS8007/PFANS8007Store'
import PFANS8008Store from '../view/PFANS/PFANS8000/PFANS8008/PFANS8008Store'
import PFANS8009Store from '../view/PFANS/PFANS8000/PFANS8009/PFANS8009Store'
import ASSETS1001Store from '../view/ASSETS/ASSETS1000/ASSETS1001/ASSETS1001Store';
import ASSETS1002Store from '../view/ASSETS/ASSETS1000/ASSETS1002/ASSETS1002Store';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    global,
    frameStore,
    orgTreeStore,
    registerStore,
    usersStore,
    roleStore,
    personalCenterStore,
    tableStore,
    EasyWorkflowStore,
    workflowStore,
    dictionaryStore,
    indexStore,
    PFANS1001Store,
    PFANS1002Store,
    PFANS1035Store,
    PFANS1003Store,
    PFANS1004Store,
    PFANS1005Store,
    PFANS1006Store,
    PFANS1007Store,
    PFANS1008Store,
    PFANS1009Store,
    PFANS1010Store,
    PFANS1011Store,
    PFANS1012Store,
    PFANS1013Store,
    PFANS1016Store,
    PFANS1017Store,
    PFANS1018Store,
    PFANS1019Store,
    PFANS1020Store,
    PFANS1021Store,
    PFANS1022Store,
    PFANS1023Store,
    PFANS1025Store,
    PFANS1026Store,
    PFANS1027Store,
    PFANS1028Store,
    PFANS1029Store,
    PFANS1031Store,
    PFANS1032Store,
    PFANS1034Store,
    PFANS1036Store,
    PFANS1037Store,
    PFANS1038Store,
    PFANS1040Store,
    PFANS1042Store,
    PFANS1043Store,
    PFANS2001Store,
    PFANS2002Store,
    PFANS2003Store,
    PFANS2005Store,
    PFANS2006Store,
    PFANS2007Store,
    PFANS2010Store,
    PFANS2011Store,
    PFANS2013Store,
    PFANS2014Store,
    PFANS2016Store,
    PFANS2017Store,
    PFANS2018Store,
    PFANS2020Store,
    PFANS2022Store,
    PFANS2023Store,
    PFANS2024Store,
    PFANS2026Store,
    PFANS2027Store,
    PFANS3001Store,
    PFANS3002Store,
    PFANS3003Store,
    PFANS3004Store,
    PFANS3005Store,
    PFANS3006Store,
    PFANS3007Store,
    PFANS4001Store,
    PFANS5001Store,
    //PFANS5002Store,
    PFANS5004Store,
    PFANS5008Store,
    PFANS5009Store,
    PFANS5013Store,
    PFANS5014Store,
    PFANS6001Store,
    PFANS6002Store,
    PFANS6003Store,
    PFANS6004Store,
    PFANS6005Store,
    PFANS6006Store,
    PFANS6007Store,
    PFANS6008Store,
    PFANS6009Store,
    PFANS8001Store,
    PFANS8007Store,
    PFANS8008Store,
    PFANS8009Store,
    ASSETS1001Store,
    ASSETS1002Store,
  },
  getters
});

export default store
