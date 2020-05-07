import {
  getPltab,
  insert
} from './PFANS1042Api'



const PFANS1042Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getPltab({commit}, data) {
      return new Promise((resolve, reject) => {
        getPltab(data).then(response => {
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
export default PFANS1042Store;
