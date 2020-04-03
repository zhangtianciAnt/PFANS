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
