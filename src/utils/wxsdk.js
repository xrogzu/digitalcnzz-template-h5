// 微信h5-sdk服务集成

import { Toast } from 'vant'

// 微信端扫码
export const wxScan = (type, callback) => {
  window.wx.scanQRCode({
    needResult: 1,
    scanType: ['qrCode', 'barCode'],
    desc: 'scanQRCode',
    success: function (res) {
      let code = ''
      if (type === 'barcode') {
        code = res.resultStr?.split(',')[1] || ''
        if (!code) {
          Toast('内容为空')
          return
        }
      } else if (type === 'qrcode') {
        code = res.resultStr
        if (!code) {
          Toast('内容为空')
          return
        }
      }
      callback(code)
    },
    fail (e) {
      console.log(e)
    }
  })
}
