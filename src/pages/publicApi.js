
import request from '@/H5Public/utils/request';
import config from '@/config/config';
import { jsonParse } from '@/H5Public/utils/handleString';
import { setToken } from '@/H5Public/utils/authority';
import router from 'umi/router';

function getInfo(params = {}, url) {
  return request(config.zydWebServer + url, {
    method: 'POST',
    body: params,
  });
}

function getMobileInfo(params = {}, url) {
  return request(config.yxMobileServer + url, {
    method: 'POST',
    body: params,
  });
}
function getMobileInfoNew(params = {}, url) {
  return request(config.lappServer + url, {
    method: 'POST',
    body: params,
  });
}

export const getUserInfoService = () => {
  return getMobileInfoNew({}, '/CommonApi/currentUser').then((response) => {
    if(response && response.uploadPicture){
      let photo = jsonParse(response.uploadPicture);
      response.photo = photo.url || '';
    }
    if(response && response.photo){
      let photo = jsonParse(response.photo);
      response.photo = photo.url || '';
    }
    if(!response){
      setToken('');
      router.push('/login');
    }
    return response;
  })
};

/**
 * 获取当前用户的权限
 * */
export const getSystemPerm = () => {
  return getInfo({
    sysCode: 'ytw',
  }, '/PermApi/queryMyMinProgram').then((response) => {
    if(response) {

      return response;
    }
  })
};
