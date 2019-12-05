import {
  getSecurity,
  selectById,
  updateSecurity,
  createSecurity,
  getForSelect,
  getCompanyProjectList,
  } from './PFANS1021Api'

  const PFANS1021Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      getSecurity() {
        return new Promise((resolve, reject) => {
          getSecurity().then(response => {
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
      updateSecurity({ commit },data) {
        return new Promise((resolve, reject) => {
          updateSecurity(data).then(response => {
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
      createSecurity({ commit },data) {
        return new Promise((resolve, reject) => {
          createSecurity(data).then(response => {
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
      getCompanyProjectList({ commit }, data) {
        return new Promise((resolve, reject) => {
          getCompanyProjectList(data).then(response => {
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

  export default PFANS1021Store;
