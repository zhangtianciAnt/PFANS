import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestExcel'
import requestPdf from '../../../../utils/requestPdf';

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
    method: 'get',
    params: data
  })
}
// 月度费用总览导出
export function exportpdf(data) {
  return requestPdf({
    url: '/companystatistics/downloadPdf',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}


