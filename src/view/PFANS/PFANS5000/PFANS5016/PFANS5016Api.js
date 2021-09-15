import request from '../../../../utils/request'

export function getLogPerson(data) {
  return request({
    url: 'personlog/getLogPerson',
    method: 'get',
    params: data
  })
}

export function updateByVoId(data) {
  return request({
    url: 'personlog/updateByVoId',
    method: 'post',
    data: data,
  });
}

