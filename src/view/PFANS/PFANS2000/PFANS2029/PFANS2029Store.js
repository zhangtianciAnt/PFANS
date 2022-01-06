import {
  download,
  getFpans2029List,
  getFpans2029Listowner,
  getPunDetail,
} from './PFANS2029Api';

const PFANS2029Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    //获取异常申请列表信息
    getFpans2029List({commit}, data) {
      return new Promise((resolve, reject) => {
        getFpans2029List(data).then(response => {
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
    //获取异常申请中查看打卡记录
    getFpans2029Listowner({commit}) {
      return new Promise((resolve, reject) => {
        getFpans2029Listowner().then(response => {
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
    //获取打卡详细
    getPunDetail({commit}, data) {
      return new Promise((resolve, reject) => {
        getPunDetail(data).then(response => {
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
  },
};

export default PFANS2029Store;
