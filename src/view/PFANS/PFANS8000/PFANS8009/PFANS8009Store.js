import {  upDictionary,getDictionary } from './PFANS8009Api'

const PFANS8009Store = {
  namespaced: true,
  actions: {

    getDictionary({ commit },data) {
      return new Promise((resolve, reject) => {
        getDictionary(data).then(response => {
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
    upDictionary({ commit },data) {
      return new Promise((resolve, reject) => {
        upDictionary(data).then(response => {
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

export default PFANS8009Store;
