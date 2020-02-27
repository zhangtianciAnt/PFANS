import {getCustomerInfo} from '../PFANS1038/PFANS1038Api';

const PFANS1038Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getCustomerInfo({ commit },id) {
      return new Promise((resolve, reject) => {
        getCustomerInfo(id).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default PFANS1038Store;
