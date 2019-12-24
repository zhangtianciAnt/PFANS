import request from '../../../../utils/request'


export function getAllIrregulartiming() {
  return request({
    url: 'petition/get',
    method: 'get'
  })
}
export function getIrregulartimingOne(data) {
  return request({
    url: 'petition/selectById',
    method: 'post',
    data: data
  })
}
export function updateIrregulartiming(data) {
  return request({
    url: 'petition/update',
    method: 'post',
    data: data
  })
}

