import request from '../../../../utils/request'

//获取流程列表
export function get() {
  return request({
    url: 'publicexpense/get',
    method: 'get'
  })
}
//更新
export function update(data) {
  return request({
    url: 'publicexpense/update',
    method: 'post',
    data: data
  })
}

//新建
export function insert(data) {
  return request({
    url: 'publicexpense/insert',
    method: 'post',
    data: data
  })
}
//查看详细
export function selectById(data) {
  return request({
    url: 'publicexpense/selectById',
    method: 'get',
    params: data
  })
}
//裁决号
export function getJudgement(data) {
  return request({
    url: 'publicexpense/getJudgement',
    method: 'post',
    data: data
  })
}
  //暂借款申请编号
  export function getloanapplication(data) {
    return request({
      url: 'publicexpense/getloanapplication',
      method: 'post',
      data: data
    })
}
