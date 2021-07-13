import {
  getTableinfo,
} from './PFANS6011Api'

const PFANS6011Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getTableinfo({commit}, data) {
      return new Promise((resolve, reject) => {
        getTableinfo().then(response => {
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

export default PFANS6011Store;
