import {
  getRecruit,
  getRecruitOne,
  updateRecruit,
  createRecruit,
  getForSelect,
  getCompanyProjectList,
  } from './PFANS2001Api'

  const PFANS2001Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      getRecruit() {
        return new Promise((resolve, reject) => {
          getRecruit().then(response => {
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
      getRecruitOne({ commit },data) {
        return new Promise((resolve, reject) => {
          getRecruitOne(data).then(response => {
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
      updateRecruit({ commit },data) {
        return new Promise((resolve, reject) => {
          updateRecruit(data).then(response => {
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
      createRecruit({ commit },data) {
        return new Promise((resolve, reject) => {
          createRecruit(data).then(response => {
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

  export default PFANS2001Store;
