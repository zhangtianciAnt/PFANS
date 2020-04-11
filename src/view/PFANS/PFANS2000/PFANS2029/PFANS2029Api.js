import request from "../../../../utils/request"
import requestDownload from '../../../../utils/requestDownload'


export function getFpans2029List() {
  return request({
    url: 'punchcardrecordbp/list',
    method: 'post'
  })
}

export function getFpans2029Listowner() {
  return request({
    url: 'punchcardrecordbp/list1',
    method: 'post'
  })
}

export function download(data) {
  return requestDownload({
    url: 'punchcardrecordbp/download',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
//获取打卡详细
export function getPunDetail(data) {
  return request({
    url: 'punchcardrecordbp/getPunDetail',
    method: 'post',
    data: data
  })
}



