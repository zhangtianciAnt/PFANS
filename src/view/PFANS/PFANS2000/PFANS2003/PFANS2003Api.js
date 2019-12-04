import request from '../../../../utils/request'

export function getinterviewrecord() {
  return request({
    url: 'interviewrecord/get',
    method: 'get'
  })
}

export function getinterviewrecordOne(data) {
  return request({
    url: 'interviewrecord/one',
    method: 'post',
    data: data
  })
}

export function updateinterviewrecord(data) {
  return request({
    url: 'interviewrecord/update',
    method: 'post',
    data: data
  })
}

export function createinterviewrecord(data) {
  return request({
    url: 'interviewrecord/create',
    method: 'post',
    data: data
  })
}
