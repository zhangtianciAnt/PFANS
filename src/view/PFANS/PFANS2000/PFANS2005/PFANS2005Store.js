import {
  creategiving,
  deleteadditional,
  deleteFive,
  deleteotherfour,
  deleteothertwo,
  deleteteappreciation,
  download,
  getCasgiftApply,
  getDataList,
  getWagecompany,
  getWagesByResign,
  getWagesdepartment,
  givinglist,
  insertWages,
  save,
  thisMonthLacktimeChange,
  thisMonthOvertimeChange,
  updatestate,
} from './PFANS2005Api';

const PFANS2005Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    creategiving({commit}, data) {
      return new Promise((resolve, reject) => {
        creategiving(data).then(response => {
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

    deleteothertwo({commit}, data) {
      return new Promise((resolve, reject) => {
        deleteothertwo(data).then(response => {
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

    deleteadditional({commit}, data) {
      return new Promise((resolve, reject) => {
        deleteadditional(data).then(response => {
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

    deleteotherfour({commit}, data) {
      return new Promise((resolve, reject) => {
        deleteotherfour(data).then(response => {
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
    deleteteappreciation({commit}, data) {
      return new Promise((resolve, reject) => {
        deleteteappreciation(data).then(response => {
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
    givinglist({commit}, data) {
      return new Promise((resolve, reject) => {
        givinglist(data).then(response => {
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
    deleteFive({commit}, data) {
      return new Promise((resolve, reject) => {
        deleteFive(data).then(response => {
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
    getCasgiftApply() {
      return new Promise((resolve, reject) => {
        getCasgiftApply().then(response => {
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
    getDataList() {
      return new Promise((resolve, reject) => {
        getDataList().then(response => {
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
    //更新
    save({commit}, data) {
      return new Promise((resolve, reject) => {
        save(data).then(response => {
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

    //本月加班数据变更时，重新计算加班费合计
    thisMonthOvertimeChange({commit}, data) {
      return new Promise((resolve, reject) => {
        thisMonthOvertimeChange(data).then(response => {
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
    //本月欠勤数据变更时，重新计算欠勤费合计
    thisMonthLacktimeChange({commit}, data) {
      return new Promise((resolve, reject) => {
        thisMonthLacktimeChange(data).then(response => {
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
    // zqu start insert wages
    insertWages({commit}, data) {
      return new Promise((resolve, reject) => {
        insertWages(data).then(response => {
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
    // zqu end
    //gbb start insert update wagesdepartment
    getWagesdepartment({commit}, data) {
      return new Promise((resolve, reject) => {
        getWagesdepartment(data).then(response => {
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
    // gbb end

    //gbb start insert update wagescompany
    getWagecompany({commit}) {
      return new Promise((resolve, reject) => {
        getWagecompany().then(response => {
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
    // gbb end
    //gbb 0721 工资发放按钮 start
    updatestate({commit}, data) {
      return new Promise((resolve, reject) => {
        updatestate(data).then(response => {
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

    //gbb 0721 工资发放按钮 end

    //gbb 0720 离职工资对比 start
    getWagesByResign({commit}, data) {
      return new Promise((resolve, reject) => {
        getWagesByResign(data).then(response => {
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
    //gbb 0720 离职工资对比 end
    //gbb 0724 模板下载 start
    download({commit}, data) {
      return new Promise((resolve, reject) => {
        download(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    //gbb 0724 模板下载 end
  },
};

export default PFANS2005Store;
