import {
  getConfidential,
  selectById,
  updateConfidential,
  createConfidential,
  getForSelect,
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
      selectById({ commit },data) {
        return new Promise((resolve, reject) => {
          selectById(data).then(response => {
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
      updateConfidential({ commit },data) {
        return new Promise((resolve, reject) => {
          updateConfidential(data).then(response => {
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
      createConfidential({ commit },data) {
        return new Promise((resolve, reject) => {
          createConfidential(data).then(response => {
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
      getForSelect ({commit}, data) {
        return new Promise((resolve, reject) => {
          getForSelect(data).then(response => {
            if (response.code === 0) {
              resolve(response.data)
            } else {
              reject(response.message)
            }
          }).catch(error => {
            reject(error)
          })
        })
      },
    }
  };

  export default PFANS1023Store;
