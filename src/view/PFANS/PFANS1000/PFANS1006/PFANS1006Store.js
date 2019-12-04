import {getLoanapplication, getLoanapplicationOne, updateLoanapplication, createLoanapplication} from './PFANS1006Api'

const PFANS1006Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getLoanapplication() {
      return new Promise((resolve, reject) => {
        getLoanapplication().then(response => {
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

    getLoanapplicationOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getLoanapplicationOne(data).then(response => {
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

    updateLoanapplication({commit}, data) {
      return new Promise((resolve, reject) => {
        updateLoanapplication(data).then(response => {
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

    createLoanapplication({commit}, data) {
      return new Promise((resolve, reject) => {
        createLoanapplication(data).then(response => {
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

export default PFANS1006Store;
