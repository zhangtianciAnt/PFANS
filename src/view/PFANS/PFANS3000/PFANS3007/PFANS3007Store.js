import {createJapanCondominium, getJapanCondominium, selectById, updateJapanCondominium} from './PFANS3007Api'

const PFANS3007Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //获取流程
    getJapanCondominium() {
      return new Promise((resolve, reject) => {
        getJapanCondominium().then(response => {
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
    updateJapanCondominium({commit}, data) {
      return new Promise((resolve, reject) => {
        updateJapanCondominium(data).then(response => {
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
    createJapanCondominium({commit}, data) {
      return new Promise((resolve, reject) => {
        createJapanCondominium(data).then(response => {
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

export default PFANS3007Store;
