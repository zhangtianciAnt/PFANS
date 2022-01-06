import request from '../../../../utils/request';

export function getDepartmental(data) {
  return request({
    url: 'departmental/getDepartmental',
    method: 'post',
    params: data,
  });
}
