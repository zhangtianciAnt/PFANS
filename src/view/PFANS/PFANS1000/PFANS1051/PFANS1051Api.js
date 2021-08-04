import request from "../../../../utils/request"
import requestDownload from '../../../../utils/requestExcel';

export function selectBygroupid(data) {
  return request({
    url: 'departmentaccount/selectBygroupid',
    method: 'get',
    params: data,
  })
}
