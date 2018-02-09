// 参考 https://stackoverflow.com/questions/9394190/leaflet-map-api-with-google-satellite-layer
// https://stackoverflow.com/questions/9394190/leaflet-map-api-with-google-satellite-layer
export const mapconf = {
  googleNewMapUrl: 'http://www.google.cn/maps/vt?lyrs=s,h@726&gl=cn&x={x}&y={y}&z={z}',
  gaodeUrl: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
  // 只有卫星图没有地名
  urlSatellite: 'http://www.google.cn/maps/vt?lyrs=s&gl=cn&x={x}&y={y}&z={z}',
  url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
  annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
};

var apibaseUrl = 'http://192.168.50.10:6969';
/* 临时使用线上地址测试 */
apibaseUrl = 'http://app.terraquanta.io:6969';

var baseUrl = 'http://app.yeegen.com:7070';

/* 生产环境 */
if (process.env.NODE_ENV !== 'development') {
  console.log('生产环境');
  console.log = function () {};
  apibaseUrl = 'http://app.terraquanta.io:6969';
  baseUrl = 'http://app.terraquanta.io';
}

export {
  apibaseUrl,
  baseUrl
};
