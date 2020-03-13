import {
  createDeleginformation,getDelegainformation
} from './PFANS6006Api'

const PFANS6006Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getDelegainformation() {
      return new Promise((resolve, reject) => {
        getDelegainformation().then(response => {
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
    createDeleginformation({commit}, data) {
      return new Promise((resolve, reject) => {
        createDeleginformation(data).then(response => {
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
