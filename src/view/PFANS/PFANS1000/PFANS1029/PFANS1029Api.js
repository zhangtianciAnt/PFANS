import request from '../../../../utils/request'

export function get(data) {
  return request({
    url: 'contract/get',
    method: 'get',
    params: data
  })
}

export function one(data) {
  return request({
    url: 'contract/one',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'contract/update',
    method: 'post',
    data: data
  })
}


export function getContractList(data) {
  return request({
    url: 'contractapplication/getContractList',
    method: 'get',
    params: data
  })
}
