import {getTaxestotalList,getBonusList,getwagesList} from './PFANS2006Api';
const PFANS2006Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getTaxestotal({ commit },data) {
      return new Promise((resolve, reject) => {
        getTaxestotalList(data).then(response => {
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
    getwagesList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getwagesList(data).then(response => {
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
    getBonus({ commit },data) {
      return new Promise((resolve, reject) => {
        getBonusList(data).then(response => {
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

export default PFANS2006Store;
