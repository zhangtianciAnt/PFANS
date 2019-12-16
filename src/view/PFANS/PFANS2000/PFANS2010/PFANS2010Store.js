import {
  getlist,
  getAttendancelist,
  update
} from './PFANS2010Api'

const PFANS2010Store = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    //获取列表
    getlist({ commit }, data) {
      return new Promise((resolve, reject) => {
        getlist(data).then(response => {
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

    //获取详细
    getAttendancelist({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAttendancelist(data).then(response => {
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

    //更新数据
    update({ commit }, data) {
      return new Promise((resolve, reject) => {
        update(data).then(response => {
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
}

export default PFANS2010Store;
