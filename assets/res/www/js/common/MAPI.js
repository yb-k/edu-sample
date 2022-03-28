// namespace 모듈
// M-API 기능을 확장/ 기본옵션값 핸들링하기위해 
// 객체를 하나 만들어서 관리한다.

(function (M, config, Util, window) {

  var MNet = {

    /**
     * HTTP 통신 모듈
     * @param {object} options
     * @param {string} options.path 호출할 path
     * @param {string} options.method HTTP 메서드 (GET|POST|PUT|DELETE)
     * @param {number} options.timeout 타임아웃 시간
     * @param {object} options.indicator 인디케이터 옵션
     * @param {object} options.data 바디데이터
     * @param {function} options.succ 성공시 콜백
     * @param {function} options.error 실패시 콜백
     */


    sendHttp: function sendHttp(options) {
      if (Util.isEmpty(options.path)) throw new Error('sendHttp :: 옵션의 Path값은 필수입니다.');


      var succFunc = function succFunc(data) {
        if (data.rsltCode == '0000') {
          console.log('HTTP RESPONSE :: ', data);
          if (typeof options.succ === 'function') {
            options.succ(data);
          }
        } else {
          //실패
          alert(data.rsltMsg);
          if (typeof options.error === 'function') {
            options.error(data);
          }

        }

      }

      var errFunc = function errFunc(code, msg, setting) {
        alert(code + '\n' + msg);
        var callback = options.error || function () {};
        callback(code, msg, setting);
      };

      var _options = {
        server: config.SERVER_NAME,
        path: options.path || '',
        method: options.method || 'POST',
        timeout: options.timeout || 3000,
        indicator: options.indicator || {
          show: true,
          message: 'Loading..',
          cancelable: true
        },
        cancelable: false,
        data: options.data || {},
        success: succFunc,
        error: errFunc,
      };
      M.net.http.send(_options);
    }
  };
  window.__mnet__ = MNet;
})(M, __config__, __util__, window);