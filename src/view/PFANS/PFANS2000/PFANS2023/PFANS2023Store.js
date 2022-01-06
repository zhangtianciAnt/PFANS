import {
  change,
  createPfans2023,
  download,
  getDataOne,
  getFpans2023List,
  updatePfans2023,
  yearsCheck,
} from './PFANS2023Api';

const PFANS2023Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //创建流程
    createPfans2023({commit}, data) {
      return new Promise((resolve, reject) => {
        createPfans2023(data).then(response => {
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
    //更新流程
    updatePfans2023({commit}, data) {
      return new Promise((resolve, reject) => {
        updatePfans2023(data).then(response => {
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
    //目标管理数据转结
    change({commit}, data) {
      return new Promise((resolve, reject) => {
        change(data).then(response => {
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
    //获取流程
    getFpans2023List({commit}, data) {
      return new Promise((resolve, reject) => {
        getFpans2023List(data).then(response => {
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
    //一个事业年度一条的check
    yearsCheck({commit}, data) {
      return new Promise((resolve, reject) => {
        yearsCheck(data).then(response => {
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
    getDataOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getDataOne(data).then(response => {
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
    download({commit}, data) {
      return new Promise((resolve, reject) => {
        download(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
  },
};

export default PFANS2023Store;
