import axios from 'axios'
import { baseApi } from '@/config'
class HTTP {
  static get (url, data) {
    return this.request(url, data, 'GET')
  }

  static post (url, data) {
    return this.request(url, data, 'POST')
  }
  static request (url, data, method) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: baseApi + url,
        data: data || {}
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export { HTTP }
