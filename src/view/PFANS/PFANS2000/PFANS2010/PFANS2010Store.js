import {
  getAttendancelist
} from './PFANS2010Api'

const PFANS2010Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    //获取列表
    getAttendancelist({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAttendancelist(data).then(response => {
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

export default PFANS2010Store;
