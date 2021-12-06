import {
  getCustomerinfor,
  getcustomerinforprimary,
  getcustomerinfor2,
  getcustomerinforApplyOne,
  updatecustomerinforApply,
  createcustomerinforApply,
  download,
  downloadExcel
} from './PFANS6002Api'
import {getforContDiaLog} from "../../PFANS1000/PFANS1026/PFANS1026Api";

const PFANS6002Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getcustomerinforprimary() {
      return new Promise((resolve, reject) => {
        getcustomerinforprimary().then(response => {
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
    getcustomerinfor2() {
      return new Promise((resolve, reject) => {
        getcustomerinfor2().then(response => {
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
    // add  ml  211206  dialog分页  from
    getCustomerinfor({commit}, data) {
      return new Promise((resolve, reject) => {
        getCustomerinfor(data).then(response => {
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
    // add  ml  211206  dialog分页  to
    getcustomerinforApplyOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getcustomerinforApplyOne(data).then(response => {
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
    updatecustomerinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        updatecustomerinforApply(data).then(response => {
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
    createcustomerinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        createcustomerinforApply(data).then(response => {
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

    //region scc add 人员信息导出 from
    downloadExcel({commit}, data) {
      return new Promise((resolve, reject) => {
        downloadExcel(data).then(response => {
          if ( response.type.indexOf("json") == -1 ) {
            resolve(response)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    //endregion scc add 人员信息导出 to

  }
};

export default PFANS6002Store;
