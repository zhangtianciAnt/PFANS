import {saveInfo, getInfo, getThemeOutDepth} from './PFANS1053Api';

const PFANS1053Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        getInfo(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    saveInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        saveInfo(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    getThemeOutDepth({commit}, data) {
      return new Promise((resolve, reject) => {
        getThemeOutDepth(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
  },
};

export default PFANS1053Store;
