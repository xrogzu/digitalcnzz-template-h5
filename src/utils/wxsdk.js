// 微信h5-sdk服务集成
import { Toast } from 'vant'

// 微信端扫码
export const wxScan = type => {
  return new Promise(resolve => {
    wxReady(() => {
      window.wx.scanQRCode({
        needResult: 1,
        scanType: ['qrCode', 'barCode'],
        desc: 'scanQRCode',
        success: res => {
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
          resolve(code)
        },
        fail: e => {
          Toast('内容为空')
        }
      })
    })
  })
}

// 微信端选择照片
export const wxChooseImg = params => {
  return new Promise(resolve => {
    wxReady(() => {
      window.wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          var localIds = res.localIds
          resolve(localIds[0])
        }
      })
    })
  }).then(localIds => {
    return new Promise(resolve => {
      window.wx.getLocalImgData({
        localId: localIds,
        success: res => {
          let localData = res.localData
          if (localData.indexOf('data:image') != 0) {
            localData = 'data:image/jpeg;base64,' + localData
          }
          localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg')
          const file = dataURLtoFile(localData)
          resolve(file)
        }
      })
    })
  })
}

// dataURL转文件对象
export const dataURLtoFile = (dataurl, filename = 'weixin-file') => {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export const wxReady = callback => {
  if (window.wx.ready) {
    callback && callback()
  } else if (window.wx.error) {
    window.wx.error(() => {
      Toast('初始化异常，请重新进入')
    })
  }
}
