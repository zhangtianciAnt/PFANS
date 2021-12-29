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
    orgallList:[],
    orgGroupList:[],
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
    //add gbb 20210329 2021组织架构变更 start
    orgtreeId: "",//树主键
    orguserList:[],//人员选择时树组织隐藏副总经理节点
    //add gbb 20210329 2021组织架构变更 end
    pageNo:1,
    pageSize:50,
    totalSize:0,
    axiosConfig:{},
    //add ztc 添加系统年度 fr
    sysYears:'2021',
    //add ztc 添加系统年度 to
  },
  mutations: {
    SET_AXIOSCONFIG(state, axiosConfig) {
      state.axiosConfig = axiosConfig
    },
    SET_TOTALSIZE(state, totalSize) {
      state.totalSize = totalSize
    },
    SET_PAGENO(state, pageNo) {
      state.pageNo = pageNo
    },
    SET_PAGESIZE(state, pageSize) {
      state.pageSize = pageSize
    },
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
    //add gbb 20210421 获取所有组织信息 start
    SET_ORGALLLIST(state, infos) {
      state.orgallList = infos
    },
    //add gbb 20210421 获取所有组织信息 end
    SET_ORGLIST(state, infos) {
      state.orgList = infos
      //add gbb 20210329 2021组织架构变更 start
      var orgsnew = [];
      if(infos.length > 0){
        //树主键
        state.orgtreeId = infos[0]._id;
        if(infos[0].orgs.length > 0){
          for (let i = 0; i < infos[0].orgs.length; i++) {
            if (infos[0].orgs[i].orgs.length > 0) {
              for (let j = 0; j < infos[0].orgs[i].orgs.length; j++) {
                if (infos[0].orgs[i].orgs[j].type === "1") {
                  //所有center[orgGroupList为center数据]
                  orgsnew.push(infos[0].orgs[i].orgs[j]);
                  state.orgGroupList.push({
                    virtualid: infos[0].orgs[i]._id,
                    virtualname: infos[0].orgs[i].companyname,//副总经理组织
                    virtualuser: infos[0].orgs[i].user,//副总经经理负责人
                    centerid: infos[0].orgs[i].orgs[j]._id,
                    centername: infos[0].orgs[i].orgs[j].companyname,//center组织
                    centeruser: infos[0].orgs[i].orgs[j].user,//center负责人
                    companyen: infos[0].orgs[i].orgs[j].companyen,//英文缩写
                    encoding: infos[0].orgs[i].orgs[j].encoding,//预算编码
                    redirict:infos[0].orgs[i].orgs[j].redirict
                  });
                }
              }
            }
          }
        }
      }
      // for (let i = 0; i < infos.length; i++) {
      //   if (infos[i].orgs != null) {
      //     //center
      //     for (let j = 0; j < infos[i].orgs.length; j++) {
      //       if (infos[i].orgs[j].orgs != null) {
      //         if (infos[i].orgs[j].type === "1") {
      //           //group
      //           for (let x = 0; x < infos[i].orgs[j].orgs.length; x++) {
      //             if (infos[i].orgs[j].orgs[x].orgs != null) {
      //               if (infos[i].orgs[j].orgs[x].type === "2") {
      //                 state.orgGroupList.push({
      //                   centerid: infos[i].orgs[j]._id,
      //                   centername: infos[i].orgs[j].companyname,
      //                   groupid: infos[i].orgs[j].orgs[x]._id,
      //                   groupname: infos[i].orgs[j].orgs[x].companyname,
      //                   companyen: infos[i].orgs[j].orgs[x].companyen,
      //                   encoding: infos[i].orgs[j].orgs[x].encoding,
      //                   redirict:infos[i].orgs[j].orgs[x].redirict
      //                 });
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      //
      state.orguserList = JSON.parse(JSON.stringify(infos));
      state.orguserList[0].orgs = orgsnew;
      //add gbb 20210329 2021组织架构变更 end
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
        roles = roles.replace("副总经理","副总");
        if (roles.indexOf('系统管理员') != -1) {
          returnroles = returnroles + ',' + '10';
        }
        if (roles.indexOf('总经理') != -1) {
          returnroles = returnroles + ',' + '11';
        }
        if (roles.indexOf('center长') != -1) {
          returnroles = returnroles + ',' + '12';
        }
        if (roles.indexOf('GM') != -1) {
          returnroles = returnroles + ',' + '13';
        }
        if (roles.indexOf('TL') != -1) {
          returnroles = returnroles + ',' + '14';
        }
        if (roles.indexOf('正式社员') != -1) {
          returnroles = returnroles + ',' + '15';
        }
        if (roles.indexOf('财务部长') != -1) {
          returnroles = returnroles + ',' + '16';
        }
        if (roles.indexOf('人事总务部长') != -1) {
          returnroles = returnroles + ',' + '17';
        }
        if (roles.indexOf('企划部长') != -1) {
          returnroles = returnroles + ',' + '18';
        }
        if (roles.indexOf('合同担当') != -1) {
          returnroles = returnroles + ',' + '19';
        }
        if (roles.indexOf('信息安全担当') != -1) {
          returnroles = returnroles + ',' + '20';
        }
        if (roles.indexOf('IT担当') != -1) {
          returnroles = returnroles + ',' + '21';
        }
        if (roles.indexOf('外注管理担当') != -1) {
          returnroles = returnroles + ',' + '22';
        }
        if (roles.indexOf('工资计算担当') != -1) {
          returnroles = returnroles + ',' + '23';
        }
        if (roles.indexOf('招聘担当') != -1) {
          returnroles = returnroles + ',' + '24';
        }
        if (roles.indexOf('总务担当') != -1) {
          returnroles = returnroles + ',' + '25';
        }
        if (roles.indexOf('财务担当') != -1) {
          returnroles = returnroles + ',' + '26';
        }
        if (roles.indexOf('外协员工') != -1) {
          returnroles = returnroles + ',' + '27';
        }
        if (roles.indexOf('外协staff') != -1) {
          returnroles = returnroles + ',' + '28';
        }
        if (roles.indexOf('司机') != -1) {
          returnroles = returnroles + ',' + '29';
        }
        if (roles.indexOf('招聘_全人员') != -1) {
          returnroles = returnroles + ',' + '30';
        }
        if (roles.indexOf('军权_合同，PJ所有') != -1) {
          returnroles = returnroles + ',' + '31';
        }
        if (roles.indexOf('盘点') != -1) {
          returnroles = returnroles + ',' + '32';
        }
        if (roles.indexOf('离职审批人员') != -1) {
          returnroles = returnroles + ',' + '33';
        }
        if (roles.indexOf('纳品担当') != -1) {
          returnroles = returnroles + ',' + '34';
        }
        if (roles.indexOf('请求担当') != -1) {
          returnroles = returnroles + ',' + '35';
        }
        if (roles.indexOf('前台总务') != -1) {
          returnroles = returnroles + ',' + '36';
        }
        if (roles.indexOf('PL权限') != -1) {
          returnroles = returnroles + ',' + '37';
        }
        if (roles.indexOf('离职担当') != -1) {
          returnroles = returnroles + ',' + '38';
        }
        if (roles.indexOf('工会担当') != -1) {
          returnroles = returnroles + ',' + '39';
        }
        if (roles.indexOf('研修担当') != -1) {
          returnroles = returnroles + ',' + '40';
        }
        if (roles.indexOf('法务') != -1) {
          returnroles = returnroles + ',' + '41';
        }
        if (roles.indexOf('项目管理担当（财务）') != -1) {
          returnroles = returnroles + ',' + '42';
        }
        if (roles.indexOf('其他合同担当') != -1) {
          returnroles = returnroles + ',' + '43';
        }
        if (roles.indexOf('IT担当-采购资产编号维护') != -1) {
          returnroles = returnroles + ',' + '44';
        }
        if (roles.indexOf('财务担当-采购资产编号维护') != -1) {
          returnroles = returnroles + ',' + '45';
        }
        if (roles.indexOf('副总') != -1) {
          returnroles = returnroles + ',' + '46';
        }
        if (roles.indexOf('资产管理担当') != -1) {
          returnroles = returnroles + ',' + '47';
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
