import {
  getCasgiftApply,
  getCasgiftApplyOne,
  updateCasgiftApply,
  createCasgiftApply,
  getCasgiftApplyList
  } from './PFANS2022Api'

  const PFANS2022Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      getCasgiftApply() {
        return new Promise((resolve, reject) => {
          getCasgiftApply().then(response => {
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
      getCasgiftApplyOne({ commit },data) {
        return new Promise((resolve, reject) => {
          getCasgiftApplyOne(data).then(response => {
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
      updateCasgiftApply({ commit },data) {
        return new Promise((resolve, reject) => {
          updateCasgiftApply(data).then(response => {
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
      createCasgiftApply({ commit },data) {
        return new Promise((resolve, reject) => {
          createCasgiftApply(data).then(response => {
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
      getCasgiftApplyList({ commit },data) {
        return new Promise((resolve, reject) => {
          getCasgiftApplyList(data).then(response => {
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

  export default PFANS2022Store;
