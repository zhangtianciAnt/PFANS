import {
  getexpatriatesinfor,
  getexpatriatesinforApplyOne,
  updateexpatriatesinforApply,
  createexpatriatesinforApply,
} from './PFANS6004Api'

const PFANS6004Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
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
    getexpatriatesinforApplyOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getexpatriatesinforApplyOne(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
          exitreason
        }).catch(error => {
          reject(error);
        })
      })
    },
    updateexpatriatesinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        updateexpatriatesinforApply(data).then(response => {
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
    createexpatriatesinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        createexpatriatesinforApply(data).then(response => {
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

export default PFANS6004Store;
