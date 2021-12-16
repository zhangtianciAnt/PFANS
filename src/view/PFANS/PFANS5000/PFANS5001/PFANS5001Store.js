import {getFpans5001List,selectById,update,insert,getcustomer,getexpat,select,getPjList,getFpans5001List2,
        getProjectList,getTimestart,getGroupTimestart,updateTimestart,getList2,selectAll,selectConnumList,report,update1,forDetail,} from './PFANS5001Api'


const PFANS5001Store = {
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
    //数据结转
    update1({commit}, data) {
      return new Promise((resolve, reject) => {
        update1(data).then(response => {
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
    getFpans5001List({commit},data) {
      return new Promise((resolve, reject) => {
        getFpans5001List(data).then(response => {
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
    getFpans5001List2({commit},data) {
      return new Promise((resolve, reject) => {
        getFpans5001List2(data).then(response => {
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
    selectAll({ commit }) {
      return new Promise((resolve, reject) => {
        selectAll().then(response => {
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

    selectConnumList({commit}, data) {
      return new Promise((resolve, reject) => {
        selectConnumList(data).then(response => {
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

    report({commit}, data) {
      return new Promise((resolve, reject) => {
        report(data).then(response => {
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

    //region scc add 根据合同号，获取构外数据 from
    forDetail({commit}, data) {
      return new Promise((resolve, reject) => {
        forDetail(data).then(response => {
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
    //endregion scc add 根据合同号，获取构外数据 to
  }
};

export default PFANS5001Store;
