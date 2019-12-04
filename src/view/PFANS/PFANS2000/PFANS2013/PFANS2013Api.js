import request from '../../../../utils/request'

//获取列表数据
export function getDataList(data) {
  return request({
    url: 'annualLeave/getDataList',
    method: 'get',
    data: data
  })
}
