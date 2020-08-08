// const BASE_URL = 'https://klzz.hualinginfo.com/'

import {req_map_get } from './ajax';


function getAddressReq(data, callback) {
    let api_url = 'http://api.map.baidu.com/reverse_geocoding/v3/';
    if(!data) return false
    if (data) {
        req_map_get(api_url, data, callback);
    }else {
        console.log("用户经纬度解析参数错误");
        return false;
    }
}
export {
    getAddressReq
}
