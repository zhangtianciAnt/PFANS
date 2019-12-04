import {createFlexiblework, getFlexiblework, getFlexibleworkOne, updateFlexiblework} from './PFANS2014Api'

const PFANS2014Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getFlexiblework() {
      return new Promise((resolve, reject) => {
        getFlexiblework().then(response => {
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

    getFlexibleworkOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getFlexibleworkOne(data).then(response => {
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

    updateFlexiblework({commit}, data) {
      return new Promise((resolve, reject) => {
        updateFlexiblework(data).then(response => {
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

    createFlexiblework({commit}, data) {
      return new Promise((resolve, reject) => {
        createFlexiblework(data).then(response => {
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

export default PFANS2014Store;
