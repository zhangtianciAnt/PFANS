import {
  getAllIrregulartiming,
  getIrregulartimingOne,
  updateIrregulartiming,
  insertIrregulartiming,
} from './PFANS2020Api'

const PFANS2020Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    updateIrregulartiming({commit}, data) {
      return new Promise((resolve, reject) => {
        updateIrregulartiming(data).then(response => {
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
    getIrregulartimingOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getIrregulartimingOne(data).then(response => {
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
    getAllIrregulartiming() {
      return new Promise((resolve, reject) => {
        getAllIrregulartiming().then(response => {
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
    insertIrregulartiming({commit}, data) {
      return new Promise((resolve, reject) => {
        insertIrregulartiming(data).then(response => {
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
export default PFANS2020Store;









