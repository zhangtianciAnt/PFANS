import {getPersonalCost, getYears, insertPenalcost,upPersonalCost} from './PFANS2036Api'

const PFANS2036Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //查看列表
    getYears({commit}, data) {
      return new Promise((resolve, reject) => {
        getYears(data).then(response => {
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
    //查看详情
    getPersonalCost({commit}, params) {
      return new Promise((resolve, reject) => {
        getPersonalCost(params).then(response => {
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
    insertPenalcost({commit}, data) {
      return new Promise((resolve, reject) => {
        insertPenalcost(data).then(response => {
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
    upPersonalCost({commit}, data) {
      return new Promise((resolve, reject) => {
        upPersonalCost(data).then(response => {
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
export default PFANS2036Store;









