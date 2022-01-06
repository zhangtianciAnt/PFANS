import {
  getOrgAll,
  getOrgTree,
  getTreeYears,
  saveTree,
  updateStatus,
} from './orgTreeApi';

const orgTreeStore = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getOrgTree({commit}) {
      return new Promise((resolve, reject) => {
        getOrgTree().then(response => {
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
    saveTree({commit}, data) {
      return new Promise((resolve, reject) => {
        saveTree(data).then(response => {
          const result = response;
          if (result.code === 0) {
            resolve(result.message);
          } else {
            reject(result.message);
          }
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getTreeYears({commit}, data) {
      return new Promise((resolve, reject) => {
        getTreeYears(data).then(response => {
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
    updateStatus({commit}, data) {
      return new Promise((resolve, reject) => {
        updateStatus(data).then(response => {
          const result = response;
          if (result.code === 0) {
            resolve(result.message);
          } else {
            reject(result.message);
          }
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getOrgAll({commit}) {
      return new Promise((resolve, reject) => {
        getOrgAll().then(response => {
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

export default orgTreeStore;
