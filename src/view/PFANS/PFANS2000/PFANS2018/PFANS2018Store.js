import {createPfans2018, getFpans2018List, updatePfans2018,getPfans2018One} from './PFANS2018Api'

const PFANS2018Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    createPfans2018({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans2018(data).then(response => {
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

    updatePfans2018({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans2018(data).then(response => {
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

    getFpans2018List({commit}) {
      return new Promise((resolve, reject) => {
        getFpans2018List().then(response => {
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

    getPfans2018One({ commit },data) {
      return new Promise((resolve, reject) => {
        getPfans2018One(data).then(response => {
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

export default PFANS2018Store;
