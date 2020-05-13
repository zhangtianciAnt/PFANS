import {getPurchase,getPurchaseOne,updatePurchase,createPurchase,getPurchaseList} from './PFANS3005Api'

const PFANS3005Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
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
  }
};

export default PFANS3005Store;
