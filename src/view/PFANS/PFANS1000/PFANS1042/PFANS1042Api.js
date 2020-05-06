import request from '../../../../utils/request'


export function getPltab(data) {
  return request({
    url: 'Pltab/getPltab',
    method: 'get',
    params: data,
  });
}
//add-ws-5/6-添加按份金额
export function selectPlmoney(data) {
  return request({
    url: 'Pltab/selectPlmoney',
    method: 'get',
    params: data,
  });
}
//add-ws-5/6-添加按份金额
