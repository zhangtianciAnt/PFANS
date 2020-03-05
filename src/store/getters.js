

const getters = {
  historyUrl: state => state.global.historyUrl,
  operateId: state => state.global.operateId,
  currentUrl: state => state.global.currentUrl,
  userinfo: state => state.global.userinfo,
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
}

export default getters
