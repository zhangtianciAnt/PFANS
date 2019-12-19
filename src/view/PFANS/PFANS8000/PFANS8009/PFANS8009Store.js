import {  bigList,smallAtbig,insertCodes,updataCodes,deleteCodes } from './PFANS8009Api'

const PFANS8009Store = {
  namespaced: true,
  actions: {

    bigList({ commit },data) {
      return new Promise((resolve, reject) => {
        bigList(data).then(response => {
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

    smallAtbig({commit}, data) {
      return new Promise((resolve, reject) => {
        smallAtbig(data).then(response => {
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
    insertCodes({ commit },data) {
      return new Promise((resolve, reject) => {
        insertCodes(data).then(response => {
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
    updataCodes({ commit },data) {
      return new Promise((resolve, reject) => {
        updataCodes(data).then(response => {
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
    deleteCodes({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteCodes(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default PFANS8009Store;
