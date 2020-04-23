import request from '../../../../utils/request'

export function getOvertime() {
  return request({
    url: 'overtime/get',
    method: 'get'
  })
}
export function getOvertimeOne(data) {
  return request({
    url: 'overtime/one',
    method: 'post',
    data: data
  })
}
export function getDataList() {
  return request({
    url: 'punchcardrecord/getDataList',
    method: 'post',
  })
}

export function updateOvertime(data) {
  return request({
    url: 'overtime/update',
    method: 'post',
    data: data
  })
}
export function createOvertime(data) {
  return request({
    url: 'overtime/create',
    method:'post',
    data: data
  })
}
export function getList(data) {
  return request({
    url: 'workingday/getList',
    method: 'post',
    data: data
  })
}

export function getOvertimeDay(data) {
  return request({
    url: 'overtime/getOvertimeDay',
    method: 'post',
    data: data
  })
}

export function getOvertimeOneday(data) {
  return request({
    url: 'overtime/getOvertimeOneday',
    method: 'post',
    data: data
  })
}






