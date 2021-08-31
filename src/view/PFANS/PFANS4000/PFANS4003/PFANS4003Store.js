import {
  getpeoplewareList,
  download,
  importa
} from './PFANS4003Api';

const PFANS4003store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getpeoplewareList({commit},data) {
      return new Promise((resolve, reject) => {
        getpeoplewareList(data).then(response => {
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
    download({commit}, data) {
      return new Promise((resolve, reject) => {
        download(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

  }
};

export default PFANS4003store;
