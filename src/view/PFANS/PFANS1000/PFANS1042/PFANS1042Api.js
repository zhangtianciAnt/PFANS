import request from '../../../../utils/request'


export function getPltab(data) {
  debugger
  return request({
    url: 'Pltab/getPltab',
    method: 'get',
    params: data,
  });
}


