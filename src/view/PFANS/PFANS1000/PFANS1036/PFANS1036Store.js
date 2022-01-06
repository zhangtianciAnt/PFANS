import {
  BusinessplanExport,
  consumption,
  createBusinessplan,
  download,
  get,
  getBusBalns,
  getgroup,
  getgroupA1,
  getgroupcompanyen,
  getPersonPlan,
  getPlan,
  Pl,
  selectById,
  updateBusinessplan,
  whetherEditor,
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
    //region scc add 9/28 编辑按钮状态 from
    whetherEditor({commit}, data) {
      return new Promise((resolve, reject) => {
        whetherEditor(data).then(response => {
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
    //endregion scc add 9/28 编辑按钮状态 to

    //region scc add 10/9 事业计划模板下载 from
    download({commit}, data) {
      return new Promise((resolve, reject) => {
        download(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    //endregion scc add 10/9 事业计划模板下载 to

    //region scc add 事业计划PL导出 from
    BusinessplanExport({commit}, data) {
      return new Promise((resolve, reject) => {
        BusinessplanExport(data).then(response => {
          if (response.type.indexOf('json') == -1) {
            resolve(response);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //endregion scc add 事业计划PL导出 to

    getBusBalns({commit}, params) {
      return new Promise((resolve, reject) => {
        getBusBalns(params).then(response => {
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
    //region scc add 保存部分PL from
    Pl({commit}, data) {
      return new Promise((resolve, reject) => {
        Pl(data).then(response => {
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
//endregion scc add 保存部分PL to

    //region scc add 9/28 事业计划消耗 from
    consumption({commit}, data) {
      return new Promise((resolve, reject) => {
        consumption(data).then(response => {
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
    //endregion scc add 9/28 事业计划消耗 to

  },
};

export default PFANS1036Store;
