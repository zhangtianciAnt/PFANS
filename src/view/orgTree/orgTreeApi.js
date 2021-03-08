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
//update gbb 20210308  禅道任务708  start
export function getTreeYears(data) {
  return request({
    url: 'OrgTree/getTreeYears',
    method: 'get',
    params: data
  })
}
//update gbb 20210308  禅道任务708  end
