import {getLunarbonus,getLunardetails,update,insertLunarbonus,getExaminationobject,getStatus,getOne} from './PFANS2027Api'
import {getPfans2016One} from "../PFANS2016/PFANS2016Api";

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

    //获取详情列表初始数据
    getOne({ commit },data) {
      return new Promise((resolve, reject) => {
        getOne(data).then(response => {
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

    getLunardetails({ commit },data) {
      return new Promise((resolve, reject) => {
        getLunardetails(data).then(response => {
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

    //更新
    update({commit}, data) {
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
    //新建
    insertLunarbonus({commit}, data) {
      return new Promise((resolve, reject) => {
        insertLunarbonus(data).then(response => {
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
    getExaminationobject({commit}, data) {
      return new Promise((resolve, reject) => {
        getExaminationobject(data).then(response => {
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
    getStatus({commit}, data) {
      return new Promise((resolve, reject) => {
        getStatus(data).then(response => {
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
  }
};
export default PFANS2027Store;









