import {
  getglobal,
  getglobalApplyOne,
  updateglobalApply,
  createglobalApply,
  getglobalApplyList
} from './PFANS1018Api'

const PFANS1018Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getglobal() {
      return new Promise((resolve, reject) => {
        getglobal().then(response => {
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
    getglobalApplyOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getglobalApplyOne(data).then(response => {
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
    updateglobalApply({ commit },data) {
      return new Promise((resolve, reject) => {
        updateglobalApply(data).then(response => {
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
    createglobalApply({ commit },data) {
      return new Promise((resolve, reject) => {
        createglobalApply(data).then(response => {
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

export default PFANS1018Store;
