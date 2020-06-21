// import store from '@/vuex'
import fetchJsonp from 'fetch-jsonp';

function req_map_get(url, data, callback) {
    if (data) {
        let urlParamArr = [];
        for (let key in data) {
            urlParamArr.push(key + '=' + data[key]);
        }
        let urlParam = '?' + urlParamArr.join('&');

        url += urlParam;
    }
    let opts = {
        method: 'GET',
        headers: {
            // 'Content-Type':'application/json'
        },
    };
    fetchJsonp(url, opts, {
        jsonpCallback: 'custom_callback', // 回调函数名称，默认callback
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        // console.log('parsed json', json)
        typeof callback == "function" && callback(json);
      }).catch(function(ex) {
        // console.log('parsing failed', ex)
    })
}


export {
    req_map_get
};
