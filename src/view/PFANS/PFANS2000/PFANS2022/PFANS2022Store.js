import {
  getCasgiftApply,
  getCasgiftApplyList,
  getCasgiftApplyOne,
  insert,
  updateCasgiftApply,
  updateCasgiftApplyList,
} from './PFANS2022Api';

const PFANS2022Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getCasgiftApply() {
      return new Promise((resolve, reject) => {
        getCasgiftApply().then(response => {
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
    getCasgiftApplyOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getCasgiftApplyOne(data).then(response => {
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
    updateCasgiftApply({commit}, data) {
      return new Promise((resolve, reject) => {
        updateCasgiftApply(data).then(response => {
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
    insert({commit}, data) {
      return new Promise((resolve, reject) => {
        insert(data).then(response => {
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
    getCasgiftApplyList({commit}, data) {
      return new Promise((resolve, reject) => {
        getCasgiftApplyList(data).then(response => {
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
    //add gbb 祝礼金申请关联发放 start
    updateCasgiftApplyList({commit}, data) {
      return new Promise((resolve, reject) => {
        updateCasgiftApplyList(data).then(response => {
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
    //add gbb 祝礼金申请关联发放 end
  },
};

export default PFANS2022Store;
