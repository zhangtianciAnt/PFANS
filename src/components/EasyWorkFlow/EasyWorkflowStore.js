import {
  delWorkflow,
  isDelWorkflow,
  isOperationWorkflow,
  isStartWorkflow,
  isViewWorkflow,
  operationWorkflow,
  selectUserByTenantId,
  startWorkflow,
  viewWorkflow,
  viewWorkflow2
} from './EasyWorkflowApi'

const EasyWorkflowStore = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async IsStartWorkflow ({commit}, conditon) {
      try {
        var result = await isStartWorkflow(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async IsOperationWorkflow ({commit}, conditon) {
      try {
        var result = await isOperationWorkflow(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async IsViewWorkflow ({commit}, conditon) {
      try {
        var result = await isViewWorkflow(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async SelectUserByTenantId ({commit}, conditon) {
      try {
        var result = await selectUserByTenantId(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async ViewWorkflow ({commit}, conditon) {
      try {
        var result = await viewWorkflow(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async ViewWorkflow2 ({commit}, conditon) {
      try {
        var result = await viewWorkflow2(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async OperationWorkflow ({commit}, conditon) {
      try {
        var result = await operationWorkflow(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async StartWorkflow ({commit}, conditon) {
      try {
        var result = await startWorkflow(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async IsDelWorkflow ({commit}, conditon) {
      try {
        var result = await isDelWorkflow(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    },
    async DelWorkflow ({commit}, conditon) {
      try {
        var result = await delWorkflow(conditon)
        return new Promise((resolve, reject) => {
          resolve(result)
        })
      } catch (error) {
        return (Promise.reject(error))
      }
    }
  }
}

export default EasyWorkflowStore
