import {getRouting, getRoutingOne, updateRouting, createRouting} from './PFANS1016Api'

const PFANS1016Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getRouting() {
      return new Promise((resolve, reject) => {
        getRouting().then(response => {
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

    getRoutingOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getRoutingOne(data).then(response => {
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

    updateRouting({commit}, data) {
      return new Promise((resolve, reject) => {
        updateRouting(data).then(response => {
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

    createRouting({commit}, data) {
      return new Promise((resolve, reject) => {
        createRouting(data).then(response => {
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

export default PFANS1016Store;
