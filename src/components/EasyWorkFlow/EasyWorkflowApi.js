import request from '../../utils/request'

// 是否可以发起审批
export function isStartWorkflow (data) {
  return request({
    url: '/workflow/isStartWorkflow',
    method: 'post',
    data: data
  })
}

// 是否可以进行审批
export function isOperationWorkflow (data) {
  return request({
    url: '/workflow/isOperationWorkflow',
    method: 'post',
    data: data
  })
}

// 查询租户下的所有人
export function selectUserByTenantId (data) {
  return request({
    url: '/Organization/user/selectAllUser',
    method: 'get',
    params: data
  })
}

// 是否可以查看审批日志
export function isViewWorkflow (data) {
  return request({
    url: '/workflow/isViewWorkflow',
    method: 'post',
    data: data
  })
}

// 审批日志
export function viewWorkflow (data) {
  return request({
    url: '/workflow/ViewWorkflow',
    method: 'post',
    data: data
  })
}

// 审批日志
export function viewWorkflow2 (data) {
  return request({
    url: '/workflow/ViewWorkflow2',
    method: 'post',
    data: data
  })
}

// 进行审批
export function operationWorkflow (data) {
  return request({
    url: '/workflow/OperationWorkflow',
    method: 'post',
    data: data
  })
}

// 发起审批
export function startWorkflow (data) {
  return request({
    url: '/workflow/StartWorkflow',
    method: 'post',
    data: data
  })
}

// 是否可以撤销审批
export function isDelWorkflow (data) {
  return request({
    url: '/workflow/isDelWorkflow',
    method: 'post',
    data: data
  })
}

// 撤销审批
export function delWorkflow (data) {
  return request({
    url: '/workflow/DelWorkflow',
    method: 'post',
    params: data
  })
}
