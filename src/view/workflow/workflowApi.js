import request from '../../utils/request'

//创建流程
export function createWorkflow(data) {
  return request({
    url: 'workflow/create',
    method: 'post',
    data: data
  })
}

//更新流程
export function updateWorkflow(data) {
  return request({
    url: 'workflow/upd',
    method: 'post',
    data: data
  })
}

//获取流程
export function getWorkflowOne(data) {
  return request({
    url: 'workflow/one',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function getWorkflowList() {
  return request({
    url: 'workflow/list',
    method: 'post'
  })
}

//删除流程
export function delWorkflow(data) {
  return request({
    url: 'workflow/del',
    method: 'post',
    data: data
  })
}

export function allWorkFlowIns(data) {
  return request({
    url: 'workflow/allWorkFlowIns',
    method: 'get',
    params: data
  })
}
//ccm 20200713 离职 获取离职人员离职月的考勤审批情况
export function oneWorkFlowIns(data) {
  return request({
    url: 'workflow/oneWorkFlowIns',
    method: 'get',
    params: data
  })
}
//ccm 20200713 离职 获取离职人员离职月的考勤审批情况
