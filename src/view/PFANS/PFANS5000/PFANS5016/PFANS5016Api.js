import request from '../../../../utils/request'

export function getLogPerson(data) {
  return request({
    url: 'personlog/getLogPerson',
    method: 'get',
    params: data
  })
}

export function updateByVoId(data) {
  return request({
    url: 'personlog/updateByVoId',
    method: 'post',
    data: data,
  });
}

//region scc add 21/12/6 日志人别导出 from
export function downloadExcel(data) {
  return request({
    url: 'personlog/downloadExcel',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
//endregion scc add 21/12/6 日志人别导出 to
