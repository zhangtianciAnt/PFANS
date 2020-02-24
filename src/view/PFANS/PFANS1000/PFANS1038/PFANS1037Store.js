import {getAssetinformation} from '../PFANS1007/PFANS1007Api';
import {getSoftwaretransfer} from '../PFANS1008/PFANS1008Api';
import {getFixedassets} from '../PFANS1009/PFANS1009Api';

const PFANS1037Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

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
  }
}

export default PFANS1037Store;
