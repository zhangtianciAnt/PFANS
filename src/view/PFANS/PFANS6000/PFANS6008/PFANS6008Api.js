import request from '../../../../utils/request'

export function getCostList(data) {
  return request({
    url: 'variousfunds/getCostList',
    method: 'get',
    params: data
  })
}


