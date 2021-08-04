import {
  get,
  insert,
  update,
  getOne,
  getNameList
} from './PFANS2002Api'


const PFANS2002Store = {
  namespaced: true,
  actions: {
    get() {
      return new Promise((resolve, reject) => {
        get().then(response => {
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
    getNameList({commit}, data) {
      return new Promise((resolve, reject) => {
        getNameList(data).then(response => {
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

export default PFANS2002Store;
