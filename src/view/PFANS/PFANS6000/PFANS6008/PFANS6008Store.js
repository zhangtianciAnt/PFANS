import {getCostList} from './PFANS6008Api'
const PFANS6008Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getCostList() {
      return new Promise((resolve, reject) => {
        getCostList().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
};

export default PFANS6008Store;
