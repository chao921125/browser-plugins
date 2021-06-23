export function formatMoney (value) {
  if (!value) return '0.00'
  let intPart = Number(value) | 0
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  let floatPart = '.00'
  let value2Array = value.toString().split('.')
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()
    if (floatPart.length === 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
}

export function formatMoney3 (value) {
  if (!value) return '-'
  let intPart = Number(value) | 0
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  let floatPart = '.00'
  let value2Array = value.toString().split('.')
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()

    if (floatPart.length === 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart.substring(0, 2)
    }
  } else {
    return intPartFormat + floatPart
  }
}

export function formatNumber (num) {
  if (num === 0) return '-'
  num = num.toString().replace(/\\,/g, '')
  if (isNaN(num) || num == null || num === undefined || num === 'null' || num === '0' || num === 0) return '-'
  if (num < 0) {
    return '-' + formatMoneyInteger(Math.floor(Math.abs(num) - 0) + '')
  } else {
    return formatMoneyInteger(Math.floor(num - 0) + '')
  }
}
// 整数位3位一个逗号，小数位保留两位四舍五入0.00
export function formatMoneyTwo (money) {
  if (typeof money === 'number' && money % 1 === 0) {
    return money
  }
  money = money.toString().replace(/\\,/g, '')
  if (isNaN(money) || money == null || money === undefined || money === 'null' || money === '0' || money === 0) return '0.00'
  money = Math.round(money * 100) / 100
  if (money < 0) {
    return '-' + formatMoneyInteger(Math.floor(Math.abs(money) - 0) + '') + formatMoneyDecimal(Math.abs(money) - 0)
  } else {
    return formatMoneyInteger(Math.floor(money - 0) + '') + formatMoneyDecimal(money - 0)
  }
}

function formatMoneyInteger (money) {
  if (money.length <= 3) {
    return (money === '' ? '0' : money)
  } else {
    let mod = money.length % 3
    let output = (mod === 0 ? '' : (money.toString().substring(0, mod)))
    for (let i = 0; i < Math.floor(money.length / 3); i++) {
      if ((mod === 0) && (i === 0)) {
        output += money.toString().substring(mod + 3 * i, mod + 3 * i + 3)
      } else {
        output += ',' + money.toString().substring(mod + 3 * i, mod + 3 * i + 3)
      }
    }
    return output
  }
}
function formatMoneyDecimal (amount) {
  amount = Math.round(((amount) - Math.floor(amount)) * 100)
  return (amount < 10 ? '.0' + amount : '.' + amount)
}

export function formatDate (date, fmt) {
  if (fmt === undefined || fmt === null || fmt === '') {
    fmt = 'yyyy-MM-dd'
  }
  date = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S+': date.getMilliseconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
};
// 处理小数点前数字
export function dealNumFront (val) {
  if (!val) return '-'
  let str = val.toString()
  // if (str.indexOf('.') > -1) return formatMoneyInteger(str.split('.')[0]) + '.'
  if (str.indexOf('.') > -1) return str.split('.')[0] + '.'
  return str
}
// 处理小数点前千分位数字
export function dealNumFrontOne (val) {
  if (!val) return '-'
  let str = val.toString()
  if (str.indexOf('.') > -1) return formatMoneyInteger(str.split('.')[0]) + '.'
  return str
}
// 处理小数点后数字
export function dealNumBack (val) {
  if (!val) return '-'
  let str = val.toString()
  if (str.indexOf('.') > -1) {
    if (str.split('.')[1].length === 2) {
      return str.split('.')[1]
    } else if (str.split('.')[1].length === 0) {
      return '00'
    } else if (str.split('.')[1].length === 1) {
      return str.split('.')[1] + '0'
    } else {
      return str.split('.')[1].substring(0, 2)
    }
  }
  return ''
}
// 处理定向名称长度
export function dealStrLength (str) {
  if (!str) return ''
  if (str.length > 30) {
    return str.substr(0, 30) + '...'
  } else {
    return str
  }
}
export function getGoalNameByKey (key) {
  if (key === null || key === '') {
    return ''
  }
  let keyStr = key.toString()
  const goal = [{
    name: '优化成交量',
    value: '2',
    desc: '优化智钻展示创意后带来的店铺成交次数'
  }, {
    name: '优化关注量',
    value: '32',
    desc: '优化智钻展示创意后带来的店铺关注次数'
  }, {
    name: '优化加购量',
    value: '4',
    desc: '优化智钻展示创意后带来的店铺加购次数'
  }, {
    name: '优化曝光量',
    value: '64',
    desc: '优化计划创意在智钻资源位上被买家看到的总次数'
  }, {
    name: '优化点击量',
    value: '8',
    desc: '优化计划创意在智钻资源位上被买家点击的总次数'
  }]
  for (let i = 0; i < goal.length; i++) {
    if (keyStr === goal[i].value) {
      return goal[i].name
    }
  }
}
export function getUrlParam () {
  let url = window.location.href
  let obj = {}
  let array = url.split('?')[1].split('&')
  let len = array.length
  for (let i = 0; i < len; i++) {
    let res = array[i].split('=')
    obj[res[0]] = res[1]
  }
  return obj
}
