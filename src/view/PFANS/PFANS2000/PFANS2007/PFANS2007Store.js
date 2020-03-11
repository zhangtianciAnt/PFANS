import { getListType,getList } from './PFANS2007Api'

  const PFANS2007Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      getListType() {
        return new Promise((resolve, reject) => {
          getListType().then(response => {
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
    }
  };

  export default PFANS2007Store;
