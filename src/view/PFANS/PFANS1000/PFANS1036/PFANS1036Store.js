import {
  createBusinessplan,
  getgroupcompanyen,
  get,
  selectById,
  updateBusinessplan,
  getPersonPlan,
  getPlan,
  getgroupA1,
  getgroup,
} from './PFANS1036Api';

const PFANS1036Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    getgroupcompanyen({commit}, data) {
      return new Promise((resolve, reject) => {
        getgroupcompanyen(data).then(response => {
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
    getgroupA1({commit}, data) {
      return new Promise((resolve, reject) => {
        getgroupA1(data).then(response => {
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
    getgroup({commit}, data) {
      return new Promise((resolve, reject) => {
        getgroup(data).then(response => {
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
    get() {
      return new Promise((resolve, reject) => {
        get().then(response => {
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
    selectById({commit}, data) {
      return new Promise((resolve, reject) => {
        selectById(data).then(response => {
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
    getPlan({commit}, data) {
      return new Promise((resolve, reject) => {
        getPlan(data).then(response => {
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
    getPersonPlan({commit}, data) {
      return new Promise((resolve, reject) => {
        getPersonPlan(data).then(response => {
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
    updateBusinessplan({commit}, data) {
      return new Promise((resolve, reject) => {
        updateBusinessplan(data).then(response => {
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
    createBusinessplan({commit}, data) {
      return new Promise((resolve, reject) => {
        createBusinessplan(data).then(response => {
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

export default PFANS1036Store;
