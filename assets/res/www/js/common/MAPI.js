

//namespace 모듈
//M-API 기능을 확장/기본 옵션값 핸들링하기 위해
//객체를 하나 만들어서 관리한다.

(function (M, config, Util, window){
  var ENV = config.ENV;
  var MNet = {
  
  /*
    http 통신 모듈
    @param {object} options
    @param {string} options.path 호출할 path
    @param {string} options.method HTTP 메서드 (GET|POST|PUT|DELETE)
    @param {number} options.timeout 타임아웃 시간
    @param {object} options.indicator 인디케이터 옵션
    @param {object} options.data 바디데이터
    @param {function} options.succ 성공시 롤백
    @param {function} options.error 실패시 롤백
  */
    sendHttp: function sendHttp(options){
    if(Util.isEmpty(options.path)) throw new Error('sendHttp :: 옵션의 Path값은 필수입니다.');
    
    var succFunc = function succFunc(data){
    console.log('HTTP SEND OPTION :: ', data);
    if(data.rsltCode == '0000'){
      if(data.existYn == 'N'){
        options.error(data);
      }
      if(data.dupYn == 'Y'){
        options.error(data);
        return false;
      }
      if(typeof options.succ == 'function'){
        options.succ(data);
      }
      
    }else{
      //실패
      alert(data.rsltMsg);
      if(options.error == 'function'){
        options.error(data);
      }
    }
      
    }
    var errFunc = function errFunc(code, msg, setting){
      alert(code + '\n' + msg);
      var callback = options.error || function(){};
      callback(code, msg);
      if(typeof options.error == 'function'){
        options.error(code, msg);
      }
    };
    
    var _options = {
        server: config.SERVER_NAME,
          path: options.path || '', //필수
          method: options.method || 'POST',
          timeout: options.timeout || 3000,
          indicator: options.indicator || {show: true, message: 'Loading..', cancelable: false },
          data: options.data || {},
          success: succFunc,
          error: errFunc
        };
    
      console.log('HTTP URL ::' + _options.path);
      M.net.http.send(_options); //실제로 통신 시작
    }
  }; 
  
  $.fileHttpSend = function (options) {
        
        // body: [
        // { content: "파일업로드", type: "TEXT" },
        // { name: "imgs", content: "test.zip", type: "FILE" },
        // ],
        var fileUploadFinish = function (status, header, body, setting) {
          var _body = null;
          try {
            var _body = JSON.parse(body);
          } catch (e) {
            _body = body;
          }
    
          if (status == '200' && $.isFunction(options.succ) && _body.body.rsltCode == '0000') {
            options.succ(_body.body);
          } else if ($.isFunction(options.error)) {
            options.error(status, body)
          }
        }
        
        var fileUploadProgress = function (total, current) {
          if ($.isFunction(options.progress)) {
            options.progress(total, current)
          }
        }
        var _options = {
          url: "http://211.241.199.241:28040/" + ENV.UPLOAD_URL + options.path,
          header: options.header || {},
          params: options.params || {},
          body: options.body || [],
          encoding: "UTF-8",
          finish: fileUploadFinish,
          progress: fileUploadProgress
        }
    
    
        M.net.http.upload(_options);
      }
  window.__mnet__ = MNet;
})(M, __config__, __util__, window);