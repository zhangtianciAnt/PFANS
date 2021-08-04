import {
  createBusinessCard,
  getBusinessCard,
  getBusinessCardOne,
  updateBusinessCard
}
from './PFANS3003Api'

const PFANS3003Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getBusinessCard() {
      return new Promise((resolve, reject) => {
        getBusinessCard().then(response => {
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
    getBusinessCardOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getBusinessCardOne(data).then(response => {
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
    updateBusinessCard({commit}, data) {
      return new Promise((resolve, reject) => {
        updateBusinessCard(data).then(response => {
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
    createBusinessCard({commit}, data) {
      return new Promise((resolve, reject) => {
        createBusinessCard(data).then(response => {
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

export default PFANS3003Store;
