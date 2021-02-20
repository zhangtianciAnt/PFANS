import {getGroupId,getChangeRanks, getPersonalCost,gettableBm,gettableGs,gettableRb,getFuzzyQuery, getYears, insertPenalcost,upPersonalCost,getYearsantid} from './PFANS2036Api'
import {getPortPromise} from "portfinder";

const PFANS2036Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //查看列表
    getGroupId({commit}, data) {
      return new Promise((resolve, reject) => {
        getGroupId(data).then(response => {
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
    //查看列表
    getChangeRanks({commit}, data) {
      return new Promise((resolve, reject) => {
        getChangeRanks(data).then(response => {
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
    //查看列表
    gettableBm({commit}, data) {
      return new Promise((resolve, reject) => {
        gettableBm(data).then(response => {
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

    //查看列表
    gettableGs({commit}, data) {
      return new Promise((resolve, reject) => {
        gettableGs(data).then(response => {
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

    //查看列表
    gettableRb({commit}, data) {
      return new Promise((resolve, reject) => {
        gettableRb(data).then(response => {
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

    //模糊查询
    getFuzzyQuery({commit},params){
      return new Promise((resolve, reject) => {
        getFuzzyQuery(params).then(response=>{
          if(response.code === 0){
            resolve(response.data);
          }
          else {
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









