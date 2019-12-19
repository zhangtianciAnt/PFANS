import request from '../../../../../utils/request'

//查询字典大分类
export function bigList() {
  return request({
    url: 'dictionary/bigList',
    method:'get',
    params: {

    }
  })
}

// 查询字典大分类中的小分类
export function smallAtbig(code) {
  return request({
    url: 'dictionary/smallAtbig',
    method: 'get',
    params: {
      code: code
    }
  })
}
//新增小分类字典
export function insertCodes(data) {
  return request({
    url: 'dictionary/insertCodes',
    method:'post',
    data: data
  })
}

//更新小分类字典
export function updataCodes(data) {
  return request({
    url: 'dictionary/updataCodes',
    method:'post',
    data: data
  })
}
//删除小分类字典
  export function deleteCodes(data) {
    return request({
      url: 'dictionary/deleteCodes',
      method:'post',
      data: data
    })
  }
