import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload';

export function inserttodo(data) {
  return request({
    url: 'bonussend/inserttodo',
    method: 'post',
    data: data,
  })
}

export function getList(data) {
  return request({
    url: 'bonussend/List',
    method: 'post',
    data: data,
  });
}

export function update(data) {
  return request({
    url: 'bonussend/update',
    method: 'post',
    data: data
  })
}

//下载模板
export function download(data) {
  return requestDownload({
    url: 'bonussend/download',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
