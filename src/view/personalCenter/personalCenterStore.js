import {
  Password,
  savePersonal,
  getPersonalCenter,
  getPersonalCenterinfo
} from './personalCenterApi'
const personalCenterStore = {
  namespaced: true,
  state: {},
  mutations: {},
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
    //获取个人信息
    getPersonalCenter({ commit }, data) {
      return new Promise((resolve, reject) => {
        getPersonalCenter(data).then(response => {
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
    //获取个人信息
    getPersonalCenterinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getPersonalCenterinfo().then(response => {
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
    //修改个人信息
    savePersonal({ commit }, data) {
      return new Promise((resolve, reject) => {
        savePersonal(data).then(response => {
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
export default personalCenterStore;
