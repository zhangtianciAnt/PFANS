import {
  getInformation,
  insertInformation,
  updateInformation,
  getOneInformation,
  getListType
} from './PFANS8008Api'

const PFANS8008Store = {
  namespaced: true,
  actions: {
    getInformation() {
      return new Promise((resolve, reject) => {
        getInformation().then(response => {
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
    getListType() {
      return new Promise((resolve, reject) => {
        getListType().then(response => {
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
    insertInformation({ commit },data) {
      return new Promise((resolve, reject) => {
        insertInformation(data).then(response => {
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
    updateInformation({ commit },data) {
      return new Promise((resolve, reject) => {
        updateInformation(data).then(response => {
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
    getOneInformation({ commit },data) {
      return new Promise((resolve, reject) => {
        getOneInformation(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default PFANS8008Store;
