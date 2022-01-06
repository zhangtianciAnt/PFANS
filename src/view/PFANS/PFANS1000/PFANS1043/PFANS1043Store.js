import {
  createPfans1043,
  getDiaLogPage,
  getFpans1043List,
  getlisttheme,
  getlistthemePage,
  getPfans1043One,
  getthemename,
  themenametype,
  updatePfans1043,
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
    //  add  ml  211203  dialog分页  from
    getDiaLogPage({commit}, data) {
      return new Promise((resolve, reject) => {
        getDiaLogPage(data).then(response => {
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
    //  add  ml  211203  dialog分页  to
    //  add  ml  211203  受托theme dialog分页  from
    getlistthemePage({commit}, data) {
      return new Promise((resolve, reject) => {
        getlistthemePage(data).then(response => {
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
    //  add  ml  211203  受托theme dialog分页  to
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

    getFpans1043List({commit}, data) {
      return new Promise((resolve, reject) => {
        getFpans1043List(data).then(response => {
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
