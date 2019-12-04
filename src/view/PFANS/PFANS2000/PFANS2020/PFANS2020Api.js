import request from '../../../../utils/request'


export function getAllIrregulartiming() {
  return request({
    url: 'irregulartiming/getAllIrregulartiming',
    method: 'get'
  })
}
export function getIrregulartimingOne(data) {
  return request({
    url: 'irregulartiming/getIrregulartimingOne',
    method: 'post',
    data: data
  })
}
export function updateIrregulartiming(data) {
  return request({
    url: 'irregulartiming/updateIrregulartiming',
    method: 'post',
    data: data
  })
}
export function insertIrregulartiming(data) {
  return request({
    url: 'irregulartiming/insertIrregulartiming',
    method: 'post',
    data: data
  })
}
