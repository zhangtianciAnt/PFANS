import {
  updateDeleginformation, getYears
} from './PFANS6006Api'


const PFANS6006Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getYears({commit}, data) {
      return new Promise((resolve, reject) => {
        getYears(data).then(response => {
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
    updateDeleginformation({commit}, data) {
      return new Promise((resolve, reject) => {
        updateDeleginformation(data).then(response => {
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

export default PFANS6006Store;
