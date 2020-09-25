import CryptoJS from 'crypto-js/crypto-js'
// import html2canvas from 'html2canvas'

const KEY = CryptoJS.enc.Utf8.parse('12345678900987654321')
const IV = CryptoJS.enc.Utf8.parse()
var s = '12345678900987654321'
const codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const tools = {
  isPhone: function (phoneStr) {
    console.log(phoneStr)
    var myreg = /^((13[0-9])|(14[1|4|5|6|7|8|9])|(15([0|1|2|3|5|6|7|8|9]))|(16[2|5|6|7])|(17[0|1|2|3|5|6|7|8])|(18[0-9])|(19[1|8|9]))\d{8}$/
    if (!myreg.test(phoneStr)) {
      return false
    } else {
      return true
    }
  },

  isCard: function (cardStr) {
    console.log(cardStr)
    var myreg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X]|[x])$/
    if (!myreg.test(cardStr)) {
      return false
    } else {
      return true
    }
  },

  isEmail: function (emailStr) {
    console.log(emailStr)
    var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (!myreg.test(emailStr)) {
      return false
    } else {
      return true
    }
  },

  // 信息脱敏 start
  /**
   *
   * @param {身份号} cardStr
   * @param {手机号} phoneStr
   * @param {姓名} name
   * @param {邮箱} emailStr
   * @param {用户名} Accountname
   */
  idcardDesensitization: function (cardStr = '', phoneStr = '', name = '', emailStr = '', Accountname = '') {
    let star = '*'
    const len = cardStr.toString().length - 4
    for (var i = 1; i < len; i++) {
      star = star + '*'
    }
    return {
      userName: name.replace(/.(?=.)/g, '*'),
      mobile: phoneStr.substring(0, 3) + '****' + phoneStr.substring(7, 11),
      idCard: star + cardStr.substring(14, 18),
      Accountname: Accountname.replace(/.(?=.)/g, '*'),
      email: emailStr.substr(0, 2) + '****' + emailStr.substr(emailStr.indexOf('@'))
    }
  },
  // 信息脱敏 end

  // 信息加密工具类 start
  // aes 加密

  /**
   * AES加密 ：字符串 key iv  返回base64
   */
  Encrypt: function (word, keyStr = s, ivStr) {
    let key = KEY
    let iv = IV
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr)
      iv = CryptoJS.enc.Utf8.parse(ivStr)
    }

    const srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    // console.log("-=-=-=-", encrypted.ciphertext)
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  },
  /**
   * AES 解密 ：字符串 key iv  返回base64
   *
   */
  Decrypt: function (word, keyStr = s, ivStr) {
    let key = KEY
    let iv = IV
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr)
      iv = CryptoJS.enc.Utf8.parse(ivStr)
    }

    const base64 = CryptoJS.enc.Base64.parse(word)
    const src = CryptoJS.enc.Base64.stringify(base64)

    var decrypt = CryptoJS.AES.decrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })

    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  },
  // 信息加密工具类 end
  // 通用工具类 start
  // 格式化时间戳(
  /**
   *
   * @param {时间戳 可不传} date
   */
  formatTime: function (date = new Date()) {
    var o = {
      y: date.getFullYear(), // 年份
      M: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, // 月份
      d: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(), // 日
      // "h": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
      H: date.getHours(), // 小时
      m: date.getMinutes(), // 分
      s: date.getSeconds() // 秒
    }
    return {
      o,
      type: o.y + '-' + o.M + '-' + o.d + ' ' + o.H + ':' + o.m + ':' + o.s,
      typeOne: o.y + '-' + o.M + '-' + o.d,
      typeTwo: o.y + '/' + o.M + '/' + o.d + ' ' + o.H + ':' + o.m + ':' + o.s,
      typeThree: o.y + '/' + o.M + '/' + o.d,
      typeFour: o.y + '年' + o.M + '月' + o.d + '日',
      typeFive: o.y + '年' + o.M + '月' + o.d + '日' + ' ' + o.H + ':' + o.m + ':' + o.s
    }
  },
  // 判断手机是否为iPhoneX
  isIphoneX: function () {
    return /iphone/gi.test(navigator.userAgent) && screen.height == 812 && screen.width == 375
  },
  // 获取当前时段
  getMoment: function () {
    const h = new Date().getHours()
    let greetingMsg = ''
    if (h >= 0 && h < 6) {
      greetingMsg = '凌晨好'
    } else if (h >= 6 && h <= 11) {
      greetingMsg = '早上好'
    } else if (h > 11 && h <= 14) {
      greetingMsg = '中午好'
    } else if (h > 14 && h <= 17) {
      greetingMsg = '下午好'
    } else if (h > 17 && h <= 24) {
      greetingMsg = '晚上好'
    }
    return greetingMsg
  },
  // 获取随机验证码
  // 用来生成随机整数
  getRandom: function (n, m) {
    // param: (Number, Number)
    n = Number(n)
    m = Number(m)
    // 确保 m 始终大于 n
    if (n > m) {
      var temp = n
      n = m
      m = temp
    }
    return Math.floor(Math.random() * (m - n) + n)
  },
  /**
   *
   * @param {页面提示元素的id} element
   */
  getCode: function (element) {
    var str = ''
    // 验证码有几位就循环几次
    for (var i = 0; i < 4; i++) {
      var ran = this.getRandom(0, 62)
      str += codeStr.charAt(ran)
    }
    if (element) {
      document.getElementById(element).innerText = str
    }
    return str
  },
  // 验证密码强度
  /**
   *
   * @param {设置的密码} oValue
   */
  passwordStrength: function (oValue) {
    oValue = oValue.replace(/[\u4E00-\u9FA5]/g, '')
    if (/\d/.test(oValue) && /[a-z]/.test(oValue) && /[A-Z]/.test(oValue)) {
      return {
        type: '2',
        text: '强'
      }
    } else if (/^\d+$/.test(oValue) || /^[A-Z]+$/.test(oValue) || /^[a-z]+$/.test(oValue)) {
      return {
        type: '0',
        text: '弱'
      }
    } else {
      return {
        type: '1',
        text: '中'
      }
    }
  },
  // base64 压缩
  /**
   *
   * @param {input type=file 的 id} ele
   * @param {缩放比例} bili
   */
  base64Compression: function (ele, bili = 3, vue) {
    var file = document.getElementById(ele).files[0] // 取传入的第一个文件
    if (undefined == file) {
      // 如果未找到文件，结束函数，跳出
      return
    }
    return new Promise((resolve, reject) => {
      var r = new FileReader()
      r.readAsDataURL(file)
      r.onload = function (e) {
        var base64 = e.target.result
        vue.cont2 = base64.length
        console.log('压缩前：', base64.length)
        console.log('压缩前：', base64)
        var _img = new Image()
        _img.src = base64
        _img.onload = function () {
          var _canvas = document.createElement('canvas')
          var w = this.width / bili
          var h = this.height / bili
          _canvas.setAttribute('width', w)
          _canvas.setAttribute('height', h)
          _canvas.getContext('2d').drawImage(this, 0, 0, w, h)
          var base64 = _canvas.toDataURL('image/jpeg')
          _canvas.toBlob(function (blob) {
            console.log('压缩后', base64.length)
            resolve(base64)
          }, 'image/jpeg')
        }
      }
    })
  },
  saveImg: function (id) {
    setTimeout(function () {
      const url = document.getElementById(id).src
      var a = document.createElement('a') // 创建一个a节点插入的document
      var event = new MouseEvent('click') // 模拟鼠标click点击事件
      a.download = '未命名' // 设置a节点的download属性值
      a.href = url // 将图片的src赋值给a节点的href
      a.dispatchEvent(event)
      console.log(123)
    }, 1000)
  },
  getDateTimeFmt: function (date = new Date(), fmt = 'yyyyMMddHHmmss') {
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    var week = {
      '0': '/u65e5',
      '1': '/u4e00',
      '2': '/u4e8c',
      '3': '/u4e09',
      '4': '/u56db',
      '5': '/u4e94',
      '6': '/u516d'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[this.getDay() + '']
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return fmt
  },
  /*
   *账号名脱敏
   */
  noPassByAccount (str = '') {
    if (str != null && str != undefined) {
      if (str.length > 3 && str.length <= 6) {
        var start = str.length - 1
        return str.substring(0, 1) + '***' + str.substring(start, str.length)
      } else if (str.length > 6) {
        var start = str.length - 3
        return str.substring(0, 2) + '****' + str.substring(start, str.length)
      }
    } else {
      return ''
    }
  },
  /*
   *用户姓名脱敏
   */
  noPassByName (str = '') {
    if (str && str != 'null' && str != undefined) {
      if (str == '匿名用户') {
        return '非实名用户'
      } else {
        return '*' + str.substring(1, str.length)
      }
    } else {
      return ''
    }
  },
  /*
   *用户身份证号脱敏
   */
  noPassByCard (card = '') {
    if (card && card != 'null' && card != 'undefined') {
      const str = card.substr(6, 8)
      return card.replace(str, '********')
    } else {
      return ''
    }
  },
  /*
   *用户手机号脱敏
   */
  noPassByMobile (str = '') {
    if (str && str != 'null' && str != 'undefined') {
      const pat = /(\d{3})\d*(\d{4})/
      return str.replace(pat, '$1****$2')
    } else {
      return ''
    }
  },
  // 过滤表情等特殊字符
  specialChars (str = '') {
    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi
    if (regStr.test(str)) return str.replace(regStr, '')
    return str
  }
  // 通用工具类 end
}
export { tools }
