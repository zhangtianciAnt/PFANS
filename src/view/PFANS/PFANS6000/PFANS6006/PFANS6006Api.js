import request from '../../../../utils/request'


export function createDeleginformation(data) {
  return request({
    url: 'delegainformation/create',
    method: 'post',
    data: data
  })
}
export function getDelegainformation(data) {
  return request({
    url: 'delegainformation/get',
    method: 'get',
    params: data
  })
}

