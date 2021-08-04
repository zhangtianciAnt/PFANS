import {
  getConfidential,
  getConfidentialOne,
  update,
  insert,
  } from './PFANS1023Api'

  const PFANS1023Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      getConfidential() {
        return new Promise((resolve, reject) => {
          getConfidential().then(response => {
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
      getConfidentialOne({ commit },data) {
        return new Promise((resolve, reject) => {
          getConfidentialOne(data).then(response => {
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
      update({ commit },data) {
        return new Promise((resolve, reject) => {
          update(data).then(response => {
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
      insert({ commit },data) {
        return new Promise((resolve, reject) => {
          insert(data).then(response => {
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

  export default PFANS1023Store;
