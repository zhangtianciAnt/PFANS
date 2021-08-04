import {list, selectlist, insert, getradio} from './PFANS1049Api';



const PFANS1049store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getradio({commit}, data) {
      return new Promise((resolve, reject) => {
        getradio(data).then(response => {
          if ( response.type.indexOf("json") == -1 ) {
            resolve(response)
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
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    selectlist({commit}, data) {
      return new Promise((resolve, reject) => {
        selectlist(data).then(response => {
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
    list() {
      return new Promise((resolve, reject) => {
        list().then(response => {
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
  },
};

export default PFANS1049store;
