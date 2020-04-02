import request from '../../../../utils/request'

export function getpriceset(data) {
  return request({
    url: 'priceset/list',
    method: 'post',
    data: data
  })
}

export function getPricesetList(data) {
  return request({
    url: 'priceset/get',
    method: 'get',
    data: data
  })
}

export function updatepriceset(data) {
  return request({
    url: 'priceset/update',
    method: 'post',
    data: data
  })
}

export function getExpatriatesinfor(id) {
  return request({
    url: 'personnelplan/getexpatriatesinfor',
    method: 'get',
    params: {
      groupid:id
    }
  })
}
