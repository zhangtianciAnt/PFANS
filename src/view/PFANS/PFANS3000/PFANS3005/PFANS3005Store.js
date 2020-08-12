import {getPurchase,getPurchaseOne,updatePurchase,createPurchase,downLoad,getPurchaseList,getworkfolwPurchaseData} from './PFANS3005Api'


const PFANS3005Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    downLoad({commit}, data) {
      return new Promise((resolve, reject) => {
        downLoad(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    getPurchase() {
      return new Promise((resolve, reject) => {
        getPurchase().then(response => {
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
    getPurchaseList() {
      return new Promise((resolve, reject) => {
        getPurchaseList().then(response => {
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
    getPurchaseOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getPurchaseOne(data).then(response => {
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
    updatePurchase({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePurchase(data).then(response => {
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
    createPurchase({commit}, data) {
      return new Promise((resolve, reject) => {
        createPurchase(data).then(response => {
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
    //采购业务数据流程查看详情
    getworkfolwPurchaseData({commit}, data) {
      return new Promise((resolve, reject) => {
        getworkfolwPurchaseData(data).then(response => {
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
    //采购业务数据流程查看详情
  }
};

export default PFANS3005Store;
