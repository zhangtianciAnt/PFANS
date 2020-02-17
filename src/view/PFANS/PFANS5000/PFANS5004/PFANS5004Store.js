
import {getFpans5001List, update,selectById} from "../PFANS5001/PFANS5001Api";

const PFANS5004Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
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
    selectById({commit}, data) {
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
  }
}
export default PFANS5004Store;









