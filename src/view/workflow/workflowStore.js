import {
  getWorkflowList,
  delWorkflow,
  createWorkflow,
  getWorkflowOne,
  updateWorkflow
  } from './workflowApi'

  const workflowStore = {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
      //创建流程
      createWorkflow({ commit },data) {
        return new Promise((resolve, reject) => {
          createWorkflow(data).then(response => {
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
      //更新流程
      updateWorkflow({ commit },data) {
        return new Promise((resolve, reject) => {
          updateWorkflow(data).then(response => {
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
      //获取流程
      getWorkflowOne({ commit },data) {
        return new Promise((resolve, reject) => {
          getWorkflowOne(data).then(response => {
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
      //获取流程
      getWorkflowList({ commit }) {
        return new Promise((resolve, reject) => {
          getWorkflowList().then(response => {
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
      //删除流程
      delWorkflow({ commit }, data) {
        return new Promise((resolve, reject) => {
          delWorkflow(data).then(response => {
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
  }

  export default workflowStore;
