import {
  createBusiness,
  getBusiness,
  selectById,
  selectById2,
  selectById3,
  selectById4,
  updateBusiness,
} from './PFANS1035Api';

const PFANS1035Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //add-ws-7/7-禅道153
    selectById4({commit}, data) {
      return new Promise((resolve, reject) => {
        selectById4(data).then(response => {
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
    selectById2({commit}, data) {
      return new Promise((resolve, reject) => {
        selectById2(data).then(response => {
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
    selectById3({commit}, data) {
      return new Promise((resolve, reject) => {
        selectById3(data).then(response => {
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
    //add-ws-7/7-禅道153
    getBusiness() {
      return new Promise((resolve, reject) => {
        getBusiness().then(response => {
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
    updateBusiness({commit}, data) {
      return new Promise((resolve, reject) => {
        updateBusiness(data).then(response => {
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
    createBusiness({commit}, data) {
      return new Promise((resolve, reject) => {
        createBusiness(data).then(response => {
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

export default PFANS1035Store;
