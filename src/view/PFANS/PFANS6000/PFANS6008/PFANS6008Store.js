import {getCostList, insertCoststatistics, downloadExcel,getCostBygroupid,getcostMonthList,getcostMonth} from './PFANS6008Api'
const PFANS6008Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getCostList() {
      return new Promise((resolve, reject) => {
        getCostList().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    insertCoststatistics({commit}, data) {
      return new Promise((resolve, reject) => {
        insertCoststatistics(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    downloadExcel({commit}, data) {
      return new Promise((resolve, reject) => {
        downloadExcel(data).then(response => {
          if ( response.type.indexOf("json") == -1 ) {
            resolve(response)
          } else {
            reject(response.message)
          }
          // if (response.code === 0) {
          //   resolve(response.data);
          // } else {
          //   reject(response.message)
          // }
        }).catch(error => {
          reject(error);
        })
      })
    },
    getCostBygroupid({commit}, data) {
      return new Promise((resolve, reject) => {
        getCostBygroupid(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    //add gbb 0803 月度费用统计列表 start
    getcostMonthList({commit}, data) {
      return new Promise((resolve, reject) => {
        getcostMonthList(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    //add gbb 0803 月度费用统计列表 end

    //add gbb 0803 月度费用统计详情 start
    getcostMonth({commit}, data) {
      return new Promise((resolve, reject) => {
        getcostMonth(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    //add gbb 0803 月度费用统计详情 end
  }
};

export default PFANS6008Store;
