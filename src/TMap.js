export function TMap() {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(qq)//注意这里
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/library/MapWrapper/1.2/src/MapWrapper.min.js";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
