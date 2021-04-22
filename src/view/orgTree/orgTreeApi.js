import request from '../../utils/request'

export function saveTree(data) {
  return request({
    url: 'OrgTree/save',
    method: 'post',
    data: data
  })
}

export function getOrgTree() {
  return request({
    url: 'OrgTree/get',
    method: 'get'
  })
}

export function getTreeYears(data) {
  return request({
    url: 'OrgTree/getTreeYears',
    method: 'get',
    params: data
  })
}

export function updateStatus(data) {
  return request({
    url: 'OrgTree/updateStatus',
    method: 'get',
    params: data
  })
}
//add gbb 20210421 获取所有组织信息 start
export function getOrgAll() {
  return request({
    url: 'OrgTree/getOrgAll',
    method: 'get'
  })
}
//add gbb 20210421 获取所有组织信息 end
