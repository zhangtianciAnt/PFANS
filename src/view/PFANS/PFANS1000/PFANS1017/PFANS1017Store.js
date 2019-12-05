import {getPsdcd, getPsdcdOne, updatePsdcd, createPsdcd} from './PFANS1017Api'

const PFANS1017Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getPsdcd() {
      return new Promise((resolve, reject) => {
        getPsdcd().then(response => {
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

    getPsdcdOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getPsdcdOne(data).then(response => {
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

    updatePsdcd({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePsdcd(data).then(response => {
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

    createPsdcd({commit}, data) {
      return new Promise((resolve, reject) => {
        createPsdcd(data).then(response => {
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

export default PFANS1017Store;
