import {getCostList, insertCoststatistics, downloadExcel,getCostBygroupid} from './PFANS6008Api'
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
    insertCoststatistics() {
      return new Promise((resolve, reject) => {
        insertCoststatistics().then(response => {
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
  }
};

export default PFANS6008Store;
