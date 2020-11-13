import request from "../../../../utils/request"
import requestDownload from '../../../../utils/requestDownload'


export function getFpans2017List(data) {
  return request({
    url: 'punchcardrecord/list',
    method: 'get',
    params: data
  })
}

export function getFpans2017Listowner() {
  return request({
    url: 'punchcardrecord/list1',
    method: 'post'
  })
}

export function download(data) {
  return requestDownload({
    url: 'punchcardrecord/download',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
//获取打卡详细
export function getPunDetail(data) {
  return request({
    url: 'punchcardrecord/getPunDetail',
    method: 'post',
    data: data
  })
}
//获取当日考勤
export function getTodayPunDetaillist() {
  return request({
    url: 'punchcardrecord/getTodayPunDetaillist',
    method: 'post',
  })
}
//获取历史考勤
export function insertHistoricalCard(params) {
  return request({
    url: 'auth/insertHistoricalCard',
    method: 'get',
    params: params
  })
}



