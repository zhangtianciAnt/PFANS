import {
  createOvertime,
  getOvertime,
  getOvertimeOne,
  updateOvertime,
  getList,
  getDataList,
  getOvertimeDay,
  getOvertimeOneday,
  deleteLog,
getFpans2011Listowner
} from './PFANS2011Api'

const PFANS2011Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
 getFpans2011Listowner({commit,data}) {
      return new Promise((resolve, reject) => {
        getFpans2011Listowner(data).then(response => {
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
  actions: {
    //add-ws-9/4-加班申请可删除任务
    deleteLog({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteLog(data).then(response => {
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
    //add-ws-9/4-加班申请可删除任务
    getOvertime() {
      return new Promise((resolve, reject) => {
        getOvertime().then(response => {
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

    getDataList({commit}) {
      return new Promise((resolve, reject) => {
        getDataList().then(response => {
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

    getOvertimeOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getOvertimeOne(data).then(response => {
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
    updateOvertime({ commit },data) {
      return new Promise((resolve, reject) => {
        updateOvertime(data).then(response => {
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
    createOvertime({ commit },data) {
      return new Promise((resolve, reject) => {
        createOvertime(data).then(response => {
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
    getList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(response => {
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
    getOvertimeDay({commit}, data) {
      return new Promise((resolve, reject) => {
        getOvertimeDay(data).then(response => {
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
    getOvertimeOneday({commit}, data) {
      return new Promise((resolve, reject) => {
        getOvertimeOneday(data).then(response => {
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
  }
};

export default PFANS2011Store;
