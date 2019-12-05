import {getTrialsoft, getTrialsoftOne, updateTrialsoft, createTrialsoft} from './PFANS1019Api'

const PFANS1019Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getTrialsoft() {
      return new Promise((resolve, reject) => {
        getTrialsoft().then(response => {
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

    getTrialsoftOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getTrialsoftOne(data).then(response => {
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

    updateTrialsoft({commit}, data) {
      return new Promise((resolve, reject) => {
        updateTrialsoft(data).then(response => {
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

    createTrialsoft({commit}, data) {
      return new Promise((resolve, reject) => {
        createTrialsoft(data).then(response => {
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

export default PFANS1019Store;
