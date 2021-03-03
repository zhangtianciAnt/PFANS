import {getCustomerInfo,getExpatriatesinfor,getExternal,insert,update,getOne,getAll} from '../PFANS1038/PFANS1038Api';
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
    },
    getExpatriatesinfor({ commit },id) {
      return new Promise((resolve, reject) => {
        getExpatriatesinfor(id).then(response => {
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
    getExternal() {
      return new Promise((resolve, reject) => {
        getExternal().then(response => {
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
          console.log(error)
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
          console.log(error)
          reject(error);
        })
      })
    },
    getOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getOne(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          console.log(error)
          reject(error);
        })
      })
    },
    getAll() {
      return new Promise((resolve, reject) => {
        getAll().then(response => {
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
    // add-lyt-21/1/29-禅道任务648-start
    getPersonalCost({ commit },params) {
      return new Promise((resolve, reject) => {
        getYearsantid(params).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          console.log(error)
          reject(error);
        })
      })
    },
    // add-lyt-21/1/29-禅道任务648-end
  }
}

export default PFANS1038Store;
