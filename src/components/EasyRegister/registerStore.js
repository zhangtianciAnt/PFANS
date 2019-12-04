import { register, getCurrentUserAccount, login, getAllCustomer } from '@/components/EasyRegister/registerApi'
import i18n from '../../assets/js/i18n'

const registerStore = {
  namespaced: true,
  state: {
  },

  mutations: {
  },

  actions: {
    // 注册
    Register({ commit }, data) {
      return new Promise((resolve, reject) => {
        register(data).then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(i18n.t('normal.error_04'))
        })
      })
    },
    //判断账号是否已注册
    GetCurrentUserAccount({ commit }, data) {
      return new Promise((resolve, reject) => {
        getCurrentUserAccount(data).then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(i18n.t('normal.error_01'))
        })
      })
    },
    //登录
    Login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          if (response.code === 0) {
            resolve(response.data)
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(i18n.t('normal.error_04'))
        })
      })
    },
    getAllCustomer({ commit }) {
      return new Promise((resolve, reject) => {
        getAllCustomer().then(response => {
          if (response.code === 0) {
            let infos = [];
            for (let item of response.data) {
              if (item._id !== null && item.userinfo.customername !== null){
                let info = { "userid": item._id, "username": item.userinfo.customername };
                infos.push(info)
              }
            }
            this.$store.commit('global/SET_CUSTOMERSINFO', infos)
          }
        }).catch(error => {
          reject(i18n.t('normal.error_01'))
        })
      })
    }
  }
}

export default registerStore
