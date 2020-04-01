import {
  userSave,
  getUserTableList,
  getById,
  mobileCheck,
  disableUser,
  getRoleList,
  setRoleToUser,
  download
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
  }
}

export default usersStore;
