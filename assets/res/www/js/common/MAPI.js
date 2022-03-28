// namespace 모듈
// M-API 기능을 확장/기본옵션값 핸들링하기위해 객체를 하나 만들어서 관리한다.


(function (M, config, util, window) {
  var MNet = {

      /**
       * HTTP 통신 모듈
       * @param {object} options
       * @param {string} options.path 호출할 path
       * @param {string} options.method HTTP 메서드 (GET|POST|PUT|DELETE)
       * @param {number} options.timeout 타임아웃시간
       * @param {object} options.indicator 인디케이터 옵션 화면동작을 컨트롤하는것? cancelable 터치했을때 취소할 수 있는지?
       * @param {object} options.data 바디 데이터
       * @param {function} options.succ 성공시 콜백
       * @param {function} options.error 실패시 콜백
       */
      sendHttp: function sendHttp(options) {
        if (util.isEmpty(options.path)) throw new Error('sedHttp :: 옵션의 path 값은 필수 값입니다.');

        var successFunc = function successFunc(data) {
          console.log('HTTP RESPONSE :: ', data);
          if (typeof options.succ === 'function') {
            options.succ(data);
          }
        };
        var errFunc = function errFunc(code, msg, setting) {
          alert(code + '\n' + msg);
          var callback = options.error || function () {
          };
          callback(code, msg, setting);
        };
        var _options = { // 자바스크립스에서 프라이빗한 변수를 쓸때 _ 를 붙임.
          server: config.SERVER_NAME,
          path: options.path || '',
          method: options.method || 'POST',
          timeout: options.timeout || 3000,
          indicator: options.indicator || {show: true, message: 'Loading..', cancelable: true},
          data: options.data || {},
          success: successFunc,
          error: errFunc
        };
        console.log('HTTP 어쪄구');
        M.net.http.send(_options);
      },
      fileHttpSend: function (options) {
        var _optioins = {
          url: config.NOTICE_WRITE_IMG + options.path,
          header: options.header || {},
          params: options.params || {},
          body: options.body || {},
          encoding: "UTF-8",
          finish: fileUploadFinish,
          progress: fileUploadProgress,
        };
        var fileUploadFinish = function (status, header, body, setting) {
          if ($.isFunction(options.finish) && status == 200) {
            options.succ(body);
          } else if ($.isFunction(options.error)) {
            options.error(status, body);
          }
        };
        var fileUploadProgress = function (total , current) {
          if ($.isFunction(options.progress)){
            options.progress(total,current);
          }
        }
        M.net.http.upload(_optioins);
      }
    }
  ;
  window.__mnet__ = MNet;
})(M, __config__, __util__, window);

