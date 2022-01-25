import {downLoad, get, getPetSearch, one, update,} from './PFANS1032Api'

const PFANS1032Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 添加筛选条件 ztc fr
    get({commit},data) {
      return new Promise((resolve, reject) => {
        get(data).then(response => {
          // 添加筛选条件 ztc to
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
    downLoad({commit}, data) {
      return new Promise((resolve, reject) => {
        downLoad(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    getPetSearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getPetSearch(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

  }
};
export default PFANS1032Store;









