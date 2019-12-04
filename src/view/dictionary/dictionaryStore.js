import {
  getAll,
  getForSelect,
  updateDictionary,
  getForvalue2,
  getFileToken
} from './dictionaryApi'

const dictionaryStore = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getForSelect ({commit}, data) {
      return new Promise((resolve, reject) => {
        getForSelect(data).then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getFileToken ({commit}) {
      return new Promise((resolve, reject) => {
        getFileToken().then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getForvalue2 ({commit}, data) {
      return new Promise((resolve, reject) => {
        getForvalue2(data).then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAll ({commit}) {
      return new Promise((resolve, reject) => {
        getAll().then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateDictionary({ commit },data) {
      return new Promise((resolve, reject) => {
        updateDictionary(data).then(response => {
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

export default dictionaryStore
