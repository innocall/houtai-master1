// const BASE_URL = 'https://klzz.hualinginfo.com/'

import {req_map_get } from './ajax';


function getAddressReq(data, callback) {
    let api_url = 'http://api.map.baidu.com/geocoder/v2/';
    if(!data) return false
    if (data) {
        req_map_get(api_url, data, callback);
    }else {
        return false;
    }
}
export {
    getAddressReq
}