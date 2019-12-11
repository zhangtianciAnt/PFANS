import {createBusiness, getBusiness, selectById, updateBusiness} from './PFANS1002Api'

const PFANS1002Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getBusiness() {
      return new Promise((resolve, reject) => {
        getBusiness().then(response => {
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
    selectById({commit}, data) {
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
    updateBusiness({commit}, data) {
      return new Promise((resolve, reject) => {
        updateBusiness(data).then(response => {
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
    createBusiness({commit}, data) {
      return new Promise((resolve, reject) => {
        createBusiness(data).then(response => {
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

export default PFANS1002Store;
