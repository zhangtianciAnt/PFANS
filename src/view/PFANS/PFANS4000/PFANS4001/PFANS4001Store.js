import {
  createbook,
  createPfans4001,
  getEffSeal,
  getFpans4001List,
  getPfans4001One,
  insertnamedialog,
  insertrecognition,
  sealDetailList,
  sealList,
  selectcognition,
  selectEffective,
  updatePfans4001,
} from './PFANS4001Api';

const PFANS4001store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    selectcognition({commit}) {
      return new Promise((resolve, reject) => {
        selectcognition().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    insertrecognition({commit}, data) {
      return new Promise((resolve, reject) => {
        insertrecognition(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    insertnamedialog({commit}, data) {
      return new Promise((resolve, reject) => {
        insertnamedialog(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    createPfans4001({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans4001(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    createbook({commit}, data) {
      return new Promise((resolve, reject) => {
        createbook(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },


    updatePfans4001({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans4001(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

    getFpans4001List({commit}) {
      return new Promise((resolve, reject) => {
        getFpans4001List().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
//页面增加分页 ztc 1129 fr
    sealList({commit}) {
      return new Promise((resolve, reject) => {
        sealList().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    sealDetailList({commit}) {
      return new Promise((resolve, reject) => {
        sealDetailList().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //页面增加分页 ztc 1129 to

    getPfans4001One({commit}, data) {
      return new Promise((resolve, reject) => {
        getPfans4001One(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

    selectEffective({commit}, data) {
      return new Promise((resolve, reject) => {
        selectEffective(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
          // 盖印监管者增加履历 ztc 0723 fr
        }).catch(error => {
          reject(error);
        });
      });
    },

    getEffSeal({commit}, data) {
      return new Promise((resolve, reject) => {
        getEffSeal(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
          // 盖印监管者增加履历 ztc 0723 to
        }).catch(error => {
          reject(error);
        });
      });
    },

  },
};

export default PFANS4001store;
