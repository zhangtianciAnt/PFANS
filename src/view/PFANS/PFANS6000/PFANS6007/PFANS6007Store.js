import {
  createvariousfundsApply,
  getvariousfunds,
  getPjnameList,
  getvariousfundsApplyOne,
  updatevariousfundsApply,
  getexpatriatesinfor,
  getPjnameList6007,
  listPsdcd,
} from './PFANS6007Api'
const PFANS6007Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getvariousfunds() {
      return new Promise((resolve, reject) => {
        getvariousfunds().then(response => {
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
    getPjnameList() {
      return new Promise((resolve, reject) => {
        getPjnameList().then(response => {
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
    getPjnameList6007({commit}, data) {
      return new Promise((resolve, reject) => {
        getPjnameList6007(data).then(response => {
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
    listPsdcd({commit}, data) {
      return new Promise((resolve, reject) => {
        listPsdcd(data).then(response => {
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
    getvariousfundsApplyOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getvariousfundsApplyOne(data).then(response => {
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
    updatevariousfundsApply({commit}, data) {
      return new Promise((resolve, reject) => {
        updatevariousfundsApply(data).then(response => {
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
    createvariousfundsApply({commit}, data) {
      return new Promise((resolve, reject) => {
        createvariousfundsApply(data).then(response => {
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
    // getexpatriatesinfor() {
    //   return new Promise((resolve, reject) => {
    //     getexpatriatesinfor().then(response => {
    //       if (response.code === 0) {
    //         resolve(response.data);
    //       } else {
    //         reject(response.message)
    //       }
    //     }).catch(error => {
    //       reject(error);
    //     })
    //   })
    // },
  }
};

export default PFANS6007Store;
