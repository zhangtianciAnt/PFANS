import store from "./index";

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
    orgCenterList:[],
    orgGroupList:[],
    dictionaryList:[],
    days:[],
    fileToken:"",
    cooperinterviewList:[],
    supplierinforList:[],
    orgId:"",
    userTableList:[],
    useraccount:"",
    operateOwner:"",
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
      for (let i = 0; i < infos.length; i++) {
        if (infos[i].orgs != null) {
          //center
          for (let j = 0; j < infos[i].orgs.length; j++) {
            if (infos[i].orgs[j].orgs != null) {
              if (infos[i].orgs[j].type === "1") {
                state.orgCenterList.push(infos[i].orgs[j]);
                //group
                for (let x = 0; x < infos[i].orgs[j].orgs.length; x++) {
                  if (infos[i].orgs[j].orgs[x].orgs != null) {
                    if (infos[i].orgs[j].orgs[x].type === "2") {
                      state.orgGroupList.push({
                        centerid: infos[i].orgs[j]._id,
                        centername: infos[i].orgs[j].companyname,
                        groupid: infos[i].orgs[j].orgs[x]._id,
                        groupname: infos[i].orgs[j].orgs[x].companyname,
                        companyen: infos[i].orgs[j].orgs[x].companyen,
                        encoding: infos[i].orgs[j].orgs[x].encoding,
                        redirict:infos[i].orgs[j].orgs[x].redirict
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    SET_DICTIONARYLIST(state, infos) {
      state.dictionaryList = infos
    },
    SET_DAYS(state, days) {
      state.days = days
    },
    SET_FILETOKEN(state, fileToken) {
      state.fileToken = fileToken
    },
    SET_COOPERINTERVIEWLIST(state, infos) {
      state.cooperinterviewList = infos
    },
    SET_SUPPLIERINFOR(state, infos) {
      state.supplierinforList = infos
    },
    SET_ORGID(state, orgId) {
      state.orgId = orgId
    },
    SET_USERTABLELIST(state, userTableList) {
      state.userTableList = userTableList
    },
    SET_USERACCOUNT(state, useraccount) {
      state.useraccount = useraccount
    },
    SET_OPERATEOWNER(state, operateOwner) {
      state.operateOwner = operateOwner
    },
  }
}

export default global;
