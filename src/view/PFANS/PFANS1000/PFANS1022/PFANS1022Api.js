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
    method: 'get',
    params: data
  })
}

export function update(data) {
  return request({
    url: 'holiday/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'holiday/insert',
    method: 'post',
    data: data
  })
}
