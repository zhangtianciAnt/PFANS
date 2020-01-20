import {createvariousfundsApply, getvariousfunds, getvariousfundsApplyOne, updatevariousfundsApply,getFpans5001List,getexpatriatesinfor,} from './PFANS6007Api'
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
    getFpans5001List({commit}, data) {
      return new Promise((resolve, reject) => {
        getFpans5001List(data).then(response => {
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
    getexpatriatesinfor() {
      return new Promise((resolve, reject) => {
        getexpatriatesinfor().then(response => {
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

export default PFANS6007Store;
