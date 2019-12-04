import {
  getSoftwaretransfer,
  selectById,
  updateSoftwaretransfer,
  insert,
} from './PFANS1008Api'

const PFANS1008Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //获取列表
    getSoftwaretransfer({commit}, data) {
      return new Promise((resolve, reject) => {
        getSoftwaretransfer(data).then(response => {
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
    selectById({ commit },data) {
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
    //更新
    updateSoftwaretransfer({ commit },data) {
      return new Promise((resolve, reject) => {
        updateSoftwaretransfer(data).then(response => {
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
    //创建
    insert({ commit },data) {
      return new Promise((resolve, reject) => {
        insert(data).then(response => {
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

export default PFANS1008Store;
