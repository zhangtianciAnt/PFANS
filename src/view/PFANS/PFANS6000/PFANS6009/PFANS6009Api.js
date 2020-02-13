import request from '../../../../utils/request'

export function getCostList(data) {
  return request({
    url: 'coststatistics/getCostList',
    method: 'get',
    params: data
  })
}


