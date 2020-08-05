import {
  getlist,
  getAttendancelist,
  getAttendancelist1,
  update,
  updStatus,
  updStatus1,
  getAttendancelistCompared,
  disclickUpdateStates,
  selectAbnomalandOvertime,
  selectAbnomaling
} from './PFANS2010Api'

const PFANS2010Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    //获取列表
    getlist({ commit }, data) {
      return new Promise((resolve, reject) => {
        getlist(data).then(response => {
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

    //获取详细 --日志使用
    getAttendancelist({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAttendancelist(data).then(response => {
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

    //获取详细 --考勤使用
    getAttendancelist1({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAttendancelist1(data).then(response => {
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

    //获取离职考勤对比
    getAttendancelistCompared({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAttendancelistCompared(data).then(response => {
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

    //更新数据
    update({ commit }, data) {
      return new Promise((resolve, reject) => {
        update(data).then(response => {
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
    //add_fjl_05/13   --添加审批正常结束后，自动变成承认状态
    //更新状态
    updStatus({commit}, data) {
      return new Promise((resolve, reject) => {
        updStatus(data).then(response => {
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
    //add_fjl_05/13   --添加审批正常结束后，自动变成承认状态

    // add 0622 ccm --审批被驳回后，当月考勤数据全部变为未承认状态
    //更新明细承认状态为未承认
    updStatus1({commit}, data) {
      return new Promise((resolve, reject) => {
        updStatus1(data).then(response => {
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
    // add 0622 ccm --审批被驳回后，当月考勤数据全部变为未承认状态
    //add ccm 0716 离职一键驳回
    disclickUpdateStates({commit}, data) {
      return new Promise((resolve, reject) => {
        disclickUpdateStates(data).then(response => {
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
    //add ccm 0716 离职一键驳回

    //add ccm 2020729 考勤异常加班审批中的日期，考勤不允许承认
    selectAbnomalandOvertime({ commit }, data) {
      return new Promise((resolve, reject) => {
        selectAbnomalandOvertime(data).then(response => {
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
    //add ccm 2020729 考勤异常加班审批中的日期，考勤不允许承认

    //add ccm 0804 查询欠勤是否已经全部申请
    selectAbnomaling({ commit }, data) {
      return new Promise((resolve, reject) => {
        selectAbnomaling(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
    //add ccm 0804 查询欠勤是否已经全部申请
  }
}

export default PFANS2010Store;
