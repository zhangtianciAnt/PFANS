import { getActionsAuth, getNewActionAuth} 
from '@/components/EasyNormalTable/tableApi'

const tableStore = {
  namespaced: true,
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取按钮权限
    getActionsAuth({commit}, data) {
      return new Promise((resolve, reject) => {
        getActionsAuth(data).then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(response.message)
        })
      })
    },
    // 获取新建按钮权限
    getNewActionAuth({commit}) {
      return new Promise((resolve, reject) => {
        getNewActionAuth().then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(response.message)
        })
      })
    },
  }
}

export default tableStore
