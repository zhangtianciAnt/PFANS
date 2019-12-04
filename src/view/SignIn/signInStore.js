import {
  exportExcel
  } from './signInApi'

  const signInStore = {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
      //导出文件
      exportExcel({ commit }, data) {
        return new Promise((resolve, reject) => {
          exportExcel(data).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          })
        })
      },
    }
  }

  export default signInStore;
