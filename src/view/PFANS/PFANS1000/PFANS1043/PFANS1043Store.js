import {
  createPfans1043,
  getFpans1043List,
  updatePfans1043,
  getPfans1043One,
  getthemename,
  themenametype,
  getlisttheme,
} from './PFANS1043Api';

const PFANS1043store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //add-ws-01/06-禅道任务710
    themenametype({commit}, data) {
      return new Promise((resolve, reject) => {
        themenametype(data).then(response => {
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
    //add-ws-01/06-禅道任务710
    getthemename({commit}, data) {
      return new Promise((resolve, reject) => {
        getthemename(data).then(response => {
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
    createPfans1043({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans1043(data).then(response => {
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


    updatePfans1043({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans1043(data).then(response => {
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

    getFpans1043List({commit}) {
      return new Promise((resolve, reject) => {
        getFpans1043List().then(response => {
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

    getPfans1043One({commit}, data) {
      return new Promise((resolve, reject) => {
        getPfans1043One(data).then(response => {
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
    getlisttheme({commit}, data) {
      return new Promise((resolve, reject) => {
        getlisttheme(data).then(response => {
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

export default PFANS1043store;
