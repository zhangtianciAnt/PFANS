import {getOffshore, getOffshoreOne, updateOffshore, createOffshore} from './PFANS1011Api'

const PFANS1011Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getOffshore() {
      return new Promise((resolve, reject) => {
        getOffshore().then(response => {
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

    getOffshoreOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getOffshoreOne(data).then(response => {
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

    updateOffshore({commit}, data) {
      return new Promise((resolve, reject) => {
        updateOffshore(data).then(response => {
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

    createOffshore({commit}, data) {
      return new Promise((resolve, reject) => {
        createOffshore(data).then(response => {
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
