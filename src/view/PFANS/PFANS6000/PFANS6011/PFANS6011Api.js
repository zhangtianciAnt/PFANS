import request from '../../../../utils/request'

export function getTableinfo(data) {
  return request({
    url: 'injection/getTableinfo',
    method: 'get',
    params: data
  })
}

