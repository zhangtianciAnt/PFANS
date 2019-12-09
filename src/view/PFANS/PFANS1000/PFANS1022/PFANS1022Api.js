import request from '../../../../utils/request'

export function getHoliday() {
  return request({
    url: 'holiday/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'holiday/selectById',
    method: 'post',
    data: data
  })
}

export function updateHoliday(data) {
  return request({
    url: 'holiday/update',
    method: 'post',
    data: data
  })
}

export function createHoliday(data) {
  return request({
    url: 'holiday/create',
    method: 'post',
    data: data
  })
}

export function getForSelect (data) {
  return request({
    url: 'dictionary/getForSelect',
    method: 'get',
    params: data
  })
}
