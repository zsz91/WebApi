import request from './request';
import qs, { parse } from 'qs';
import FormdataWrapper from './object-to-formdata-custom';
import merge from 'merge-object';
import config from '../../config/config'
import { getLocalStorage, setLocalStorage } from './helper';
import fetch from 'dva/fetch';

const cookieTrue = {
  credentials: 'include'
};
const jsonConf = {
  headers: {
    'Content-Type': 'application/json'
  }
}

function getUser() {

  return getLocalStorage("user")
}
function getUrl(smarturl, flag) {

  
  if (flag) {
    return config.rapHost + '/' + smarturl;
  } else {
    return config.onlinePath + smarturl;
  }
}
function getImgUrl(smarturl) {
  if (smarturl == null) {
    return '';
  }
  if (config.rapFlag) {
    return config.rapImagePath + smarturl;
  } else {
    return config.onlinePath + smarturl;
  }
}

async function POST(url, params, isJson) {
  let user = getUser()
  if (user != null) {
    params.token = user.token
  }
  params.v = Date.parse(new Date())
  params.domain = document.domain
  if (isJson == undefined) { isJson = false };


  return request(getUrl(url, config.rapFlag), merge({
    method: 'POST',
    body: isJson ? JSON.stringify(params) : FormdataWrapper(params),
  }, isJson ? merge(jsonConf, cookieTrue) : cookieTrue), config.rapFlag);
}

async function GET(url, params) {
  
  let user = getUser()
  if (user != null) {
    params.token = user.token
  }
  params.v = Date.parse(new Date())
  params.domain = document.domain

  return request(getUrl(url, config.rapFlag) + `?${qs.stringify(params)}`, merge({
    method: 'GET', mode: 'cors', credentials: 'omit',
  }, cookieTrue));
}


/* message.config({
  top: 300,
  duration: 2,
}); */
function check(data, payload) {
  if (data == null) {
     //message.info("当前网络比较慢,请刷新页面重试")
   console.log("当前网络比较慢,请刷新页面重试")
    return false
  }
  if (data.errorCode == "auth") {
    if(payload.auth!=null){
      console.log("xxxxxxxxxxxx")
      payload.auth()
    }
    return false
  }
  if (data.errorCode == "fail") {
   // message.error(data.msg ,data.msg.length /2 >3?data.msg.length /2:3, null)
    return false
  }
  if (data.errorCode == "delay") {
   // message.error("服务器请求错误,请联系管理员", 10, null)
    return false
  }
  return true

}



export {
  POST, GET, getImgUrl, getUser, check
}
