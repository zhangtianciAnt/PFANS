import {getCostList, getWorktimes, getWorkers, downloadExcel,exportpdf} from './PFANS6009Api'
import {exportjs} from '../../PFANS1000/PFANS1012/PFANS1012Api';
const PFANS6009Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getCostList({commit}, data) {
      return new Promise((resolve, reject) => {
        getCostList(data).then(response => {
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
    getWorktimes({commit}, data) {
      return new Promise((resolve, reject) => {
        getWorktimes(data).then(response => {
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
    getWorkers({commit}, data) {
      return new Promise((resolve, reject) => {
        getWorkers(data).then(response => {
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
    exportpdf({commit}, data) {
      return new Promise((resolve, reject) => {
        exportpdf(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
};

export default PFANS6009Store;
