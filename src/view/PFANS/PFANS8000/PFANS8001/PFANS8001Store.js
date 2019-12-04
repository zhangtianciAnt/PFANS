import {
  Password,
} from './PFANS8001Api'
const PFANS8001Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {

    //修改密码
    Password({ commit }, data) {
      return new Promise((resolve, reject) => {
        Password(data).then(response => {
          const result = response;
          if (result.code === 0) {
            resolve(result)
          } else {
            resolve(result);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default PFANS8001Store;
