import request from '../../../../utils/request';

export function getDepartmentalInsert(data) {
  return request({
    url: 'departmentalinside/getTableinfo',
    method: 'get',
    params: data,
  });
}
