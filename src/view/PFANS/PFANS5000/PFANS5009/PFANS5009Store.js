import {
  selectById,
  update,
  insert,
  getFpans5001List,
  } from './PFANS5009Api'

  const PFANS5009Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
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
      getFpans5001List({commit},data) {
        return new Promise((resolve, reject) => {
          getFpans5001List(data).then(response => {
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
      update({commit}, data) {
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
      insert({commit}, data) {
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

  export default PFANS5009Store;
