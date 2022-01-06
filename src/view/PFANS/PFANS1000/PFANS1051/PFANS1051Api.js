import request from '../../../../utils/request';

export function selectBygroupid(data) {
  return request({
    url: 'departmentaccount/selectBygroupid',
    method: 'get',
    params: data,
  });
}
