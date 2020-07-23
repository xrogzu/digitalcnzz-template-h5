import idCard from 'idcard'

/**
 * 正则
 */
export const regRule = {
  // 统一社会信用代码
  entCode: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/,
  // 手机号
  mobile: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  // 座机号
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 检验统一社会信用代码
 * @param {string} str 值
 */
export const validEntCode = str => {
  return regRule.entCode.test(str)
}

/**
 * 检验手机号
 * @param {*} str 值
 */
export const validMobile = str => {
  return regRule.mobile.test(str)
}

/**
 * 检验座机号
 * @param {} str 值
 */
export const validTelephone = str => {
  return regRule.telephone.test(str)
}

/**
 * 检验手机号或者座机号
 * @param {} str 值
 */
export const validPhone = str => {
  return regRule.mobile.test(str) || regRule.telephone.test(str)
}

/**
 * 检验身份证号
 * @param {*} str
 */
export const validIdCard = str => {
  return idCard.verify(str)
}
