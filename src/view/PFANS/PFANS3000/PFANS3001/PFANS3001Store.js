import {
  createPfans3001,
  getFpans3001List,
  getPfans3001One,
  updatePfans3001,
} from './PFANS3001Api';

const PFANS3001Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    createPfans3001({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans3001(data).then(response => {
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

    updatePfans3001({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans3001(data).then(response => {
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

    getFpans3001List({commit}) {
      return new Promise((resolve, reject) => {
        getFpans3001List().then(response => {
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

    getPfans3001One({commit}, data) {
      return new Promise((resolve, reject) => {
        getPfans3001One(data).then(response => {
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

export default PFANS3001Store;
