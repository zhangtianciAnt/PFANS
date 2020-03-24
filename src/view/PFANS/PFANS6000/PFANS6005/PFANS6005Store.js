import {getpriceset, updatepriceset, getPricesetList} from './PFANS6005Api'

const PFANS6005Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getpriceset({commit}, data) {
      return new Promise((resolve, reject) => {
        getpriceset(data).then(response => {
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
    getPricesetList({commit}, data) {
      return new Promise((resolve, reject) => {
        getPricesetList(data).then(response => {
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
    updatepriceset({commit}, data) {
      return new Promise((resolve, reject) => {
        updatepriceset(data).then(response => {
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

export default PFANS6005Store;
