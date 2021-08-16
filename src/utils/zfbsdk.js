// 支付宝h5-sdk服务集成
import { Toast } from 'vant'

// 支付宝端扫码
export const zfbScan = (type = 'qr', callback) => {
  window.ap.scan(
    {
      type
    },
    result => {
      const { code } = result
      callback && callback(code)
    }
  )
}
