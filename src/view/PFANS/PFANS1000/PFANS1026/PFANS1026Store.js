import {
  get,
  update,
  insert,
  insertBook,
  existCheck,
  } from './PFANS1026Api'
import {selectById} from "../PFANS1020/PFANS1020Api";

  const PFANS1026Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      get({ commit },data) {
        return new Promise((resolve, reject) => {
          get(data).then(response => {
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
      insertBook({ commit },data) {
        return new Promise((resolve, reject) => {
          insertBook(data).then(response => {
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
      existCheck({ commit },data) {
        return new Promise((resolve, reject) => {
          existCheck(data).then(response => {
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

  export default PFANS1026Store;
