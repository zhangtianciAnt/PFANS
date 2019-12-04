import {createBusiness, getBusiness, selectById, updateBusiness} from './PFANS1002Api'

const PFANS1002Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //获取流程
    getBusiness() {
      return new Promise((resolve, reject) => {
        getBusiness().then(response => {
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
    //获取详细
    selectById({commit}, data) {
      return new Promise((resolve, reject) => {
        selectById(data).then(response => {
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
    //更新流程
    updateBusiness({commit}, data) {
      return new Promise((resolve, reject) => {
        updateBusiness(data).then(response => {
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
    //创建流程
    createBusiness({commit}, data) {
      return new Promise((resolve, reject) => {
        createBusiness(data).then(response => {
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

export default PFANS1002Store;
