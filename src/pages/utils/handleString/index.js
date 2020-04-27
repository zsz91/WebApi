import moment from 'moment';
/**
 * 处理字符串相关的函数
 * 2019年9月6日
 * 钟是志
 * */


/**
 * 获取url参数
 */
export function  getUrlParams() {
  let url = window.document.location.href.toString();
  let u = url.split("?");
  if (typeof(u[1]) == "string") {
    u = u[1].split("&");
    let get = {};
    for (let i in u) {
      let j = u[i].split("=");
      get[j[0]] = decodeURIComponent(j[1]);
    }
    return get;
  } else {
    return {};
  }
}

/**
 * 判断是否是JSON字符串 如果是JSON字符串 直接返回 JSON.parse的结果
 * */
export function jsonParse(str) {
  if (typeof str == 'string') {
    try {
      let res = JSON.parse(str);
      if(typeof JSON.parse(str) === 'number'){
        return false;
      }
      return res;
    } catch (e) {
      return false;
    }
  }
}

/**
 * 格式化时间
 * unixTime {string}
 * dateFormat {string}
 * */
export function dateParse(unixTime, dateFormat='YYYY-MM-DD') {
  if(unixTime){
    return moment(unixTime).format(dateFormat);
  }else{
    return '';
  }
}
