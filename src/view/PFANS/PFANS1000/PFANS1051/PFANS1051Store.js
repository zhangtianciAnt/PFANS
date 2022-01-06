import {selectBygroupid} from './PFANS1051Api';

const PFANS1051store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    selectBygroupid({commit}, data) {
      return new Promise((resolve, reject) => {
        selectBygroupid(data).then(response => {
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

export default PFANS1051store;
