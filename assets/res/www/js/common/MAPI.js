
//namespace 모듈
//M-API 기능을 확장 / 기본옵션값을 핸들링하기위해 객체를 하나 만들어서 관리

(function(M, config, Util, window){
  var MNet = {
    /*
    HTTP 통신 모듈
    @param {object} options
    @param {string} options.path 호출할 path
    @param {string} options.method HTTP 메소드 (GET|POST|PUT|DELETE)
    @param {number} options.timeout 타임아웃 시간
    @param {object} options.indicator 인디케이터 옵션 인디케이터가 몬데요? 몬가 동작을 했을 때 화면 동작에대해서 막고싶을 때 -> 뱅글 도는 화면
    @param {object} options.data 바디데이터 
    @param {function} options.succ 성공시 콜백
    @param {function} options.error 실패 시 콜백
    */
    sendHttp: function sendHttp(options){
    if(Util.isEmpty(options.path)) throw new Error('sendHttp :: 옵션의 path값은 필수입니다.')
     
      var succFunc = function succFunc(data){
        console.log('HTTP RESPONE ::', data);
        if(data.rsltCode == '0000'){
          if (typeof options.succ == 'function'){
            options.succ(data);
          }
      }
      else{
        //실패
        //alert(data.rsltMsg);
        if(typeof options.error === 'function'){
          options.error(data);
        }
      }
      };
      var errFunc = function errFunc(code, msg, setting){
        alert(code + '\n' + msg);
//        if(typeof options.succ == 'function'){
//          options.error(code, msg);
//        } 방어코드
        var callback = options.error || function(){};
        callback(code, msg, setting);
      };
      
       var _options = { //private한 변수는 _붙이기도 함
              server: config.SERVER_NAME,
              path: options.path || '',
              method: options.method || 'POST',
              timeout: options.timeout || 3000,
              indicator: options.indicator ||{show: true, message: 'Loading..', cancelable: true},
              data: options.data || {},
              success: succFunc,
              error: errFunc
            };
        
      console.log('HTTP URL :: '+_options.path);
      M.net.http.send(_options); //실제로 통신 시작
    }
  };
 
 window.__mnet__ = MNet;
})(M, __config__, __util__, window);
