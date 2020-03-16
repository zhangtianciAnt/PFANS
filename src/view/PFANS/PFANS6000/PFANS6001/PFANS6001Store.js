import {
  getcooperinterview,
  getcooperinterviewApplyOne,
  updateinfor,
  createcooperinterviewApply,
  getSupplierNameList
} from './PFANS6001Api'

const PFANS6001Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getcooperinterview() {
      return new Promise((resolve, reject) => {
        getcooperinterview().then(response => {
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
    getcooperinterviewApplyOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getcooperinterviewApplyOne(data).then(response => {
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
    updatecooperinterviewApply({commit}, data) {
      return new Promise((resolve, reject) => {
        updatecooperinterviewApply(data).then(response => {
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
    updateinfor({commit}, data) {
      return new Promise((resolve, reject) => {
        updateinfor(data).then(response => {
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
    createcooperinterviewApply({commit}, data) {
      return new Promise((resolve, reject) => {
        createcooperinterviewApply(data).then(response => {
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
    getSupplierNameList({commit}, data) {
      return new Promise((resolve, reject) => {
        getSupplierNameList(data).then(response => {
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

export default PFANS6001Store;
