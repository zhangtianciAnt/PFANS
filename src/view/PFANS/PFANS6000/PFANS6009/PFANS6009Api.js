import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestExcel'

export function getCostList(data) {
  return request({
    url: '/companystatistics/getCompanyReport1',
    method: 'get',
    params: data
  })
}

export function getWorktimes(data) {
  return request({
    url: '/companystatistics/getCompanyReport2',
    method: 'get',
    params: data
  })
}

export function getWorkers(data) {
  return request({
    url: '/companystatistics/getCompanyReport3',
    method: 'get',
    params: data
  })
}

export function downloadExcel(data) {
  return requestDownload({
    url: '/companystatistics/downloadExcel',
    method: 'post',
    data: data
  })
}


