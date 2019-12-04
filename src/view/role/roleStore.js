import {
    getRoleList,
    saveRole,
    delRoleInfo,
    selectAllApplications,
    getRoleInfo,
    getMembers
  } from './roleApi'
  
  const roleStore = {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
      //获取角色列表
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
      //创建/更新角色信息
      saveRole({ commit }, data) {
        return new Promise((resolve, reject) => {
          saveRole(data).then(response => {
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
      //删除角色信息
      delRoleInfo({ commit }, data) {
        return new Promise((resolve, reject) => {
          delRoleInfo(data).then(response => {
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
      //获取所有菜单信息
      selectAllApplications({ commit }) {
        return new Promise((resolve, reject) => {
          selectAllApplications().then(response => {
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
      //获取角色详细信息
      getRoleInfo({ commit }, data) {
        return new Promise((resolve, reject) => {
          getRoleInfo(data).then(response => {
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
      //获取角色详细信息
      getMembers({ commit }, data) {
        return new Promise((resolve, reject) => {
          getMembers(data).then(response => {
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
  }
  
  export default roleStore;
  