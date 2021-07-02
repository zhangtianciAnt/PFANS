import {get, selectById, update,generateJxls,getDataOne,getDataOne2,checkby,getList,dataCarryover} from './PFANS1025Api'


const PFANS1025Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    get({commit}, data) {
      return new Promise((resolve, reject) => {
        get(data).then(response => {
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
    // 禅道任务152
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
    getDataOne2({ commit },data) {
      return new Promise((resolve, reject) => {
        getDataOne2(data).then(response => {
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
    // 禅道任务152
    //ADD-WS-7/14-禅道144任务
    checkby({ commit },data) {
      return new Promise((resolve, reject) => {
        checkby(data).then(response => {
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
    //ADD-WS-7/14-禅道144任务
    generateJxls({commit}, data) {
      return new Promise((resolve, reject) => {
        generateJxls(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    //add ccm 0723
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
    //add ccm 0723
    //其他决裁书数据结转
    dataCarryover({ commit },data) {
      return new Promise((resolve, reject) => {
        dataCarryover(data).then(response => {
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

export default PFANS1025Store;
