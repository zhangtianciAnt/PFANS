import request from '../../../../utils/request'

export function getCostList(data) {
  return request({
    url: '/companystatistics/getCompanyReport1',
    method: 'get',
    params: data
  })
}


