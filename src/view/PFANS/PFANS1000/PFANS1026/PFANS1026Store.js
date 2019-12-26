import {
  get,
  selectById,
  update,
  insert,
  } from './PFANS1026Api'

  const PFANS1026Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      get() {
        return new Promise((resolve, reject) => {
          get().then(response => {
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
      update({ commit },data) {
        return new Promise((resolve, reject) => {
          update(data).then(response => {
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
      insert({ commit },data) {
        return new Promise((resolve, reject) => {
          insert(data).then(response => {
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

  export default PFANS1026Store;
