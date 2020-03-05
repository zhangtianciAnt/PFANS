import {
  get,
  one,
  update,
  generateJxls
} from './PFANS1029Api'
import {downLoad} from '../PFANS1027/PFANS1027Api';

const PFANS1029Store = {
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
    generateJxls({commit}, data) {
      return new Promise((resolve, reject) => {
        generateJxls(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
}
export default PFANS1029Store;
