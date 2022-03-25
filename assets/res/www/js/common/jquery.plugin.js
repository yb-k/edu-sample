

/**
 * jQuery Custom Plugin
 * @author 
 */

(function ($, M, CONFIG) {
  var ENV = CONFIG.ENV;
  var MSG = CONFIG.MSG;
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_CODE = CONFIG.SERVER_CODE;
  
  $.fileHttpSend = function (options) {
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
      url: ENV.UPLOAD_URL + options.path,
      header: options.header || {},
      params: options.params || {},
      body: options.body || [],
      encoding: "UTF-8",
      finish: fileUploadFinish,
      progress: fileUploadProgress
    }
    M.net.http.upload(_options);
  };
  /**
   * 함수 여부 확인
   * @param {any} target 
   * @returns {boolean}
   */
  $.isFunction = function isFunction (target) {
    return typeof target === 'function';
  }

  /**
   * 문자열 여부 확인
   * @param {any} target 
   * @returns {boolean}
   */
  $.isString = function isString (target) {
    return typeof target === 'string';
  }

  /**
  * 값의 존재 여부 확인
  */
  $.isEmpty = function isEmpty(obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    if (typeof obj == "number") obj = obj + "";

    if (obj == null) return true;
    if (obj == undefined) return true;
    if (obj == "undefined") return true;

    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
};

  /**
   * modal 옵션
   * @param {object} options option 값
   * @param {string} options.title 제목 / 기본값 : '알림'
   * @param {string} options.content 내용 / 기본값 : ''
   * @param {array} options.buttons 문자열 버튼 배열 / 기본값 ['확인']
   * @param {function} options.callback 클릭 이벤트 처리
   */
  $.modal = function modal(options, callback) {
    if($.isString(options)) options = { content: options };
    if($.isFunction(callback)) options.callback = callback;
    var _options = {
      title: options.title || '알림',
      message: options.content || '',
      buttons: options.buttons || ['확인'],
      callback: function (idx) {
        if($.isFunction(options.callback)) {
          options.callback(idx);
        }
      }      
    };
    M.pop.alert(_options);
  }

  /**
   * 토스트 팝업을 띄운다
   * @param {string} msg 
   */
  $.toast = function toast(msg) {
    M.pop.instance(msg);
  };

  /**
   * 화면이동에 대한 기본 함수
   * @param {object} options 
   * @param {string} options.url 이동할 페이지 값
   * @param {object} options.param 넘길 파라미터 값
   * @param {string} options.actionType 이동시 액션타입 / NEW_SCR(기본), NO_HISTORY, CLEAR_TOP
   */
  $.movePage = function movePage(options) {
    if($.isString(options)) options = { url: options };
    if ($.isEmpty(options.url)) throw new Error('$.movePage :: url 값은 필수입력입니다.');
    var _options = {
      url: options.url,
      param: options.param || {},
      actionType: options.actionType || 'NEW_SCR'
    };
    M.page.html(_options);
  }

  /**
  * HTTP 통신 모듈
  * @param {object} options 
  * @param {string} options.path 호출할 path
  * @param {string} options.method HTTP 매서드 (GET|POST|PUT|DELETE)
  * @param {number} options.timeout 타임아웃 시간
  * @param {object} options.indicator 인디케이터 옵션
  * @param {object} options.data 바디데이터
  * @param {funciton} options.succ 성공시 콜백
  * @param {function} options.error 실패시 콜백
  */
  $.sendHttp = function sendHttp(options) {
   if($.isEmpty(options.path)) throw new Error('sendHttp :: 옵션의 Path 값은 필수입니다.');
   var succFunc = function succFunc(data) {
     console.log('HTTP RESPONE :: ', data);
     if (data.rsltCode == SERVER_CODE.SUCC) {
       if ($.isFunction(options.succ)) {
         options.succ(data);
       }
     } else {
       // 실패
       $.modal(data.rsltMsg);
       if ($.isFunction(options.error)) {
         options.error(data);
       }
     }
   };

   var errFunc = function errFunc(code, msg, setting) {
    $.modal(code + '\n' + msg);
     var callback = options.error || function(){};
     callback(code, msg, setting);
   };

   var _options = {
     server: ENV.SERVER_NAME,
     path: options.path , // 필수
     method: options.method || 'POST',
     timeout: options.timeout || 3000,
     indicator: options.indicator || { show:ENV.INDICATOR, message: MSG.INDICATOR_MSG, cancelable: false },
     data: options.data || {},
     success: succFunc,
     error: errFunc
   };

   console.log('HTTP URL :: ' + _options.path);
   M.net.http.send(_options); // 실제로 통신 시작
 }
 
 
  // 앱 환경변수값
/*  var ENV = module.ENV = {
    IS_DEV : IS_DEV,
    SERVER_NAME : 
  };
  
  $.fileHttpSend = function (options){
    var fileUploadFinish = function(status, header, body, setting){
       if(status == 200 && $.isFunction(options.succ)){
        options.succ(status)
       }else if($.isFunction(options.error)){
         options.error(status, body)
       }
    }
    var fileUploadProgress = function(total, current){
      if($.isFunction(options.progress)){
        options.progress(total, current)
      }
    }
    var _options = {
      url : ENV.UPLOAD_URL + options.path,
      header : options.header || {},
      params : options.params || {},
      body : options.body || {},
      encoding : "UTF-8",
      finish: fileUploadFinish,
      progress : fileUploadProgress
    }
  
  }*/

 // Storage 저장소 관련 모듈
 $.storage = {
   /**
    * 저장된 사용자 로그인 정보를 가져온다.
    * @returns {object|string}
    */
   getAuth: function getAuth() {
    return M.data.storage(CONSTANT.AUTO_LOGIN_AUTH);
   },

   /**
    * 사용자 로그인 정보를 저장한다.
    * @param {string} id 
    * @param {string} pw 
    */
   setAuth: function setAuth(id, pw) {
    M.data.storage(CONSTANT.AUTO_LOGIN_AUTH, {id:id, pw:pw})
   },
   /**
    * 저장된 사용자 로그인 정보를 삭제한다.
    */
   clearAuth: function clearAuth() {
    M.data.removeStorage(CONSTANT.AUTO_LOGIN_AUTH);
   }
 }

})(jQuery, M, __difinition__);