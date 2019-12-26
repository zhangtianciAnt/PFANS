import request from "../../../../utils/request"
import requestDownload from '../../../../utils/requestDownload'


export function getFpans2017List() {
  return request({
    url: 'punchcardrecord/list',
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



