import request from '../../../../utils/request'

//创建流程
export function insert(data) {
  return request({
    url: 'companyprojects/insert',
    method: 'post',
    data: data
  })
}
export function selectById(data) {
  return request({
    url: 'companyprojects/selectById',
    method: 'get',
    params: data
  })
}
export function selectAll(data) {
  return request({
    url: 'companyprojects/selectAll',
    method: 'get'
  })
}


export function select(data) {
  return request({
    url: 'companyprojects/select',
    method: 'get',
    params: data
  })
}

//更新流程
export function update(data) {
  return request({
    url: 'companyprojects/update',
    method: 'post',
    data: data
  })
}
//更新流程
export function update1(data) {
  return request({
    url: 'companyprojects/update1',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function getFpans5001List(data) {
  return request({
    url: 'companyprojects/list',
    method: 'post',
    data: data
  })
}

export function getFpans5001List2(data) {
  return request({
    url: 'companyprojects/list2',
    method: 'post',
    data: data
  })
}

export function getcustomer(data) {
  return request({
    url: 'companyprojects/getcustomer',
    method: 'post',
    data: data
  })
}

export function getexpat(data) {
  return request({
    url: 'companyprojects/getexpat',
    method: 'post',
    data: data
  })
}

export function getPjList(data) {
  return request({
    url: 'companyprojects/getPjList',
    method: 'get',
    params: data
  })
}
export function getList2(data) {
  return request({
    url: 'companyprojects/getList2',
    method: 'get',
    params: data
  })
}
export function getProjectList(data) {
  return request({
    url: 'companyprojects/getProjectList',
    method: 'get',
    params: data
  })
}

export function getTimestart(data) {
  return request({
    url: 'companyprojects/getTimestart',
    method: 'get',
    params: data
  })
}

export function getGroupTimestart(data) {
  return request({
    url: 'companyprojects/getGroupTimestart',
    method: 'post',
    data: data
  })
}

export function updateTimestart(data) {
  return request({
    url: 'companyprojects/updateTimestart',
    method: 'post',
    data: data
  })
}

//1029 获取合同明细表
export function selectConnumList(data) {
  return request({
    url: 'companyprojects/selectConnumList',
    method: 'get',
    params: data
  })
}

export function report(data) {
  return request({
    url: 'companyprojects/report',
    method: 'get',
    params: data
  })
}

//region scc add 根据合同号，获取构外数据 from
export function forDetail(data) {
  return request({
    url: 'companyprojects/forDetail',
    method: 'get',
    params: data
  })
}
//endregion scc add 根据合同号，获取构外数据 to

//添加社内报告者互相报告check ztc fr
export function getReport(data) {
  return request({
    url: 'companyprojects/getReport',
    method: 'get',
    params: data
  })
}
//添加社内报告者互相报告check ztc to

