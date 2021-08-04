import {
  get,
  one,
  update,
  downLoad
} from './PFANS1031Api'

const PFANS1031Store = {
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
    one({commit}, data) {
      return new Promise((resolve, reject) => {
        one(data).then(response => {
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

    downLoad({commit}, data) {
      return new Promise((resolve, reject) => {
        downLoad(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
}
export default PFANS1031Store;
