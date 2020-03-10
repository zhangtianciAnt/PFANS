import request from '../../../../utils/request';


export function getTaxestotalList(data) {
  return request({
    url: 'Getwages/getTaxestotalList',
    method: 'get',
    params: data,
  });
}





export function getBonusList(data) {
  return request({
    url: 'Getwages/getBonusList',
    method: 'get',
    params: data,
  });
}


