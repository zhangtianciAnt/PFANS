import request from '../../../../utils/request'

//查看
export function getDictionary(data) {
  return request({
    url: 'dictionary/getDictionary',
    method:'post',
    data: data
  })
}

//修改
export function upDictionary(data) {
  return request({
    url: 'dictionary/upDictionary',
    method:'post',
    data: data
  })
}

