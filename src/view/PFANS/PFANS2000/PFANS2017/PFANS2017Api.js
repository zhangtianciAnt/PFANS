import request from "../../../../utils/request"



export function getFpans2017List() {
  return request({
    url: 'punchcardrecord/list',
    method: 'post'
  })
}



