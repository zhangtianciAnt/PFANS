import {
  getLoanapplication,
  getLoanapplicationOne,
  updateLoanapplication,
  createLoanapplication,
  getpolicycontract,
  getpolicycontract2,
  getpolicycontract3,
  chackcycle,
  getaward,
  getpolicycontractOne,
  check,
  updatepolicycontract,
  createpolicycontract,
  exportjs,
} from './PFANS1006Api';

const PFANS1006Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //add_fjl_0725  打印PDF   START
    exportjs({commit}, data) {
      return new Promise((resolve, reject) => {
        exportjs(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    //add_fjl_0725  打印PDF   end
    //ADD-WS-7/14-禅道144任务
    chackcycle({commit}, data) {
      return new Promise((resolve, reject) => {
        chackcycle(data).then(response => {
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
    getpolicycontractOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getpolicycontractOne(data).then(response => {
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
    updatepolicycontract({commit}, data) {
      return new Promise((resolve, reject) => {
        updatepolicycontract(data).then(response => {
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
    check({commit}, data) {
      return new Promise((resolve, reject) => {
        check(data).then(response => {
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
    createpolicycontract({commit}, data) {
      return new Promise((resolve, reject) => {
        createpolicycontract(data).then(response => {
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
    getpolicycontract({commit}, data) {
      return new Promise((resolve, reject) => {
        getpolicycontract(data).then(response => {
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
    getaward() {
      return new Promise((resolve, reject) => {
        getaward().then(response => {
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
    getpolicycontract2() {
      return new Promise((resolve, reject) => {
        getpolicycontract2().then(response => {
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
    getpolicycontract3() {
      return new Promise((resolve, reject) => {
        getpolicycontract3().then(response => {
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
//ADD-WS-7/14-禅道144任务

    getLoanapplication() {
      return new Promise((resolve, reject) => {
        getLoanapplication().then(response => {
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
    getLoanapplicationOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getLoanapplicationOne(data).then(response => {
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

    updateLoanapplication({commit}, data) {
      return new Promise((resolve, reject) => {
        updateLoanapplication(data).then(response => {
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

    createLoanapplication({commit}, data) {
      return new Promise((resolve, reject) => {
        createLoanapplication(data).then(response => {
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

export default PFANS1006Store;
