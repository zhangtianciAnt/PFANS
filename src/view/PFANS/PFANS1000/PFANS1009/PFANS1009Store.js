import {
  getFixedassets,
  getFixedassetsOne,
  updateFixedassets,
  createFixedassets,
  getAssetsnameList,
  downLoad
} from './PFANS1009Api'

const PFANS1009Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getFixedassets() {
      return new Promise((resolve, reject) => {
        getFixedassets().then(response => {
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

    getFixedassetsOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getFixedassetsOne(data).then(response => {
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

    updateFixedassets({commit}, data) {
      return new Promise((resolve, reject) => {
        updateFixedassets(data).then(response => {
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

    createFixedassets({commit}, data) {
      return new Promise((resolve, reject) => {
        createFixedassets(data).then(response => {
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

    getAssetsnameList({commit}, data) {
      return new Promise((resolve, reject) => {
        getAssetsnameList(data).then(response => {
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
    downLoad({commit}, data) {
      return new Promise((resolve, reject) => {
        downLoad(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
};

export default PFANS1009Store;
