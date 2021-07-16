import request from '../../../../utils/request'

export function getTableinfo(data) {
  return request({
    url: 'pjExternalInjection/getTableinfo',
    method: 'get',
    params: data
  })
}

