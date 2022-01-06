import request from '../../../../utils/request';

export function change(data) {
  return request({
    url: 'business/change',
    method: 'post',
    params: data,
  });
}
