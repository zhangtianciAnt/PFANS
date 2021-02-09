import { getActionsAuth, getNewActionAuth }
  from '@/components/EasyNormalTable/tableApi'
import { resolve } from 'tinymce'

const Auth = [];

const tableStore = {
  tableStoreFil: "asd",
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    // 获取按钮权限
    // add  shubo  20200208  PSDCD_PFANS_20201217_XQ_057 from

    getActionsAuth({ commit }, data) {
      if (data.length == 0) {
        if (this.Auth == 'undefined') {
          return data;
        } else {
          return this.Auth;
        }
      } else {
        this.Auth = data;
        return this.Auth;
      }
    },
    // add  shubo  20200208  PSDCD_PFANS_20201217_XQ_057 to

    // 获取新建按钮权限
    getNewActionAuth({ commit }) {
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
