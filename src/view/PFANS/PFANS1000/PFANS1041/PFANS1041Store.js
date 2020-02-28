import {get} from '../PFANS1039/PFANS1039Api';

const PFANS1041Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    //获取列表
    get({commit}, data) {
      return new Promise((resolve, reject) => {
        get(data).then(response => {
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
}

export default PFANS1041Store;
