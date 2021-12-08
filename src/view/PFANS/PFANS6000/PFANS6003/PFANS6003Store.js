import {
  getSupplierinfor,
  getsupplierinfor,
  getsupplierinfor2,
  getsupplierinforApplyOne,
  updatesupplierinforApply,
  createsupplierinforApply,
  download
} from './PFANS6003Api'
import {getforSysDiaLog} from "../PFANS6004/PFANS6004Api";


const PFANS6003Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getsupplierinfor() {
      return new Promise((resolve, reject) => {
        getsupplierinfor().then(response => {
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
    getsupplierinfor2() {
      return new Promise((resolve, reject) => {
        getsupplierinfor2().then(response => {
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
    //  add   ml   211207   供应商dialog分页  from
    getSupplierinfor({commit}, data) {
      return new Promise((resolve, reject) => {
        getSupplierinfor(data).then(response => {
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
    //  add   ml   211207   供应商dialog分页  to
    getsupplierinforApplyOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getsupplierinforApplyOne(data).then(response => {
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
    updatesupplierinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        updatesupplierinforApply(data).then(response => {
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
    createsupplierinforApply({commit}, data) {
      return new Promise((resolve, reject) => {
        createsupplierinforApply(data).then(response => {
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
    }
  }
};

export default PFANS6003Store;
