const isHttps = window.location.protocol.indexOf('https') > -1;
const apiVersion = isHttps ? '3.0' : '2.0'; // 3.0 对应 https 2.0 对应http
const mapContaienrId = "baiduMap";
const apiSrc = `https://api.map.baidu.com/api?v=${apiVersion}&ak=WPau2m9l3Rty2HR7Kfc9879nzP2Fj0UU`;

function loadScript(callBack) {
  window.baiduMapInitialize = function  () {
    getLocationByMap(callBack);
  }
  document.write(`<script type="text/javascript" src="${apiSrc}"></script>`);
}

function getLocationByMap(callback) {
  const BMap = window.BMap;
  //
  const map = new BMap.Map(mapContaienrId);
  const point = new BMap.Point(107.303748,34.346725);
  map.centerAndZoom(point, 12);
  const geolocation = new BMap.Geolocation();
  geolocation.enableSDKLocation();
  geolocation.getCurrentPosition(function(r){
    let msg = '';
    switch (this.getStatus()) {
      case window.BMAP_STATUS_SUCCESS: {
        getAddress(r.point, callback);
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        break;
      }
      case window.BMAP_STATUS_CITY_LIST: {
        msg = '城市列表';
        break;
      }
      case window.BMAP_STATUS_UNKNOWN_LOCATION: {
        msg = '位置结果未知';
        break;
      }
      case window.BMAP_STATUS_UNKNOWN_ROUTE: {
        msg = '导航结果未知';
        break;
      }
      case window.BMAP_STATUS_INVALID_KEY: {
        msg = '非法密钥';
        break;
      }
      case window.BMAP_STATUS_INVALID_REQUEST: {
        msg = '非法请求';
        break;
      }
      case window.BMAP_STATUS_PERMISSION_DENIED: {
        msg = '没有权限';
        break;
      }
      case window.BMAP_STATUS_SERVICE_UNAVAILABLE: {
        msg = '服务不可用';
        break;
      }
      case window.BMAP_STATUS_TIMEOUT: {
        msg = '超时';
        break;
      }
      default: {
        msg = '未知错误';
      }
    }
    console.log(msg);
  },{
    enableHighAccuracy: true,
  });
}

/**
 * @function 使用百度地图api，获取当前用户的位置,
 * 可以不用在ejs写api脚本，直接传回调函数，调用getLocation函数,
 * @param {Function} callBack 获取位置成功后的回调函数
 * @example
 * getLocation(function(addressInfo) {
 *  console.log('位置信息', addressInfo)
 * });
 * addressInfo = {
 *   address : '地理位置中文',
 *   lng: '纬度',
 *   lat: '经度',
 * }
 */
export default function getLocation(callBack = () => {}){
  if(typeof window.BMap === 'undefined') {
    loadScript(callBack);
    console.log('请加载百度地图api js文件');
    return false;
  }else{
    getLocationByMap(callBack);
  }
}

export function getAddress(point, callBack=()=>{}){
  const lng = point.lng; // 经度
  const lat = point.lat; // 纬度
  let gc = new BMap.Geocoder();
  gc.getLocation(point,function(res){
    let  formValues = {};
    // 更改状态
    formValues.address = res.address;
    formValues.lng = lng;
    formValues.lat = lat;
    callBack(formValues);
  });
}
