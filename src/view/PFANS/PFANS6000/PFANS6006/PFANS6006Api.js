import request from '../../../../utils/request'


export function updateDeleginformation(data) {
  return request({
    url: 'delegainformation/update',
    method: 'post',
    data: data
  })
}

export function getYears(data) {
  return request({
    url: 'delegainformation/getYears',
    method: 'get',
    params: data,
  });
}


