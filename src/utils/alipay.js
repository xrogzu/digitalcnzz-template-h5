import { zhbJssdk } from '@digitalcnzz/jssdk'
export const loginApp = () => {
  zhbJssdk.lunchZhbLogin(() => { })
}

export const getonverified = () => {
  zhbJssdk.getZhbCertification(() => { })
}

// 判断浏览器内核、手机系统等，使用
export const containerType = () => {
  var sUserAgent = navigator.userAgent.toLowerCase()
  var bIsApp = sUserAgent.indexOf('izzzwfwapp') > -1
  var bIsAlipay = sUserAgent.indexOf('alipayclient') > -1
  if (bIsApp) {
    return 'app'
  } else if (bIsAlipay) {
    return 'xcx'
  } else {
    return 'other'
  }
}
