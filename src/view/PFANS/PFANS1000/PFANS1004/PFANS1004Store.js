import {
  getJudgement,
  getJudgementOne,
  updateJudgement,
  createJudgement,
} from './PFANS1004Api'

const PFANS1004Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getJudgement({commit}, data) {
      return new Promise((resolve, reject) => {
        getJudgement(data).then(response => {
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

export default PFANS1004Store;
