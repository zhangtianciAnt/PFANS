import {
  getexpatriatesinfor,
  getexpatriatesinforApplyOne,
  getexpatriatesinforthisyear,
  updateexpatriatesinforApply,
  createexpatriatesinforApply,
  updateexpatriatesinfor,
  download,
  getCompanyProject,
  crAccount,
  crAccount2,
  getWithoutAuth,
  getforSysDiaLog,
  getGroupexpDetail,
  getSearch
} from './PFANS6004Api'


const PFANS6004Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getexpatriatesinfor() {
      return new Promise((resolve, reject) => {
        getexpatriatesinfor().then(response => {
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

    getexpatriatesinforthisyear() {
      return new Promise((resolve, reject) => {
        getexpatriatesinforthisyear().then(response => {
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
    getexpatriatesinforApplyOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getexpatriatesinforApplyOne(data).then(response => {
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

    //ccm add
    getGroupexpDetail({commit}, data) {
      return new Promise((resolve, reject) => {
        getGroupexpDetail(data).then(response => {
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
    //ccm add

    updateexpatriatesinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        updateexpatriatesinforApply(data).then(response => {
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

    updateexpatriatesinfor({commit}, data) {
      return new Promise((resolve, reject) => {
        updateexpatriatesinfor(data).then(response => {
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

    createexpatriatesinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        createexpatriatesinforApply(data).then(response => {
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

    // setexpatriatesinforApply({commit}, data) {
    //   return new Promise((resolve, reject) => {
    //     setexpatriatesinforApply(data).then(response => {
    //       if (response.code === 0) {
    //         resolve(response.data);
    //       } else {
    //         reject(response.message)
    //       }
    //     }).catch(error => {
    //       reject(error);
    //     })
    //   })
    // },
    download({commit}, data) {
      return new Promise((resolve, reject) => {
        download(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    getCompanyProject({commit},data) {
      return new Promise((resolve, reject) => {
        getCompanyProject(data).then(response => {
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

    crAccount({commit},data) {
      return new Promise((resolve, reject) => {
        crAccount(data).then(response => {
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

    crAccount2({commit},data) {
      return new Promise((resolve, reject) => {
        crAccount2(data).then(response => {
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

    getWithoutAuth({commit},data) {
      return new Promise((resolve, reject) => {
        getWithoutAuth(data).then(response => {
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
    // 项目dialog 体制 合同优化添加分页 ztc fr
    getforSysDiaLog({commit}, data) {
      return new Promise((resolve, reject) => {
        getforSysDiaLog(data).then(response => {
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
   // 项目dialog 体制 合同优化添加分页 ztc to

    // region  add  ml  220112  检索  from
    getSearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getSearch(data).then(response => {
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
    //endregion  add  ml  220112  检索  to

  }
};

export default PFANS6004Store;
