import {
  getDataList
} from './PFANS2013Api'

const PFANS2013Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    //获取列表
    getDataList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getDataList(data).then(response => {
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
}

export default PFANS2013Store;
