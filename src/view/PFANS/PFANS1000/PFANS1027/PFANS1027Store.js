import {
  get,
  update,
  selectById,
  getQuotation,
  downLoad
  } from './PFANS1027Api'

  const PFANS1027Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      get() {
        return new Promise((resolve, reject) => {
          get().then(response => {
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
      //  add  ml  211130  报价单分页  from
      getQuotation() {
        return new Promise((resolve, reject) => {
          getQuotation().then(response => {
            if (response.code === 0) {
              resolve(response.data);
            } else {
              reject(response.message);
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
      //  add  ml  211130  报价单分页  to
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
      downLoad({commit}, data) {
        return new Promise((resolve, reject) => {
          downLoad(data).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          })
        })
      },
    }
  };

  export default PFANS1027Store;
