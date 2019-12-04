import {
  createNewUser,
  getList,
  deleteUser,
} from './PFANS8007Api'
import {getDataList, getDataOne} from "../../PFANS5000/PFANS5008/PFANS5008Api";
const PFANS8007Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {


    createNewUser({ commit },data) {
      return new Promise((resolve, reject) => {
        createNewUser(data).then(response => {
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
    deleteUser({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteUser(data).then(response => {
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
    getList({ commit }, data) {
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

  }
}

export default PFANS8007Store;
