import {
  getAppData,
  getAppMenu,
  getmessage,
  updatenoticesstatus,
  delToDoNotice
} from './frameApi'


const frameStore = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //获取当前登陆人有权限查看的应用
    getAppData({ commit }) {
      return new Promise((resolve, reject) => {
        getAppData().then(response => {
          const result = response;
          if (result.code === 0) {
            resolve(result.data)
          } else {
            reject(result.message);
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取某个应用下的菜单
    getAppMenu({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAppMenu(data).then(response => {
          const result = response;
          if (result.code === 0) {
            resolve(result.data)
          } else {
            reject(result.message);
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取消息列表
    getMessage ({commit},data) {
      return new Promise((resolve, reject) => {
        getmessage(data).then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject("查询消息失败！")
        })
      })
    },

    // 更新已阅
    updateNoticesStatus ({commit},data) {
      return new Promise((resolve, reject) => {
        updatenoticesstatus(data).then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject("更新已阅失败！")
        })
      })
    },
//    ADD_FJL_05/25  -- 删除无用代办
    delToDoNotice({commit}, data) {
      return new Promise((resolve, reject) => {
        delToDoNotice(data).then(response => {
          const result = response;
          if (result.code === 0) {
            resolve(result.data)
          } else {
            reject(result.message);
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //    ADD_FJL_05/25  -- 删除无用代办
  }
}

export default frameStore;
