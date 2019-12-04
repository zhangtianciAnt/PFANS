import request from '../../../../utils/request'


export function Password(data) {
  return request({
    url: 'PersonalCenter/changePassword',
    method: 'post',
    data: data
  })
}


