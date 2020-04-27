/* import fetch from 'fetch'; */
import { stringify } from 'qs';
import { Toast, Modal } from 'antd-mobile';
import router from 'umi/router';
import { routerRedux } from 'dva/router';
import store from 'dva';
import FormdataWrapper from './object-to-formdata-custom';
import { getToken, clearToken, } from './authority';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  Toast.info(`请求错误 ${response.status}: ${response.url}`, 1);
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options, config = {enableLoading: true, handle401Path: '/CollegeYongthLeague/#/YongthLeagueCommitte/IndexPage'}) {
  const { errorHandle, handle401Path, enableLoading } = config; // 错误弹窗 回调
  const defaultOptions = {
    credentials: 'omit',
    mode: 'cors',
  };

  const newOptions = { ...defaultOptions, ...options };
  if (getToken() && (url.indexOf('/third/token') <= -1 || url.indexOf('wxConfigApi/getConfig') <= -1)) {
    url = url + "?token=" + getToken()
  }

  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {

    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json;charset=UTF-8',

        /*    'X-Requested-With':'XMLHttpRequest', */
        ...newOptions.headers,
      };
      newOptions.body = FormdataWrapper(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }

  } else {
    if (options) {
      url = url + '?' + stringify(options);
    }
  }
  if (config.enableLoading) {
    Toast.loading('加载中....', 1);
  }
  
  return fetch(url, newOptions).then(checkStatus)
    .then(response => {
      if (response.status === 202) {
        return response.text();
      }
      return response.json();
    })
    .then(response => {
      if (typeof response === 'string') {
        let xxx = '';
        try{
          xxx = JSON.parse(response);
          if (xxx.errMsg) {
            Toast.hide();
            Modal.alert('', `${xxx.errMsg}`, [
              { text: '知道了', onPress: errorHandle ? ()=>errorHandle(xxx) : () => console.log('ok') },
            ]);
             return;
            // return new Promise.reject(response);
           }
        }catch(e){

        }
      }else if(response && (response.errMsg || response.errmsg)){
        Toast.hide();
        Modal.alert('', `${response.errMsg || response.errmsg}`, [
          { text: '知道了', onPress: errorHandle ? ()=>errorHandle(response) : () => console.log('ok') },
        ]);
        return;
        // return new Promise.reject(response);
      }
      return response;
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        clearToken();
        Toast.hide();
        Toast.info('登录信息已过期,请重新登录', 1);
        if(handle401Path){
          router.push({
            pathname: '/login', state: handle401Path
          });
        }
        else{
          router.push({
            pathname: '/',
          });
        }
        return;
      }
      if (status === 403) {
        Toast.info('请求错误,请联系管理员' + status, 2);
        return;
      }
      if (status <= 504 && status >= 500) {
        Toast.info('请求错误,请联系管理员' + status, 2);
        return;
      }
      if (status >= 404 && status < 422) {
        Toast.info('请求错误,请联系管理员' + status, 2);
        return;
      }
    });
}
