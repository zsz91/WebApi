import { Toast } from 'antd-mobile'


/**
 * 验证提交数据是否已填
 * config {Array} 字段配置数组
 * data {Object} 需要提交的数据
 * */
export function checkRequiredData(config = [], data = {}) {
  for(let x of config){
    if(x.required && (data[x.key] === '' || data[x.key] === undefined)){
      Toast.fail( '请填写' + x.name, 1);
      return false;
    }
  }
  return true;
}

/**
 * 验证邮箱格式
 * @param {String} email 邮箱地址
 */
export function emailValidate(email) {
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegExp.test(email);
}

/**
 * 验证身份证号码是否合法
 * @param {String} idCard 身份证号码
 */
export function idCardValidate(idCard = '') {
//  const reg =  /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
  idCard = idCard.trim();
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if(!idCard){
    return false;
  }
  return reg.test(idCard);
}

/*
* 验证手机号码
* @param {String} phone 手机号码
* */
export function phoneValidate(phone) {
  const reg = /^1[34578]\d{9}$/;
  return reg.test(phone)
}



