import store from "./index";

const global = {
  namespaced: true,
  state: {
    historyUrl: "",
    operateId: "",
    currentUrl: "",
    userinfo: "",
    monthlyrate:[],
    customersInfo: [],
    userList:[],
    workflowUrl:"",
    orgList:[],
    orgCenterList:[],
    orgGroupList:[],
    orgGroupallList:[],
    dictionaryList:[],
    days:[],
    fileToken:"",
    cooperinterviewList:[],
    supplierinforList:[],
    orgId:"",
    userTableList:[],
    useraccount:"",
    //add gbb 20210311 PSDCD_PFANS_20210304_BUG_026登录人权限 start
    roles: "",
    //add gbb 20210311 PSDCD_PFANS_20210304_BUG_026登录人权限 start
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
                  if (infos[i].orgs[j].orgs[x].type === "2") {
                    state.orgGroupallList.push({
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
      //add gbb 20210311 PSDCD_PFANS_20210304_BUG_026登录人权限 start
      let roles = '';
      let returnroles = '';
      if (useraccount.roles && useraccount.roles.length > 0) {
        for (let role of useraccount.roles) {
          roles = roles + ',' + role.rolename;
        }
        if (roles.indexOf('系统管理员') != -1) {
          returnroles = returnroles + ',' + '1';
        }
        if (roles.indexOf('总经理') != -1) {
          returnroles = returnroles + ',' + '2';
        }
        if (roles.indexOf('center长') != -1) {
          returnroles = returnroles + ',' + '3';
        }
        if (roles.indexOf('GM') != -1) {
          returnroles = returnroles + ',' + '4';
        }
        if (roles.indexOf('TL') != -1) {
          returnroles = returnroles + ',' + '5';
        }
        if (roles.indexOf('正式社员') != -1) {
          returnroles = returnroles + ',' + '6';
        }
        if (roles.indexOf('财务部长') != -1) {
          returnroles = returnroles + ',' + '7';
        }
        if (roles.indexOf('人事总务部长') != -1) {
          returnroles = returnroles + ',' + '8';
        }
        if (roles.indexOf('企划部长') != -1) {
          returnroles = returnroles + ',' + '9';
        }
        if (roles.indexOf('合同担当') != -1) {
          returnroles = returnroles + ',' + '10';
        }
        if (roles.indexOf('信息安全担当') != -1) {
          returnroles = returnroles + ',' + '11';
        }
        if (roles.indexOf('IT担当') != -1) {
          returnroles = returnroles + ',' + '12';
        }
        if (roles.indexOf('外注管理担当') != -1) {
          returnroles = returnroles + ',' + '13';
        }
        if (roles.indexOf('工资计算担当') != -1) {
          returnroles = returnroles + ',' + '14';
        }
        if (roles.indexOf('招聘担当') != -1) {
          returnroles = returnroles + ',' + '15';
        }
        if (roles.indexOf('总务担当') != -1) {
          returnroles = returnroles + ',' + '16';
        }
        if (roles.indexOf('财务担当') != -1) {
          returnroles = returnroles + ',' + '17';
        }
        if (roles.indexOf('外协员工') != -1) {
          returnroles = returnroles + ',' + '18';
        }
        if (roles.indexOf('外协staff') != -1) {
          returnroles = returnroles + ',' + '19';
        }
        if (roles.indexOf('司机') != -1) {
          returnroles = returnroles + ',' + '20';
        }
        if (roles.indexOf('招聘_全人员') != -1) {
          returnroles = returnroles + ',' + '21';
        }
        if (roles.indexOf('军权_合同，PJ所有') != -1) {
          returnroles = returnroles + ',' + '22';
        }
        if (roles.indexOf('盘点') != -1) {
          returnroles = returnroles + ',' + '23';
        }
        if (roles.indexOf('离职审批人员') != -1) {
          returnroles = returnroles + ',' + '24';
        }
        if (roles.indexOf('纳品担当') != -1) {
          returnroles = returnroles + ',' + '25';
        }
        if (roles.indexOf('请求担当') != -1) {
          returnroles = returnroles + ',' + '26';
        }
        if (roles.indexOf('前台总务') != -1) {
          returnroles = returnroles + ',' + '27';
        }
        if (roles.indexOf('PL权限') != -1) {
          returnroles = returnroles + ',' + '28';
        }
        if (roles.indexOf('离职担当') != -1) {
          returnroles = returnroles + ',' + '29';
        }
        if (roles.indexOf('工会担当') != -1) {
          returnroles = returnroles + ',' + '30';
        }
        if (roles.indexOf('研修担当') != -1) {
          returnroles = returnroles + ',' + '31';
        }
        if (roles.indexOf('法务') != -1) {
          returnroles = returnroles + ',' + '32';
        }
        if (roles.indexOf('项目管理担当（财务）') != -1) {
          returnroles = returnroles + ',' + '33';
        }
        if (roles.indexOf('其他合同担当') != -1) {
          returnroles = returnroles + ',' + '34';
        }
        if (roles.indexOf('IT担当-采购资产编号维护') != -1) {
          returnroles = returnroles + ',' + '35';
        }
        if (roles.indexOf('财务担当-采购资产编号维护') != -1) {
          returnroles = returnroles + ',' + '36';
        }
      }
      state.roles = returnroles.substring(1, returnroles.length);
      //add gbb 20210311 PSDCD_PFANS_20210304_BUG_026登录人权限 end
    },
    SET_OPERATEOWNER(state, operateOwner) {
      state.operateOwner = operateOwner
    },
    //add-ws-12/10-汇率字典
    SET_MONTHLYRATE(state, monthlyrate) {
      state.monthlyrate = monthlyrate
    },
    //add-ws-12/10-汇率字典
  }
}

export default global;
