import {getFpans5013List,selectById,update,insert,getcustomer,getexpat,select,getPjList,
        getProjectList,getTimestart,getGroupTimestart,updateTimestart,getList2} from './PFANS5013Api'


const PFANS5013Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //创建流程
    insert({commit}, data) {
      return new Promise((resolve, reject) => {
        insert(data).then(response => {
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
    //更新流程
    update({commit}, data) {
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
    //获取流程
    getFpans5013List({commit},data) {
      return new Promise((resolve, reject) => {
        getFpans5013List(data).then(response => {
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
    selectById({ commit },data) {
      return new Promise((resolve, reject) => {
        selectById(data).then(response => {
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
    select({ commit },data) {
      return new Promise((resolve, reject) => {
        select(data).then(response => {
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
    getcustomer({commit}, data) {
      return new Promise((resolve, reject) => {
        getcustomer(data).then(response => {
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

    getexpat({commit}, data) {
      return new Promise((resolve, reject) => {
        getexpat(data).then(response => {
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
    getPjList({commit}, data) {
      return new Promise((resolve, reject) => {
        getPjList(data).then(response => {
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
    getList2({commit}, data) {
      return new Promise((resolve, reject) => {
        getList2(data).then(response => {
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
    getProjectList({commit}, data) {
      return new Promise((resolve, reject) => {
        getProjectList(data).then(response => {
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
    getTimestart({commit}, data) {
      return new Promise((resolve, reject) => {
        getTimestart(data).then(response => {
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
    getGroupTimestart({commit}, data) {
      return new Promise((resolve, reject) => {
        getGroupTimestart(data).then(response => {
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
    updateTimestart({commit}, data) {
      return new Promise((resolve, reject) => {
        updateTimestart(data).then(response => {
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

export default PFANS5013Store;
