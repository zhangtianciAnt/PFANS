import {
  selectById,
  update,
  insert,
  createRecruit,
  getForSelect,
  getCompanyProjectList,
  } from './PFANS5009Api'

  const PFANS5009Store = {
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
    }
  };

  export default PFANS5009Store;
