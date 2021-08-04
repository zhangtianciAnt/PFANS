import request from '../../../../utils/request'


export function getstage(data) {
  return request({
    url: 'companyprojects/getstageInformation',
    method: 'post',
    data: data
  })
}
