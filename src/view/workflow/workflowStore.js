import {
  allWorkFlowIns,
  createWorkflow,
  delWorkflow,
  getWorkflowList,
  getWorkflowOne,
  oneWorkFlowIns,
  updateWorkflow,
} from './workflowApi';

const workflowStore = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //创建流程
    createWorkflow({commit}, data) {
      return new Promise((resolve, reject) => {
        createWorkflow(data).then(response => {
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
    //更新流程
    updateWorkflow({commit}, data) {
      return new Promise((resolve, reject) => {
        updateWorkflow(data).then(response => {
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
    //获取流程
    getWorkflowOne({commit}, data) {
      return new Promise((resolve, reject) => {
        getWorkflowOne(data).then(response => {
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
    //获取流程
    getWorkflowList({commit}) {
      return new Promise((resolve, reject) => {
        getWorkflowList().then(response => {
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
    //删除流程
    delWorkflow({commit}, data) {
      return new Promise((resolve, reject) => {
        delWorkflow(data).then(response => {
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

    allWorkFlowIns({commit}, data) {
      return new Promise((resolve, reject) => {
        allWorkFlowIns(data).then(response => {
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
    //ccm 20200713 离职 获取离职人员离职月的考勤审批情况
    oneWorkFlowIns({commit}, data) {
      return new Promise((resolve, reject) => {
        oneWorkFlowIns(data).then(response => {
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
    //ccm 20200713 离职 获取离职人员离职月的考勤审批情况
  },
};

export default workflowStore;
