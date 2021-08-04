import request from '@/utils/request'

export function getActionsAuth (data) {
  return request({
    url: '/auth/getActionsAuth',
    method: 'get',
    params: {
      ownerid: data
    }
  })
}

export function getNewActionAuth () {
  return request({
    url: '/auth/getNewActionAuth',
    method: 'get',
  })
}

