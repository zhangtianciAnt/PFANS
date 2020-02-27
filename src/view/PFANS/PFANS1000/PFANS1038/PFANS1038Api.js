import request from "../../../../utils/request";

export function getCustomerInfo(id) {
  return request({
    url: 'personnelplan/getcustomer',
    method: 'get',
    params: {
      id:id
    }
  })
}
