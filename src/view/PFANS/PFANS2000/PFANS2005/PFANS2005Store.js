import {creategiving,deleteFive,givinglist,deleteteappreciation, getDataList,getCasgiftApply,deleteothertwo,
  deleteotherfour,save,deleteadditional
} from './PFANS2005Api'
import {updateNewUser} from "../../PFANS5000/PFANS5008/PFANS5008Api";
const PFANS2005Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    creategiving({commit}, data) {
      return new Promise((resolve, reject) => {
        creategiving(data).then(response => {
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

    deleteothertwo({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteothertwo(data).then(response => {
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

    deleteadditional({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteadditional(data).then(response => {
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

    deleteotherfour({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteotherfour(data).then(response => {
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
    deleteteappreciation({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteteappreciation(data).then(response => {
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
    givinglist({ commit },data) {
      return new Promise((resolve, reject) => {
        givinglist(data).then(response => {
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
    deleteFive({ commit },data) {
      return new Promise((resolve, reject) => {
        deleteFive(data).then(response => {
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
    getCasgiftApply() {
      return new Promise((resolve, reject) => {
        getCasgiftApply().then(response => {
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
    getDataList() {
      return new Promise((resolve, reject) => {
        getDataList().then(response => {
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
    //更新
    save({commit}, data) {
      return new Promise((resolve, reject) => {
        save(data).then(response => {
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

export default PFANS2005Store;
