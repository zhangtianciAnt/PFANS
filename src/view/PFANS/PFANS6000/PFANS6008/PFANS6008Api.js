import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestExcel'

export function getCostList(data) {
  return request({
    url: 'coststatistics/getCostList',
    method: 'get',
    params: data
  })
}
export function getCostBygroupid(data) {
  return request({
    url: 'coststatistics/getCostBygroupid',
    method: 'get',
    params: data
  })
}

export function insertCoststatistics(data) {
  return request({
    url: 'coststatistics/insertCoststatistics',
    method: 'get',
    params: data
  })
}


export function downloadExcel(data) {
  return requestDownload({
    url: 'coststatistics/downloadExcel',
    method: 'post',
    data: data
  })
}

//add gbb 0803 月度费用统计列表 start
export function getcostMonthList(data) {
  return request({
    url: 'coststatistics/getcostMonthList',
    method: 'get',
    params: data
  })
}
//add gbb 0803 月度费用统计列表 end

//add gbb 0803 月度费用统计详情 start
export function getcostMonth(data) {
  return request({
    url: 'coststatistics/getcostMonth',
    method: 'get',
    params: data
  })
}
//add gbb 0803 月度费用统计详情 end

