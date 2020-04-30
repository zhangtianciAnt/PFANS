import {createPfans2023, getFpans2023List, updatePfans2023,getDataOne,download} from './PFANS2023Api'

const PFANS2023Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //创建流程
    createPfans2023({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans2023(data).then(response => {
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
    updatePfans2023({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans2023(data).then(response => {
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
    //获取流程
    getFpans2023List({commit},data) {
      return new Promise((resolve, reject) => {
        getFpans2023List(data).then(response => {
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
    getDataOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getDataOne(data).then(response => {
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
    download({commit}, data) {
      return new Promise((resolve, reject) => {
        download(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
}

export default PFANS2023Store;
