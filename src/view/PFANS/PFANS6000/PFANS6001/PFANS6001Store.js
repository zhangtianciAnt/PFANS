import {
  getcooperinterview,
  getcooperinterviewApplyOne,
  updatecooperinterviewApply,
  createcooperinterviewApply,
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
        cooperinterviewApplyOne(data).then(response => {
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
  }
};

export default PFANS6001Store;
