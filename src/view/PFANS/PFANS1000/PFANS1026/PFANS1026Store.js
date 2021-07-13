import {
  get,
  get2,
  update,
  insert,
  insertBook,
  existCheck,
  existN,
  existQ,
  getList,
  getPe,
  purchaseExistCheck,
  getindividual,
  generatesta,
  getworkfolwPurchaseData,
  getNapinQinqiu,
  getNaPpinAftercount,
  dataCarryover,
  getProject
  } from './PFANS1026Api';

const PFANS1026Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //add-ws-7/22-禅道341任务
    generatesta({commit}, data) {
      return new Promise((resolve, reject) => {
        generatesta(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    getindividual({commit}) {
      return new Promise((resolve, reject) => {
        getindividual().then(response => {
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
    //add-ws-7/22-禅道341任务
    get({commit}, data) {
      return new Promise((resolve, reject) => {
        get(data).then(response => {
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
    get2({commit}, data) {
      return new Promise((resolve, reject) => {
        get2(data).then(response => {
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
    update({commit}, data) {
      return new Promise((resolve, reject) => {
        update(data).then(response => {
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
    insert({commit}, data) {
      return new Promise((resolve, reject) => {
        insert(data).then(response => {
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
    insertBook({commit}, data) {
      return new Promise((resolve, reject) => {
        insertBook(data).then(response => {
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
    existCheck({commit}, data) {
      return new Promise((resolve, reject) => {
        existCheck(data).then(response => {
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
    existN({commit}, data) {
      return new Promise((resolve, reject) => {
        existN(data).then(response => {
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
    existQ({commit}, data) {
      return new Promise((resolve, reject) => {
        existQ(data).then(response => {
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
    getPe({commit}, data) {
      return new Promise((resolve, reject) => {
        getPe(data).then(response => {
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
    //add ccm 0725  采购合同chongfucheck
    purchaseExistCheck({ commit },data) {
      return new Promise((resolve, reject) => {
        purchaseExistCheck(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    //add ccm 0725  采购合同chongfucheck
    //采购业务数据流程查看详情
    getworkfolwPurchaseData({commit}, data) {
      return new Promise((resolve, reject) => {
        getworkfolwPurchaseData(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    //采购业务数据流程查看详情

    getNapinQinqiu({commit}, data) {
      return new Promise((resolve, reject) => {
        debugger;
        getNapinQinqiu(data).then(response => {
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

    //add ccm
    getNaPpinAftercount({commit}, data) {
      return new Promise((resolve, reject) => {
        getNaPpinAftercount(data).then(response => {
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
    //add ccm

    //add  ml  20210706   契约番号废弃check   from
    getProject({commit}, data) {
      return new Promise((resolve, reject) => {
        getProject(data).then(response => {
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
    //add  ml  20210706   契约番号废弃check   to

    dataCarryover({commit}, data) {
      return new Promise((resolve, reject) => {
        dataCarryover(data).then(response => {
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

  export default PFANS1026Store;
