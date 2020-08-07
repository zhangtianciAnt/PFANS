import {createPfans2016, getFpans2016List, updatePfans2016,getPfans2016One,
        getOvertimelist,getReplacerest,cklength,updateNewUser,getSickleave,getFpans2016List2,
  selectAbNormalParent, updateOvertime, getRestday, getLeaveNumber,getremainingByuserid
} from './PFANS2016Api'

const PFANS2016Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    getLeaveNumber({commit}, data) {
      return new Promise((resolve, reject) => {
        getLeaveNumber(data).then(response => {
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

    updateOvertime({commit}, data) {
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

      updatePfans2016({commit}, data) {
      // if(data.errortype === 'PR013006'){
      //   let userid = {user_id:data.user_id}
      //   let slectToken = await getReplacerest(userid);
      //   if(slectToken.data.length >= 0){
      //     return new Promise((resolve, reject) => {
      //       resolve('PR013006');
      //     })
      //   }
      // }
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

    getFpans2016List({commit},data) {
      return new Promise((resolve, reject) => {
        getFpans2016List(data).then(response => {
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
    //add-ws-6/8-禅道035
    getFpans2016List2({commit}) {
      return new Promise((resolve, reject) => {
        getFpans2016List2().then(response => {
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
    //add-ws-6/8-禅道035
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

    getSickleave({commit}, data) {
      return new Promise((resolve, reject) => {
        getSickleave(data).then(response => {
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

    selectAbNormalParent({commit}, data) {
      return new Promise((resolve, reject) => {
        selectAbNormalParent(data).then(response => {
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
    //add_fjl_05/26 --添加代休剩余
    getRestday({commit}, data) {
      return new Promise((resolve, reject) => {
        getRestday(data).then(response => {
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
    //add_fjl_05/26 --添加代休剩余
    //add ccm 0806 查询申请人的剩余年休，
    getremainingByuserid({commit}, data) {
      return new Promise((resolve, reject) => {
        getremainingByuserid(data).then(response => {
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
    //add ccm 0806 查询申请人的剩余年休，
  }
};

export default PFANS2016Store;
