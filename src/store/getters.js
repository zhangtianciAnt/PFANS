

const getters = {
  historyUrl: state => state.global.historyUrl,
  operateId: state => state.global.operateId,
  currentUrl: state => state.global.currentUrl,
  userinfo: state => state.global.userinfo,
  useraccount: state => state.global.useraccount,
  userList: state => state.global.userList,
  workflowUrl: state => state.global.workflowUrl,
  orgList: state => state.global.orgList,
  dictionaryList: state => state.global.dictionaryList,
  days: state => state.global.days,
  orgs: state => state.usersStore.orgs,
  fileToken: state => state.global.fileToken,
  cooperinterviewList: state => state.global.cooperinterviewList,
  supplierinforList: state => state.global.supplierinforList,
  orgId: state => state.global.orgId,
  orgCenterList: state => state.global.orgCenterList,
  orgGroupList: state => state.global.orgGroupList,
  orgGroupallList: state => state.global.orgGroupallList,
  operateOwner: state => state.global.operateOwner,
  //add-ws-12/10-汇率字典
  monthlyrate: state => state.global.monthlyrate,
  //add-ws-12/10-汇率字典
}

export default getters
