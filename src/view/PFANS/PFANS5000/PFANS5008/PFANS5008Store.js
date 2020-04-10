import {
  createNewUser,
  getDataList,
  getCompanyProjectList,
  getProjectList,
  updateNewUser,
  getDataOne,
  createProject,
  deletePersonal,
  gettlist,
  downloadList,
  getListcheck,
  CheckList,
  getCheckList
} from './PFANS5008Api'
const PFANS5008Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {

    deletePersonal({ commit },data) {
      return new Promise((resolve, reject) => {
        deletePersonal(data).then(response => {
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

    getListcheck({commit}, data) {
      return new Promise((resolve, reject) => {
        getListcheck(data).then(response => {
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
    downloadList({commit}, data) {
      return new Promise((resolve, reject) => {
        downloadList(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    createProject({ commit },data) {
      return new Promise((resolve, reject) => {
        createProject(data).then(response => {
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
    getDataList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getDataList(data).then(response => {
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
    getCheckList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getCheckList(data).then(response => {
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
    CheckList({ commit }, data) {
      return new Promise((resolve, reject) => {
        CheckList(data).then(response => {
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
    gettlist({ commit }, data) {
      return new Promise((resolve, reject) => {
        gettlist(data).then(response => {
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
    getCompanyProjectList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getCompanyProjectList(data).then(response => {
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
    getProjectList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getProjectList(data).then(response => {
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
    updateNewUser({ commit },data) {
      return new Promise((resolve, reject) => {
        updateNewUser(data).then(response => {
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
    getDataOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getDataOne(data).then(response => {
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

export default PFANS5008Store;
