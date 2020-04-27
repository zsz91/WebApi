var gateWay = 'http://scjoyedu.eicp.net:51337/test120/'; // 测试环境106

function givePath(){
  return window.location.href.indexOf('localhost') > -1  ||  window.location.href.indexOf('127.0.0.1') > -1 ? '' : '.';
}

function isDev(){
  return (window.location.href.indexOf('localhost') > -1  ||  window.location.href.indexOf('127.0.0.1') > -1) ? '' : '/qualityOrientScore';
}

function isDevlopment() {
  return (window.location.href.indexOf('localhost') > -1  ||  window.location.href.indexOf('127.0.0.1') > -1);
}

if(isDevlopment()){
  // gateWay = 'http://scjoyedu.eicp.net:51337/test61/'; // 开发环境61
}

const fileServer=gateWay+"/v1/api/folder";
const dfs=gateWay+"/v1/api/zydxgWeb";
const uploadUrl = fileServer+"/uploadFileApi/upload";

window.systemSpecialConfig = {
  oauthServer: `${gateWay}/uia/oauth/token` ,
  yxMobileServer: `${gateWay}/v1/api/zydxgMobile/` ,
  // yxMobileServer: `${gateWay}/v1/api/zydxgWeb/`,
  folderServer: `${gateWay}/v1/api/folder`,
  rapImagePath: "http://192.168.1.230:8084/",
  // logo: isDev() + '/images/logo&名字@3x.png', // 在public 目录下
  logo2: givePath() + '/images/logo-zyd.png' , // 在public 目录下
  zydWebServer: `${gateWay}/v1/api/zydxgWeb/`,
  zydZsActivityWebServer: `${gateWay}/v1/api/activityWebApi`, // 招生活动服务器
  zydTwMobileServer: `${gateWay}/v1/api/twMobile`, // 校团委服务器
  zydyTwMobileServer: `${gateWay}/v1/api/ytwMobile`, // 院团委服务器
  zydWebPerm: `${gateWay}/v1/api/perm/`,
  weixinServer: `${gateWay}/wx/`,
  payUrl: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4Mjc3ODg1OQ==&scene=110#wechat_redirect', // 跳转到 支付页面url,

  httpServer: `${gateWay}/v1/api/zydxgWeb/`,
  // cmsServer: 'http://210.41.222.124:51353',// 测试环境
  cmsServer: 'http://scjoyedu.eicp.net:51335', // 生产环境
  // cmsSvc: 'http://210.41.222.124:51353',// 测试环境
  cmsSvc: 'http://scjoyedu.eicp.net:51335', // 生产环境

  uploadUrl,
  wxgzh: `${gateWay}/wx/reg/1/zszc`, // 微信公众号
  // wxRegister: `${SystemConfig.mockServer}/wx/reg/1/xg`, // 微信公众号注册
  login_logo: isDev() + '/images/登录背景图@3x.png', // 在public 目录下
  login_logo2: isDev() + '/images/logo&名字@3x.png', // 在public 目录下
  schoolPhone: '028-61800090',
  schoolName: '成都中医药大学',
  schoolEmail: 'zsc@cdtucm.edu.cn',
  schoolAddress: "四川省成都市温江区柳台大道1166号",
  schoolMail: "611137",
  _site_id_param: "1",
  mockServer:`${gateWay}`,
  dfs,
};
