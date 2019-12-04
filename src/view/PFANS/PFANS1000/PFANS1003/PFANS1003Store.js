import {
  getJudgement,
  getJudgementOne,
  updateJudgement,
  createJudgement,
} from './PFANS1003Api'

const PFANS1003Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getJudgement() {
      return new Promise((resolve, reject) => {
        getJudgement().then(response => {
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
    getJudgementOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getJudgementOne(data).then(response => {
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
    updateJudgement({ commit },data) {
      return new Promise((resolve, reject) => {
        updateJudgement(data).then(response => {
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
    createJudgement({ commit },data) {
      return new Promise((resolve, reject) => {
        createJudgement(data).then(response => {
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

export default PFANS1003Store;
