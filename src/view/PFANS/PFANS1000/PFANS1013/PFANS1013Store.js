import {exportjs, create, get, selectById, gettravelcostvo, update, getdate, getLoanApplication} from './PFANS1013Api'

const PFANS1013Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //精算书PDF打印
    exportjs({commit}, data) {
      return new Promise((resolve, reject) => {
        exportjs(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    //获取流程
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

    gettravelcostvo({commit}, data) {
      return new Promise((resolve, reject) => {
        gettravelcostvo(data).then(response => {
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

    //获取详细
    selectById({commit}, data) {
      return new Promise((resolve, reject) => {
        selectById(data).then(response => {
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
    //更新流程
    update({commit}, data) {
      return new Promise((resolve, reject) => {
        update(data).then(response => {
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
    //创建流程
    create({commit}, data) {
      return new Promise((resolve, reject) => {
        create(data).then(response => {
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
    getdate({commit}, data) {
      return new Promise((resolve, reject) => {
        getdate(data).then(response => {
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
    getLoanApplication({commit}, data) {
      return new Promise((resolve, reject) => {
        getLoanApplication(data).then(response => {
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
    selectByIdone2({commit}, data) {
      return new Promise((resolve, reject) => {
        selectByIdone2(data).then(response => {
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
};

export default PFANS1013Store;
