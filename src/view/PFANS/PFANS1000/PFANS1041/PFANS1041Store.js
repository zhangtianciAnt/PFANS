import {getBusiness} from '../PFANS1002/PFANS1002Api';
import {getJudgement} from '../PFANS1004/PFANS1004Api';
import {getpurchaseApply} from '../PFANS1005/PFANS1005Api';
import {getLoanapplication} from '../PFANS1006/PFANS1006Api';
import {getCommunication} from '../PFANS1010/PFANS1010Api';
import {getOffshore} from '../PFANS1011/PFANS1011Api';

const PFANS1041Store = {
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
    //获取列变
    getOffshore() {
      return new Promise((resolve, reject) => {
        getOffshore().then(response => {
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

export default PFANS1041Store;
