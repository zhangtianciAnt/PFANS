import {getLunarbonus,selectById,update,insert} from './PFANS2027Api'

const PFANS2027Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //查看列表
    getLunarbonus({ commit },data) {
      return new Promise((resolve, reject) => {
        getLunarbonus(data).then(response => {
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


    //根据id获取
    // selectById({commit}, data) {
    //   return new Promise((resolve, reject) => {
    //     selectById(data).then(response => {
    //       if (response.code === 0) {
    //         resolve(response.data);
    //       } else {
    //         reject(response.message)
    //       }
    //     }).catch(error => {
    //       reject(error);
    //     })
    //   })
    // },
    // //更新
    // update({commit}, data) {
    //   return new Promise((resolve, reject) => {
    //     update(data).then(response => {
    //       if (response.code === 0) {
    //         resolve(response.data);
    //       } else {
    //         reject(response.message)
    //       }
    //     }).catch(error => {
    //       reject(error);
    //     })
    //   })
    // },
    // //新建
    // insert({commit}, data) {
    //   return new Promise((resolve, reject) => {
    //     insert(data).then(response => {
    //       if (response.code === 0) {
    //         resolve(response.data);
    //       } else {
    //         reject(response.message)
    //       }
    //     }).catch(error => {
    //       reject(error);
    //     })
    //   })
    // },
  }
};
export default PFANS2027Store;









