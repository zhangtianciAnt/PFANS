import {
  getUnusedevice,
  getUnusedeviceOne,
  updateUnusedevice,
  createUnusedevice,
} from './PFANS1003Api'

const PFANS1003Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getUnusedevice() {
      return new Promise((resolve, reject) => {
        getUnusedevice().then(response => {
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
    getUnusedeviceOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getUnusedeviceOne(data).then(response => {
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
    updateUnusedevice({ commit },data) {
      return new Promise((resolve, reject) => {
        updateUnusedevice(data).then(response => {
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
    createUnusedevice({ commit },data) {
      return new Promise((resolve, reject) => {
        createUnusedevice(data).then(response => {
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
  }
};

export default PFANS1003Store;
