import {
  getHoliday,
  selectById,
  update,
  insert,
  } from './PFANS1022Api'

  const PFANS1022Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      getHoliday() {
        return new Promise((resolve, reject) => {
          getHoliday().then(response => {
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

  export default PFANS1022Store;
