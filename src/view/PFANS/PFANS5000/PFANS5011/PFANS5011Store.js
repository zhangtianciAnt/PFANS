import {getFpans5011List,getl} from './PFANS5011Api'


const PFANS5011Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //获取流程
    getFpans5011List({commit},data) {
      return new Promise((resolve, reject) => {
        getFpans5011List(data).then(response => {
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
    getl({ commit },data) {
      return new Promise((resolve, reject) => {
        getl(data).then(response => {
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

export default PFANS5011Store;
