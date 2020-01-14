import {
  createvariousfundsApply,
  getvariousfunds,
  getvariousfundsApplyOne,
  updatevariousfundsApply,
} from './PFANS6006Api'

const PFANS6006Store = {
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
  }
};

export default PFANS6006Store;
