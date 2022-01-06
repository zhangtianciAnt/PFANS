import {getLogPerson, updateByVoId} from './PFANS5016Api';

const PFANS5016Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //region scc add 9/9 日志人别 from
    getLogPerson({commit}, data) {
      return new Promise((resolve, reject) => {
        getLogPerson(data).then(response => {
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
    //endregion scc add 9/9 日志人别 to

    updateByVoId({commit}, data) {
      return new Promise((resolve, reject) => {
        updateByVoId(data).then(response => {
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

export default PFANS5016Store;


