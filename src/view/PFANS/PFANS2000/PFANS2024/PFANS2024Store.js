import {createPfans2024, getFpans2024List, updatePfans2024,getDataOne,create} from './PFANS2024Api'

const PFANS2024Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //创建流程
    createPfans2024({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans2024(data).then(response => {
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
    updatePfans2024({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans2024(data).then(response => {
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
    getFpans2024List({commit},data) {
      return new Promise((resolve, reject) => {
        getFpans2024List(data).then(response => {
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
    create({ commit },data) {
      return new Promise((resolve, reject) => {
        create(data).then(response => {
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

export default PFANS2024Store;
