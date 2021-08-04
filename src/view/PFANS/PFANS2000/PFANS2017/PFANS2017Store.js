import {getFpans2017List, download,getPunDetail,getFpans2017Listowner,getTodayPunDetaillist,insertHistoricalCard} from './PFANS2017Api'

const PFANS2017Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    //获取异常申请列表信息
    getFpans2017List({commit},data) {
      return new Promise((resolve, reject) => {
        getFpans2017List(data).then(response => {
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
    //获取异常申请中查看打卡记录
    getFpans2017Listowner({commit}) {
      return new Promise((resolve, reject) => {
        getFpans2017Listowner().then(response => {
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
    getPunDetail({commit}, data) {
      return new Promise((resolve, reject) => {
        getPunDetail(data).then(response => {
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
    //获取当日考勤
    getTodayPunDetaillist({commit}) {
      return new Promise((resolve, reject) => {
        getTodayPunDetaillist().then(response => {
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
    //获取当日考勤
    insertHistoricalCard({commit}, params) {
      return new Promise((resolve, reject) => {
        insertHistoricalCard(params).then(response => {
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
  },

};

export default PFANS2017Store;
