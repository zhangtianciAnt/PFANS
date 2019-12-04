import {createStationery, getStationery, getStationeryOne, updateStationery} from './PFANS3004Api'

const PFANS3004Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getStationery() {
      return new Promise((resolve, reject) => {
        getStationery().then(response => {
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
    getStationeryOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getStationeryOne(data).then(response => {
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
    updateStationery({commit}, data) {
      return new Promise((resolve, reject) => {
        updateStationery(data).then(response => {
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
    createStationery({commit}, data) {
      return new Promise((resolve, reject) => {
        createStationery(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default PFANS3004Store;
