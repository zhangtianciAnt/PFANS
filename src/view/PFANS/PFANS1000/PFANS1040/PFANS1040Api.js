import request from '../../../../utils/request'

export function get(data) {
  return request({
    url: 'contracttheme/get',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'contracttheme/insert',
    method: 'post',
    data: data
  })
}






