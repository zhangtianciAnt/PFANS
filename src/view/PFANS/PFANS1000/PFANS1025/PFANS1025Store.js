import {
  get,
  update,
} from './PFANS1025Api'

const PFANS1025Store = {
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

    update({commit}, data) {
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

  }
};

export default PFANS1025Store;
