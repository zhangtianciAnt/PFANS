
import {getstage} from "../PFANS5004/PFANS5004Api";

const PFANS5004Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    getstage({commit}, data) {
      return new Promise((resolve, reject) => {
        getstage(data).then(response => {
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









