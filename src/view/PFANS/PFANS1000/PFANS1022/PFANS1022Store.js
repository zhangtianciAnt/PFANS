import {
  getHoliday,
  selectById,
  updateHoliday,
  createHoliday,
  getForSelect,
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
      updateHoliday({ commit },data) {
        return new Promise((resolve, reject) => {
          updateHoliday(data).then(response => {
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
      createHoliday({ commit },data) {
        return new Promise((resolve, reject) => {
          createHoliday(data).then(response => {
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

  export default PFANS1022Store;
