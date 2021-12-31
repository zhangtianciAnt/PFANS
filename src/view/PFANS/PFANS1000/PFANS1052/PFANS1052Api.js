import request from "../../../../utils/request"
import requestPdf from "../../../../utils/requestPdf";
import requestDownload from "../../../../utils/requestDownload";

export function getDepartmentalInsert(data) {
  return request({
    url: 'departmentalinside/getTableinfo',
    method: 'get',
    params: data
  })
}
export function downloadExcel(data) {
  return requestDownload({
    url: 'departmentalinside/downloadExcel',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
