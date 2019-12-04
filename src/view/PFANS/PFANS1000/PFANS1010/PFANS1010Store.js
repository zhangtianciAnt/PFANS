import {getCommunication,getCommunicationOne, updateCommunication,createCommunication} from './PFANS1010Api'

const PFANS1010Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getCommunication() {
      return new Promise((resolve, reject) => {
        getCommunication().then(response => {
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

    getCommunicationOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getCommunicationOne(data).then(response => {
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

    updateCommunication({commit}, data) {
      return new Promise((resolve, reject) => {
        updateCommunication(data).then(response => {
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

    createCommunication({commit}, data) {
      return new Promise((resolve, reject) => {
        createCommunication(data).then(response => {
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

export default PFANS1010Store;
