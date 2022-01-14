import {getPurchase,getPurchaseOne,updatePurchase,createPurchase,downLoad,getPurchaseList,getworkfolwPurchaseData,change,purchdelete,getPurchaseSearch} from './PFANS3005Api'
import {getOffshoreSearch} from "../../PFANS1000/PFANS1011/PFANS1011Api";


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

    // region  add  ml  220112  检索  from
    getPurchaseSearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getPurchaseSearch(data).then(response => {
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
    //endregion  add  ml  220112  检索  to
  }
};

export default PFANS3005Store;
