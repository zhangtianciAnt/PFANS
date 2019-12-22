import {
  createcustomerinforApply,
  getcustomerinfor,
  getcustomerinforApplyOne,
  updatecustomerinforApply,
} from './PFANS6002Api'

const PFANS6002Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getcustomerinfor() {
      return new Promise((resolve, reject) => {
        getcustomerinfor().then(response => {
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
    getcustomerinforApplyOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getcustomerinforApplyOne(data).then(response => {
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
    updatecustomerinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        updatecustomerinforApply(data).then(response => {
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
    createcustomerinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        createcustomerinforApply(data).then(response => {
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

export default PFANS6002Store;
