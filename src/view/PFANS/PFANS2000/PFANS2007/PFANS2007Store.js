import { inserttodo,getList,update,download } from './PFANS2007Api'

  const PFANS2007Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      inserttodo({ commit },data) {
        return new Promise((resolve, reject) => {
          inserttodo(data).then(response => {
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
      download({commit}, data) {
        return new Promise((resolve, reject) => {
          download(data).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          })
        })
      },
      getList({ commit },data) {
        return new Promise((resolve, reject) => {
          getList(data).then(response => {
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
    }
  };

  export default PFANS2007Store;
