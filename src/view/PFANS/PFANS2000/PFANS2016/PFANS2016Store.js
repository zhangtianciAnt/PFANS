import {createPfans2016, getFpans2016List, updatePfans2016,getPfans2016One,getOvertimelist,getReplacerest} from './PFANS2016Api'

const PFANS2016Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    createPfans2016({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans2016(data).then(response => {
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

    getOvertimelist({commit},data) {
      return new Promise((resolve, reject) => {
        getOvertimelist(data).then(response => {
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

    updatePfans2016({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans2016(data).then(response => {
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

    getFpans2016List({commit}) {
      return new Promise((resolve, reject) => {
        getFpans2016List().then(response => {
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

    getPfans2016One({ commit },data) {
      return new Promise((resolve, reject) => {
        getPfans2016One(data).then(response => {
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

    getReplacerest({ commit },data) {
      return new Promise((resolve, reject) => {
        getReplacerest(data).then(response => {
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

export default PFANS2016Store;
