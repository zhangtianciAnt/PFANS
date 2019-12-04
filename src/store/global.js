const global = {
  namespaced: true,
  state: {
    historyUrl: "",
    operateId: "",
    currentUrl: "",
    userinfo: "",
    customersInfo: [],
    userList:[],
    workflowUrl:"",
    orgList:[],
    dictionaryList:[],
    days:[],
    fileToken:""
  },
  mutations: {
    SET_HISTORYURL(state, url) {
      state.historyUrl = url
    },
    SET_OPERATEID(state, id) {
      state.operateId = id
    },
    SET_CURRENTURL(state, url) {
      state.currentUrl = url
    },
    SET_USERINFO(state, val) {
      state.userinfo = val
    },
    SET_CUSTOMERSINFO(state, infos) {
      state.customersInfo = infos
    },
    SET_USERLIST(state, infos) {
      state.userList = infos
    },
    SET_WORKFLOWURL(state, url) {
      state.workflowUrl = url
    },
    SET_ORGLIST(state, infos) {
      state.orgList = infos
    },
    SET_DICTIONARYLIST(state, infos) {
      state.dictionaryList = infos
    },
    SET_DAYS(state, days) {
      state.days = days
    },
    SET_FILETOKEN(state, fileToken) {
      state.fileToken = fileToken
    }
  }
}

export default global;
