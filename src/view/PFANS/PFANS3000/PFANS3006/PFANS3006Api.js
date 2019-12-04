import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload'

export function getAppointmentCar() {
  return request({
    url: 'appointmentcar/get',
    method: 'get'
  })
}

export function getAppointmentCarOne(data) {
  return request({
    url: 'appointmentcar/one',
    method: 'post',
    data: data
  })
}

export function updateAppointmentCar(data) {
  return request({
    url: 'appointmentcar/update',
    method: 'post',
    data: data
  })
}

export function createAppointmentCar(data) {
  return request({
    url: 'appointmentcar/create',
    method: 'post',
    data: data
  })
}

export function download(data) {
  return requestDownload({
    url: 'appointmentcar/download',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}







