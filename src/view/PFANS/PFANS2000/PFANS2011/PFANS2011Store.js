import {createOvertime, getOvertime, getOvertimeOne, updateOvertime, getList} from './PFANS2011Api'

const PFANS2011Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    getOvertime() {
      return new Promise((resolve, reject) => {
        getOvertime().then(response => {
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
    getOvertimeOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getOvertimeOne(data).then(response => {
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
    updateOvertime({ commit },data) {
      return new Promise((resolve, reject) => {
        updateOvertime(data).then(response => {
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
    createOvertime({ commit },data) {
      return new Promise((resolve, reject) => {
        createOvertime(data).then(response => {
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
};

export default PFANS2011Store;
