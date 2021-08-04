import {
  getsupplierinfor,
  getsupplierinfor2,
  getsupplierinforApplyOne,
  updatesupplierinforApply,
  createsupplierinforApply,
  download
} from './PFANS6003Api'


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
