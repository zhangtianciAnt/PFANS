import {
  userSave,
  getUserTableList,
  getById,
  getme,
  mobileCheck,
  disableUser,
  getRoleList,
  setRoleToUser,
  getUserTableList2,
  getUserTableList3,
  download,
  getSigninlog
} from './usersApi'

const usersStore = {
  namespaced: true,
  state: {
    orgs:[]
  },
  mutations: {
    SET_ORGS(state, Orgs) {
      state.orgs = Orgs
    },
  },
  actions: {
    // 保存/更新 用户
    userSave({ commit }, data) {
      return new Promise((resolve, reject) => {
        userSave(data).then(response => {
          if (response.code === 0) {
            resolve(response.message);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 根据orgid获取用户列表
    getUserTableList({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUserTableList(params).then(response => {
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
    getUserTableList2({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUserTableList2(params).then(response => {
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
//add-ws-9/12-财务人员编码处理
    getUserTableList3({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUserTableList3(params).then(response => {
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
    //add-ws-9/12-财务人员编码处理

    // 根据userid获取该用户的详细信息
    getById({ commit }, params) {
      return new Promise((resolve, reject) => {
        getById(params).then(response => {
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
    getme({ commit }) {
      return new Promise((resolve, reject) => {
        getme().then(response => {
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
    // 手机号重复验证
    mobileCheck({ commit }, params) {
      return new Promise((resolve, reject) => {
        mobileCheck(params).then(response => {
          if (response.code === 0) {
            resolve(response);
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 用户启用/禁用
    disableUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        disableUser(params).then(response => {
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
    // 获取角色列表
    getRoleList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getRoleList(data).then(response => {
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
    // 给用户赋角色
    setRoleToUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        setRoleToUser(data).then(response => {
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
    download({commit}, data) {
      return new Promise((resolve, reject) => {
        download(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    // add gbb 0815 获取当前用户登陸信息（IP）
    getSigninlog() {
      return new Promise((resolve, reject) => {
        getSigninlog().then(response => {
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
    //add-lyt-21/2/3-禅道734
    checkPassword({ commit }, params) {
      return new Promise((resolve, reject) => {
        checkPassword(params).then(response => {
          if (response.code === 0) {
            resolve(response);
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
}

export default usersStore;
