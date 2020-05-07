import request from '../../../../utils/request'


export function getPltab(data) {
  return request({
    url: 'Pltab/getPltab',
    method: 'get',
    params: data,
  });
}

export function insert(data) {
  return request({
    url: 'Pltab/insert',
    method: 'post',
    data: data
  })
}
