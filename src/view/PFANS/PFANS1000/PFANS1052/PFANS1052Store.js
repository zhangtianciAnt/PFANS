import {getDepartmentalInsert} from './PFANS1052Api';

const PFANS1052Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getDepartmentalInsert({commit}, data) {
      return new Promise((resolve, reject) => {
        getDepartmentalInsert(data).then(response => {
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

export default PFANS1052Store;
