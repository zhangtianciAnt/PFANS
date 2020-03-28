import {getFpans2017List, download,getgetDetail} from './PFANS2017Api'

const PFANS2017Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    //获取异常申请列表信息
    getFpans2017List({commit}) {
      return new Promise((resolve, reject) => {
        getFpans2017List().then(response => {
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
    download({commit}, data) {
      return new Promise((resolve, reject) => {
        download(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    //获取打卡详细
    getgetDetail({commit}, data) {
      return new Promise((resolve, reject) => {
        getgetDetail(data).then(response => {
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

export default PFANS2017Store;
