import {getList, updList} from './PFANS6012Api';

const PFANS6012Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    //region scc add 11/11 请负一览页面数据获取 from
    getList({commit}, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(response => {
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
    //endregion scc add 11/11 请负一览页面数据获取 to

    //region scc add 11/11 更新处理状态 from
    updList({commit}, data) {
      return new Promise((resolve, reject) => {
        updList(data).then(response => {
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
    //endregion scc add 11/11 更新处理状态 to

  },
};

export default PFANS6012Store;
