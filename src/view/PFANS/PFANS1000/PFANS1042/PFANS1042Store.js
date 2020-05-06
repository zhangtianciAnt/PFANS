import {
  getPltab,
  selectPlmoney
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
    //add-ws-5/6-添加按份金额
    selectPlmoney({commit}, data) {
      return new Promise((resolve, reject) => {
        selectPlmoney(data).then(response => {
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
    //add-ws-5/6-添加按份金额
  }
};
export default PFANS1042Store;
