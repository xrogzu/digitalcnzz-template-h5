import request from '@/utils/request'
import { getSignature, getTimeStamp } from '@/utils'

// CSB请求功能提取
export const csbRequest = (_api_name, params = {}) => {
  const headerObj = {
    _api_name,
    _api_version: '1.0.0',
    _api_access_key: 'bd8c1fdb5f664f909f656f4d716223c2',
    _api_timestamp: getTimeStamp()
  }
  return request('http://59.207.61.70:8086/CSB', {
    method: 'post',
    headers: {
      ...headerObj,
      _api_signature: getSignature(headerObj),
      'Content-Type': 'application/json'
    },
    data: {
      queryValues: params
    }
  })
}

// DataWorks接口服务
export const dataWorksRequest = (apiName, params = {}) => {
  return request(`/daping/${apiName}`, {
    headers: {
      Authorization: 'APPCODE d93f167277ae4c14b26793a514d7cbec'
    },
    params: {
      // appCode: 'd93f167277ae4c14b26793a514d7cbec',
      pageNum: 1,
      pageSize: 10,
      ...params
    }
  })
}
