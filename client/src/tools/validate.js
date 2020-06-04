// 验证手机号
export const isPhone = val => {
  if (/^1[3456789]\d{9}$/.test(trim(val))) {
      return true
  }
  return false
}

// 验证邮箱格式
export const isEmail = val => {
  if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(trim(val))) {
    return true
  }
  return false
}

// 验证ip
export const isIp = val => {
   if(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(trim(val)))   
   {   
       if( RegExp.$1<256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) 
       return true
   }
   return false
}

// 删除左右两侧的空格
export const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, "")
}

// 判断一个数字是不是浮点型
export const isFloat = n => {
  return /^-?\d*\.\d+$/.test(n)
}