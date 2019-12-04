import {
  getInformation,
  insertInformation,
  updateInformation
} from './PFANS1001Api'

const PFANS1001Store = {
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
    insertInformation({ commit },data) {
      debugger;
      return new Promise((resolve, reject) => {
        debugger
        insertInformation(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          console.log(error)
          reject(error);
        })
      })
    },
    updateInformation({ commit },data) {
        debugger;
        return new Promise((resolve, reject) => {
            updateInformation(data).then(response => {
            if (response.code === 0) {
              resolve(response.data);
            } else {
              reject(response.message)
            }
          }).catch(error => {
            console.log(error)
            reject(error);
          })
        })
      }
  }
}

export default PFANS1001Store;
