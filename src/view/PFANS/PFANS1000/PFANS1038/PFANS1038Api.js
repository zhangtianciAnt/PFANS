import request from "../../../../utils/request";

export function getCustomerInfo(id) {
  return request({
    url: 'personnelplan/getcustomer',
    method: 'get',
    params: {
      id:id
    }
  })
}

export function getExpatriatesinfor(id) {
  return request({
    url: 'personnelplan/getexpatriatesinfor',
    method: 'get',
    params: {
      groupid:id
    }
  })
}

export function getExternal() {
  return request({
    url: 'personnelplan/getsupplierinfor',
    method: 'get'
  })
}

export function insert(data) {
  return request({
    url: 'personnelplan/insert',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'personnelplan/update',
    method: 'post',
    data: data
  })
}

export function getOne(data) {
  return request({
    url: 'personnelplan/getone',
    method: 'get',
    params: {
      id:data
    }
  })
}
export function getAll() {
  return request({
    url: 'personnelplan/getall',
    method: 'get'
  })
}
// add-lyt-21/1/29-禅道任务648-start
export function getPersonalCost(data) {
  return request({
    url: 'personnelplan/getPersonalCost',
    method: 'get',
    params: data
  })
}
// add-lyt-21/1/29-禅道任务648-end
//view添加分页 ztc 1130 fr
export function getListforType(data) {
  return request({
    url: 'personnelplan/getListforType',
    method: 'post',
    params: data
  })
}
//view添加分页 ztc 1130 to
