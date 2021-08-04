import {
  update,
  create,
  list,
  slectlist,
  slectlist2
} from './PFANS8011Api'

const PFANS8011Store = {
  namespaced: true,
  actions: {
    list() {
      return new Promise((resolve, reject) => {
        list().then(response => {
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
    create({commit}, data) {
      return new Promise((resolve, reject) => {
        create(data).then(response => {
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
    update({commit}, data) {
      return new Promise((resolve, reject) => {
        update(data).then(response => {
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
    slectlist2({commit}) {
      return new Promise((resolve, reject) => {
        slectlist2().then(response => {
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
    slectlist({commit}, data) {
      return new Promise((resolve, reject) => {
        slectlist(data).then(response => {
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
  }
}

export default PFANS8011Store;
