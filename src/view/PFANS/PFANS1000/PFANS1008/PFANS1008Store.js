import {
  getSoftwaretransfer,
  selectById,
  updateSoftwaretransfer,
  insert,
} from './PFANS1008Api'

const PFANS1008Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getSoftwaretransfer({commit}, data) {
      return new Promise((resolve, reject) => {
        getSoftwaretransfer(data).then(response => {
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
    selectById({ commit },data) {
      return new Promise((resolve, reject) => {
        selectById(data).then(response => {
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
    updateSoftwaretransfer({ commit },data) {
      return new Promise((resolve, reject) => {
        updateSoftwaretransfer(data).then(response => {
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
    insert({ commit },data) {
      return new Promise((resolve, reject) => {
        insert(data).then(response => {
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
}

export default PFANS1008Store;
