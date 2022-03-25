/**
   모듈 작성
   
 * 객체를 하나 만들어서 관리한다.
 */

(function (M,CONFIG, config, Util, window){
  var ENV = CONFIG.ENV;
  var MSG = CONFIG.MSG;
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_CODE = CONFIG.SERVER_CODE;
  
  var MNet = { // 한번 더 감싸서 사용하는 디폴트값 설정하기 위해
    /*
      HTTP통신 모듈
      @param {object} options
      @param {string} options.path 호출할 path
      @param {string} options.method HTTP 메서드 (get|post|put|delete)
      @param {number} options.timeout 타임아웃 시간
      @param {object} options.indicator 인디케이터 옵션
                                      indicator : 화면 동작에 대해 
      @param {object} options.data 바디데이터
      @param {function} options.succ 성공시 콜백
      @param {function} options.error 실패시 콜백
    */
    sendHttp : function sendHttp(options){
      if(Util.isEmpty(options.path)) throw new Error
      ('sendHttp :: 옵션의 path 값은 필수입니다.');
      
      var succFunc = function succFunc(data){
        console.log('HTTP RESPONE :: ', data);
        if (typeof options.succ === 'function'){
          options.succ(data);
        }
      };
      
      var errFunc = function errFunc(code, msg, setting){
        alert(code + '\n' + msg);
        var callback = options.error || function(){};
        callback(code, msg, setting);
        if (typeof  options.error === 'function'){
                options.error(code, msg);
        }
      };
    
      var _options = {  // option서로다름
          server: config.SERVER_NAME,
          path : options.path, // 필수 
          method : options.method || 'POST',
          timeout : options.timeout || 3000,
          indicator : options.indicator || { show: true,message: 'Loading..', cancelable: false },
          data : options.data || {},
          success : succFunc,
          error : errFunc
      };
       
      console.log('HTTP URL :: ' + _options.path);
      M.net.http.send(_options); // 실제 통신 시작
    },
    fileHttpSend : function fileHttpSend(options) {
      // body: [
      // { content: "파일업로드", type: "TEXT" },
      // { name: "imgs", content: "test.zip", type: "FILE" },
      // ],
      var fileUploadFinish = function (status, header, body, setting) {
        var _body = null;
        try {
          var _body = JSON.parse(body);
        } catch(e) {
          _body = body;
        }
        
        if (status == '200' && $.isFunction(options.succ) && _body.rsltCode == SERVER_CODE.SUC) {
          options.succ(_body.body);
        } else if ($.isFunction(options.error)) {
          options.error(status, body)
        }
      }
      var fileUploadProgress = function (total, current) {
        if($.isFunction(options.progress)) {
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
  };
  window.__mnet__ = MNet;
 
})(M,__difinition__,__config__,__util__, window);