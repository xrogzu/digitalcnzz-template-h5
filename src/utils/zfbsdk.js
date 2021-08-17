// 支付宝h5-sdk服务集成
import { Toast } from 'vant'

// 支付宝端扫码
export const zfbScan = (type = 'qr', callback) => {
  return new Promise(resolve => {
    window.ap.scan(
      {
        type
      },
      result => {
        const { code } = result
        if (code) {
          resolve(code)
        } else {
          Toast('操作取消')
        }
      }
    )
  })
}

// 支付宝端选择文件
export const zfbChooseImg = (type = 'qr') => {
  return new Promise(resolve => {
    window.ap.chooseImage(
      {
        sourceType: ['camera', 'album'],
        count: 6
      },
      result => {
        var apFilePath = result.apFilePathsV2 || result.apFilePaths || []
        if (typeof apFilePath === 'string') {
          try {
            apFilePath = JSON.parse(apFilePath)
          } catch (e) {
            Toast('文件获取失败')
          }
        }
        if (!apFilePath.length || !/^https?:/.test(apFilePath[0])) {
          Toast('文件获取失败')
          return
        }
        resolve(apFilePath)
      }
    )
  })
}
