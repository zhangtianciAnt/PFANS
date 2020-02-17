import request from '../../../../utils/request'

export function getCostList(data) {
  return request({
    url: 'coststatistics/getCostList',
    method: 'get',
    params: data
  })
}

export function insertCoststatistics() {
  return request({
    url: 'coststatistics/insertCoststatistics',
    method: 'post'
  })
}


