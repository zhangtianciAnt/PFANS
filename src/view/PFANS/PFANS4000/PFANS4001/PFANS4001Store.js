import {createPfans4001, getFpans4001List, updatePfans4001,getPfans4001One} from './PFANS4001Api'

const PFANS4001store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    createPfans4001({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans4001(data).then(response => {
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



    updatePfans4001({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans4001(data).then(response => {
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

    getFpans4001List({commit}) {
      return new Promise((resolve, reject) => {
        getFpans4001List().then(response => {
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

    getPfans4001One({ commit },data) {
      return new Promise((resolve, reject) => {
        getPfans4001One(data).then(response => {
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

export default PFANS4001store;
