import request from '../../../../utils/request'



//获取流程列表
export function getFpans5011List(data) {
  return request({
    url: 'companyprojects/list1',
    method: 'post',
    data: data
  })
}

export function getl(data) {
  return request({
    url: 'companyprojects/getl',
    method: 'post',
    data: data
  })
}



