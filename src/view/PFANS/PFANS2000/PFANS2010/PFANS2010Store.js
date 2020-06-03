import {
  getlist,
  getAttendancelist,
  getAttendancelist1,
  update,
  updStatus
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

    //获取详细 --日志使用
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

    //获取详细 --考勤使用
    getAttendancelist1({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAttendancelist1(data).then(response => {
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
    },
    //add_fjl_05/13   --添加审批正常结束后，自动变成承认状态
    //更新状态
    updStatus({commit}, data) {
      return new Promise((resolve, reject) => {
        updStatus(data).then(response => {
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
    //add_fjl_05/13   --添加审批正常结束后，自动变成承认状态

  }
}

export default PFANS2010Store;
