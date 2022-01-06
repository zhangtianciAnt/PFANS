import request from '../../../../utils/request';
import requestDownload from '../../../../utils/requestDownload';


export function getpeoplewareList(data) {
  return request({
    url: 'peopleware/getPeopleWare',
    method: 'post',
    data: data,
  });
}

export function download(data) {
  return requestDownload({
    url: 'peopleware/download',
    method: 'get',
    params: data,
    responseType: 'blob',
  });
}




