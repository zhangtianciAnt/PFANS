import {
  getInformation,
  insertInformation,
  updateInformation,
  getOneInformation,
  getListType,
  getListByManager,getByManager
} from './PFANS8008Api'

const PFANS8008Store = {
  namespaced: true,
  actions: {
    getInformation() {
      return new Promise((resolve, reject) => {
        getInformation().then(response => {
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
    insertInformation({ commit },data) {
      return new Promise((resolve, reject) => {
        insertInformation(data).then(response => {
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
    updateInformation({ commit },data) {
      return new Promise((resolve, reject) => {
        updateInformation(data).then(response => {
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
    getOneInformation({ commit },data) {
      return new Promise((resolve, reject) => {
        getOneInformation(data).then(response => {
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
    //region scc add 主页获取博客有效数据 from
    getListByManager() {
      return new Promise((resolve, reject) => {
        getListByManager().then(response => {
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
    //endregion scc add 主页获取博客有效数据 to
    //region scc add 获取博客一览 from
    getByManager() {
      return new Promise((resolve, reject) => {
        getByManager().then(response => {
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
    //endregion scc add 获取博客一览 to
  }
}

export default PFANS8008Store;
