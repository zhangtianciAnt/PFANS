import {getCostList, getWorktimes, getWorkers} from './PFANS6009Api'
const PFANS6009Store = {
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
    },
    getWorktimes() {
      return new Promise((resolve, reject) => {
        getWorktimes().then(response => {
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
    getWorkers() {
      return new Promise((resolve, reject) => {
        getWorkers().then(response => {
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

export default PFANS6009Store;
