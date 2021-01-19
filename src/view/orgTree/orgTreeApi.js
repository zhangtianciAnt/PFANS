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
