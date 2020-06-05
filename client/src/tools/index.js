
import { isFloat } from './validate'

// 根据可视区 计算表格显示多少行
// 1. 表格元素, 2 行的高度
export const calculateTableRow = (table, h) => {
  let windowH = getBodyWH().height
  let tableT = getElemTop(table)
  return parseInt((windowH - tableT) / h)
}


/*
  过滤值为空的字段
*/

export const checkGet = data => {
  let obj = {}
  Object.keys(data).forEach(v => {
    if (data[v] !== '') {
      obj[v] = data[v]
    }
  })
  return obj
}


/*
  处理滚动加载数据
let data = InfiniteScroll({
    data: this.portDetailData,  // 总数据
    start: this.start ++,   // 开始位置
    end: this.end   //  要多少条
  })


*/
export const InfiniteScroll = ({data, start, end}) => {
  // 把总数据传来，根据开始和结束  数字  返回对应数据
  start !== 0 && (start = start * end)
  end !== 0 && (end = start + end)

  let arr = []
  data.forEach((v, index) => {
    if (index >= start && index < end) {
      arr.push(v)
    }
  })

  return arr
}


// 默认一周
export const pickerWeek = () => {
  return [
    formatDate(new Date((new Date() * 1) - (6 * 86400000)),'yyyy-MM-dd'),
    formatDate(new Date(), 'yyyy-MM-dd')
  ]
}

// 默认当天
export const pickerDay = () => {
  return [ 
    formatDate(new Date(), 'yyyy-MM-dd'), 
    formatDate(new Date(), 'yyyy-MM-dd') 
  ]
}

// 保留小数点，不四舍五入
export const formatDecimal = (num, decimal) => {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  let res = parseFloat(num)
  return isFloat(res) ? res.toFixed(decimal) : res
}

//格式化数字 每隔3位加","
export const formattedNumber = (num) => {
  var num = (num || 0).toString();
  var result = '';
  while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
}

//全屏
export const scrToMax  = () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
  }
}

// 退出全屏
export const scrToMin = () => {
  if (document.cancelFullScreen) {
    document.cancelFullScreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  }
}

// 格式化日期

export const formatDate = (date, format) => {
  let time = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in time) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? time[k] : ('00' + time[k]).substr(('' + time[k]).length))
    }
  }
  return format
}

/*
  设置echarts 浮动层始终在可视区
*/ 
export const pointPosition = (point, params, dom, rect, size) => {
  // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
  // 提示框位置
  var x = 0; // x坐标位置
  var y = 0; // y坐标位置

  // 当前鼠标位置
  var pointX = point[0];
  var pointY = point[1];
  // 提示框大小
  var boxWidth = size.contentSize[0];
  var boxHeight = size.contentSize[1];

  // boxWidth > pointX 说明鼠标左边放不下提示框
  if (boxWidth > pointX) {
    x = 5;
  } else { // 左边放的下
    x = pointX - boxWidth;
  }

  // boxHeight > pointY 说明鼠标上边放不下提示框
  if (boxHeight > pointY) {
    y = 5;
  } else { // 上边放得下
    y = pointY - boxHeight;
  }

  return [x, y]
}
// 获取body的宽度和高度
export const getBodyWH = () => {
  return {
    width: document.documentElement.clientWidth || document.body.clientWidth || window.clientWidth,
    height: document.documentElement.clientHeight || document.body.clientHeight || window.clientHeight
  }
}
/*
10 
-----------------------------------------------------
|
|       获取元素距离浏览器顶部的距离
| 
-----------------------------------------------------
*/
export const getElemTop = elem => {

  let elemTop = elem.offsetTop //获得elem元素距相对定位的父元素的top
  elem = elem.offsetParent //将elem换成起相对定位的父元素


  while (elem != null) { //只要还有相对定位的父元素 
    /*获得父元素 距他父元素的top值,累加到结果中 */
    elemTop += elem.offsetTop
    //再次将elem换成他相对定位的父元素上;
    elem = elem.offsetParent
  }
  return elemTop
}

// 格式化分钟数： 把秒转为 00:00  -- audio 用到
export const transTime = t => {
  let d = parseInt(t)
  let m = parseInt(d/60)
  let sec = d % 60 + ''
  let isM0 = ':'
  if (m == 0) {
      m = '00'
  } else if (m < 10 ) {
      m = '0'+m
  }
  if (sec.length == 1) {
      sec = '0' + sec
  }
  return m + isM0 + sec
}

// 获取url参数
export const GetRequest = () =>{
  let urlStr = window.location.href
    if (typeof urlStr == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        var url = "?" + urlStr.split("?")[1];
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 查找元素是否有clss
export const hasClass = (ele, cls) => {
　　cls = cls || '';
　　if (cls.replace(/\s/g, '').length == 0) return false;
　　return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

// 添加class
export const addClass = (ele, cls) => {
　　if (!hasClass(ele, cls)) {
　　　　ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
　　}
}

// 移除class
export const removeClass = (ele, cls) => {
　　if (hasClass(ele, cls)) {
　　　　let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
　　　　while (newClass.indexOf(' ' + cls + ' ') >= 0) {
　　　　　　newClass = newClass.replace(' ' + cls + ' ', ' ');
　　　　}
　　　　ele.className = newClass.replace(/^\s+|\s+$/g, '');
　　}
}


export const imgToBase64 = file => {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function() {
      imgResult = reader.result;
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.onloadend = function() {
      resolve(imgResult);
    };
  });
}


export const base64ToImg = base64Data => {
  //将base64转换为文件
  let dataURLtoFile = (dataurl, filename) => { 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
  //调用
  return dataURLtoFile(base64Data, 'img')
}


// 删除数组中的空值
export const trimSpace = array => {  
  for(var i = 0 ;i<array.length;i++)  
  {  
      if(array[i] == "" || array[i] == " " || array[i] == null || typeof(array[i]) == "undefined")  
      {  
               array.splice(i,1);  
               i= i-1;  
      }  
  }  
  return array;  
} 

