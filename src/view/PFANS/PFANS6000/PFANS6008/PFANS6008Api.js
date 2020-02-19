import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestExcel'

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


export function downloadExcel(data) {
  return requestDownload({
    url: 'coststatistics/downloadExcel',
    method: 'post',
    data: data
  })
}

