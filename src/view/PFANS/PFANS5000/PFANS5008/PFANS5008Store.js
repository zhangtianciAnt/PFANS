import {
  createNewUser,
  getDataList,
  getCompanyProjectList,
  getProjectList,
  updateNewUser,
  getDataOne,
  createProject,
  deletePersonal,
  deleteLog,
  gettlist,
  downloadList,
  getListcheck,
  CheckList,
  getCheckList,
  getAttendancepdlist,
  getDataList1,
  getDataList2,
  getLogDataList,
  sumlogdate,
  getDataList3
} from './PFANS5008Api';

const PFANS5008Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //add-ws-01/05-优化接口
    sumlogdate({commit}, data) {
      return new Promise((resolve, reject) => {
        sumlogdate(data).then(response => {
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
    //add-ws-01/05-优化接口
    //add-ws-外协人员表查询
    getAttendancepdlist({commit}, data) {
      return new Promise((resolve, reject) => {
        getAttendancepdlist(data).then(response => {
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
    //add-ws-外协人员表查询
    deletePersonal({commit}, data) {
      return new Promise((resolve, reject) => {
        deletePersonal(data).then(response => {
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
    deleteLog({commit}, data) {
      return new Promise((resolve, reject) => {
        deleteLog(data).then(response => {
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

    getListcheck({commit}, data) {
      return new Promise((resolve, reject) => {
        getListcheck(data).then(response => {
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
    createNewUser({commit}, data) {
      return new Promise((resolve, reject) => {
        createNewUser(data).then(response => {
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
    downloadList({commit}, data) {
      return new Promise((resolve, reject) => {
        downloadList(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    createProject({commit}, data) {
      return new Promise((resolve, reject) => {
        createProject(data).then(response => {
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
    getDataList({commit}, data) {
      return new Promise((resolve, reject) => {
        getDataList(data).then(response => {
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
    getLogDataList({commit}, data) {
      return new Promise((resolve, reject) => {
        getLogDataList(data).then(response => {
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
    getDataList1({commit}, data) {
      return new Promise((resolve, reject) => {
        getDataList1(data).then(response => {
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
    // add-ws-5/26-No.68
    getDataList2({commit}, data) {
      return new Promise((resolve, reject) => {
        getDataList2(data).then(response => {
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
    // add-ws-5/26-No.68
    getCheckList({commit}, data) {
      return new Promise((resolve, reject) => {
        getCheckList(data).then(response => {
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
    CheckList({commit}, data) {
      return new Promise((resolve, reject) => {
        CheckList(data).then(response => {
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
    gettlist({commit}, data) {
      return new Promise((resolve, reject) => {
        gettlist(data).then(response => {
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
    getCompanyProjectList({commit}, data) {
      return new Promise((resolve, reject) => {
        getCompanyProjectList(data).then(response => {
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
    getProjectList({commit}, data) {
      return new Promise((resolve, reject) => {
        getProjectList(data).then(response => {
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
    updateNewUser({commit}, data) {
      return new Promise((resolve, reject) => {
        updateNewUser(data).then(response => {
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
    getDataOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getDataOne(data).then(response => {
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
    //add-zjz-01/12-日志管理添加检索条件
    getDataList3({commit}, data) {
      return new Promise((resolve, reject) => {
        getDataList3(data).then(response => {
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
    //add-zjz-01/12-日志管理添加检索条件
  },
};

export default PFANS5008Store;
