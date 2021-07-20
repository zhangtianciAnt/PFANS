import {getDepartmental} from './PFANS1050Api';

const PFANS1050store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getDepartmental({commit}, data) {
      return new Promise((resolve, reject) => {
        getDepartmental(data).then(response => {
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

export default PFANS1050store;
