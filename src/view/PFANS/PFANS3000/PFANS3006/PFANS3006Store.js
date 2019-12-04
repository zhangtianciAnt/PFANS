import {createAppointmentCar, getAppointmentCar, getAppointmentCarOne, updateAppointmentCar,download} from './PFANS3006Api'

const PFANS3006Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getAppointmentCar() {
      return new Promise((resolve, reject) => {
        getAppointmentCar().then(response => {
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
    getAppointmentCarOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getAppointmentCarOne(data).then(response => {
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
    updateAppointmentCar({commit}, data) {
      return new Promise((resolve, reject) => {
        updateAppointmentCar(data).then(response => {
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
    createAppointmentCar({commit}, data) {
      return new Promise((resolve, reject) => {
        createAppointmentCar(data).then(response => {
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
}

export default PFANS3006Store;
