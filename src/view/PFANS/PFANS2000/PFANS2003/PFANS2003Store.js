import {
  createinterviewrecord,
  createinterviewrecord2,
  getinterviewrecord,
  getinterviewrecordOne,
  updateinterviewrecord,
} from './PFANS2003Api';

const PFANS2003Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getinterviewrecord() {
      return new Promise((resolve, reject) => {
        getinterviewrecord().then(response => {
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

    getinterviewrecordOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getinterviewrecordOne(data).then(response => {
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

    updateinterviewrecord({commit}, data) {
      return new Promise((resolve, reject) => {
        updateinterviewrecord(data).then(response => {
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

    createinterviewrecord({commit}, data) {
      return new Promise((resolve, reject) => {
        createinterviewrecord(data).then(response => {
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
//add-ws-7/30-禅道任务296
    createinterviewrecord2({commit}, data) {
      return new Promise((resolve, reject) => {
        createinterviewrecord2(data).then(response => {
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
    //add-ws-7/30-禅道任务296
  },
};

export default PFANS2003Store;
