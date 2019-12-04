import {getBusiness} from '../PFANS1002/PFANS1002Api';
import {getJudgement} from '../PFANS1004/PFANS1004Api';
import {getpurchaseApply} from '../PFANS1005/PFANS1005Api';
import {getLoanapplication} from '../PFANS1006/PFANS1006Api';
import {getAssetinformation} from '../PFANS1007/PFANS1007Api';
import {getSoftwaretransfer} from '../PFANS1008/PFANS1008Api';
import {getFixedassets} from '../PFANS1009/PFANS1009Api';
import {getCommunication} from '../PFANS1010/PFANS1010Api';

const PFANS1001Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    //获取列表
    getBusiness({commit}, data) {
      return new Promise((resolve, reject) => {
        getBusiness(data).then(response => {
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

    //获取列表
    getJudgement({commit}, data) {
      return new Promise((resolve, reject) => {
        getJudgement(data).then(response => {
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
    //获取列变
    getpurchaseApply() {
      return new Promise((resolve, reject) => {
        getpurchaseApply().then(response => {
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

//获取列变
    getLoanapplication() {
      return new Promise((resolve, reject) => {
        getLoanapplication().then(response => {
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

    //获取列变
    getAssetinformation() {
      return new Promise((resolve, reject) => {
        getAssetinformation().then(response => {
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

    //获取列变
    getSoftwaretransfer() {
      return new Promise((resolve, reject) => {
        getSoftwaretransfer().then(response => {
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

    //获取列变
    getFixedassets() {
      return new Promise((resolve, reject) => {
        getFixedassets().then(response => {
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

    //获取列变
    getCommunication() {
      return new Promise((resolve, reject) => {
        getCommunication().then(response => {
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

export default PFANS1001Store;
