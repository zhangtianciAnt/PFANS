import {
  download,
  getDepartment,
  getInsertInfo,
  getList,
  getOneInfo,
  getUpdateInfo,
  insertlots,
} from './ASSETS1001Api';

const ASSETS1001Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    getInsertInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        getInsertInfo(data).then(response => {
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

    getUpdateInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        getUpdateInfo(data).then(response => {
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

    getList({commit}, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(response => {
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

    getDepartment({commit}) {
      return new Promise((resolve, reject) => {
        getDepartment().then(response => {
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
    getOneInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        getOneInfo(data).then(response => {
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
        });
      });
    },
    insertlots({commit}, data) {
      return new Promise((resolve, reject) => {
        insertlots(data).then(response => {
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

export default ASSETS1001Store;
