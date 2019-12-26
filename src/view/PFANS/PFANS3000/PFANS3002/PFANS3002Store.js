import {
  createHotelReservation,
  getHotelReservation,
  getHotelReservationOne,
  updateHotelReservation
} from './PFANS3002Api'

const PFANS3002Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getHotelReservation() {
      return new Promise((resolve, reject) => {
        getHotelReservation().then(response => {
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
    getHotelReservationOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getHotelReservationOne(data).then(response => {
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
    updateHotelReservation({commit}, data) {
      return new Promise((resolve, reject) => {
        updateHotelReservation(data).then(response => {
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
    createHotelReservation({commit}, data) {
      return new Promise((resolve, reject) => {
        createHotelReservation(data).then(response => {
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

export default PFANS3002Store;
