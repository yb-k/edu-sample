// namespace 모듈
// M-API 기능을 확장/ 기본 옵션 값 핸들링하기위해 객체를
// 하나 만들어서 관리한다.

(function (M, config, Util, window) {
  var MNet = {
    /*
      http 통신 모듈
      @param {object} options
      @param {string} options.path 호출할 path
      @param {string} options.method HTTP 메소드 (GET|POST|PUT|DELETE)
      @param {number} options.timeout 타임아웃 시간
      @param {object} options.indicator 인디케이터 옵션
      @param {object} options.data 바디데이터
      @param {function} options.succ 성공시 콜백
      @param {function} options.error 실패시 콜백
    */
    sendHttp: function sendHttp(options) {
      if(Util.isEmpty(options.path)) throw new Error
      ('sendHttp :: 옵션의 Path 값은 필수입니다.');
      
      
    
    var succFunc = function succFunc(data) {
      console.log('HTTP RESPONE ::', data);
      if(data.rsltCode == '0000'){
        if(typeof options.succ === 'function') {
          options.succ(data);
        }
      } else {
        //실패
        alert(data.rsltMsg);
        if(typeof options.error === 'function') {
          options.error(data);
        }
      }
        
    };
    
    var errFunc = function errFunc(code, msg, setting) {
      alert(code+ '\n' +msg);  
      var callback  = options.error || function() {};
      callback(code, msg, setting);
      if(typeof options.error == 'function') {
        options.error(code, msg);
      }
    };  
    
    var _options = {
            server: config.SERVER_NAME,
            path : options.path, //필수
            method : options.method || 'POST',
            timeout : options.timeout || 3000,
            indicator : options.indicator || { show:true, message: 'Loading..', cancelable: false},
            data: options.data || {},
            success : succFunc,
            error : errFunc
          };
          
    console.log('HTTP URL :: ' + _options.path);
    M.net.http.send(_options); //실제로 통신 시작
  }
};

window.__mnet__ = MNet;

})(M, __config__, __util__, window);