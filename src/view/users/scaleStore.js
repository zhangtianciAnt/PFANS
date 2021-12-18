import {
  getList,
  getPeopleInfo,
} from './scaleApi';


const scaleStore = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //获取列表
    getList({commit}, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(response => {
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
    getPeopleInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        getPeopleInfo(data).then(response => {
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

export default scaleStore;
