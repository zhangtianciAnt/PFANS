import {createPfans2016, getFpans2016List, updatePfans2016,getPfans2016One,
        getOvertimelist,getReplacerest,cklength,updateNewUser} from './PFANS2016Api'
const PFANS2016Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    createPfans2016({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans2016(data).then(response => {
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
    getOvertimelist({commit},data) {
      return new Promise((resolve, reject) => {
        getOvertimelist(data).then(response => {
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

    async updatePfans2016({commit}, data) {
      if(data.errortype === 'PR013006'){
        let userid = {user_id:data.user_id}
        let slectToken = await getReplacerest(userid);
        if(slectToken.data.length >= 0){
          return new Promise((resolve, reject) => {
            resolve('PR013006');
          })
        }
      }
      return new Promise((resolve, reject) => {
        updatePfans2016(data).then(response => {
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

    getFpans2016List({commit}) {
      return new Promise((resolve, reject) => {
        getFpans2016List().then(response => {
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

    getPfans2016One({ commit },data) {
      return new Promise((resolve, reject) => {
        getPfans2016One(data).then(response => {
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

    getReplacerest({ commit },data) {
      return new Promise((resolve, reject) => {
        getReplacerest(data).then(response => {
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

    cklength({ commit },data) {
      return new Promise((resolve, reject) => {
        cklength(data).then(response => {
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

export default PFANS2016Store;
