import {getPurchase,getPurchaseOne,updatePurchase,createPurchase,downLoad,getPurchaseList,getworkfolwPurchaseData,change,purchdelete} from './PFANS3005Api'


const PFANS3005Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    change({commit}, data) {
      return new Promise((resolve, reject) => {
        change(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
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

    //region scc add 购买决裁删除 from
    purchdelete({commit}, data) {
      return new Promise((resolve, reject) => {
        purchdelete(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //endregion scc add 购买决裁删除 to

  }
};

export default PFANS3005Store;
