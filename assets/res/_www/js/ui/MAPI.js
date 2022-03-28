//namespace 모듈
// M-API 기능을 확장/기본옵션값 핸들링 하기위해 객체를 하나 만들어서 관리한다.

(function (M, config, Util, window) {
  var MNet = {
    /*
     @param {object} options
     @param {string} options.path  : 호출할 path으로 설정
     @param {string} options.method  : HTTP 메서드 (GET|POST|PUT|DELETE)
     @param {number} options.timeout  : 타임아웃시간
     @param {object} options.indicator  : 인디케이터 옵션 : 화면 동작 막는것(터치) 
     @param {object} options.data  : 바디 데이터 
     @param {function} options.succ  : 성공시 콜백
     @param {function} options.error  : 실패시 콜백

    */
    sendHttp: function sendHttp(options) {
      if (Util.isEmpty(options.path)) throw new Error('sendHttp :: 옵션의 path값은 필수입니다.');

      // 기본값 설정하기 
      // 한번 더 감싸서 사용하는 이유 : 값 변경시 유연하게 대응하기 위해서 

      var succFunc = function succFunc(data) {
        console.log("HTTP RESPONE :: ", data);
        if (data.rsltCode == '0000') { //성공
          if (typeof options.succ === 'function') {
            options.succ(data);
          }
        } else { // 실패
          alert(data.rsltMsg);
          if (typeof options.error === 'function') {
            options.error(data);
          }
        };
      }
      var errFunc = function errFunc(code, msg, setting) {
        alert(code + '\n' + msg);
        // 거짓인 경우 function 자동으로 실행 
        var callback = options.error || function () {};
        callback(code, msg, setting);

      };

      var _options = {
        server: config.SERVER_NAME,
        path: options.path || '', // path 없으면 공백값을 받
        method: options.method || 'POST',
        timeout: options.timeout || 3000,
        indicator: options.indicator || {
          show: true,
          message: 'Loading..',
          cancelable: false
        },
        data: options.data || {},
        success: succFunc,
        error: errFunc,
      };

      console.log('HTTP URL :: ' + _options.path);
      M.net.http.send(_options); // 실제로 통신 시작 
    }
  };

  // 전역객체로 선언
  window.__mnet__ = MNet;
})(M, __config__, __util__, window);