/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */
// 페이지단위 모듈
(function ($, M, SERVER_PATH , MNet ,  window ){
  var page = {
    els:{
      $percent: null,
      $progressBar:null,
    },
    data: {},
    init: function init(){
      this.els.$percent = $('#percent');
      this.els.$progressBar = $('#progress-bar');
      
    },
    
    /**
    * 진행도를 표시한다
    * @param {function} succCallback
    */
    startProgress: function startProgress(succCallback){
      var $percent = this.els.$percent;
      var $progressBar = this.els.$progressBar;
      var count = 0;
      var interval = setInterval(function () {
        count = count + 10;
        $percent.html(count);
        $progressBar.css('width',count+'%');
        if(count == 100){
          clearInterval(interval); // 반복 실행을 멈춘다.
          succCallback();
        }
      }, 50); // 반복적으로 함수 실행
    },
    moveLoginPage: function moveLoginPage(){
      M.page.html({
           url: "./login.html",
           actionType: "CLEAR_TOP"
      });
      
      
    },
    initView: function initView(){
      // 화면에서 세팅할 동적데이터
      var self = this;
      var existLoginData = M.data.storage('AUTO_LOGIN_AUTH'); 
      if(existLoginData){
        this.startProgress(function(){
        MNet.sendHttp({
          path: SERVER_PATH.LOGIN,
          data: {
            loginId : iexustLoginData.id,
            password : existLoginData.pw
          },
          succ: function (data) {
            // f 로그인 성공 햇을때 콜백
            M.page.html('./main.html');
            
            alert('로그인 성공')
          },error  : function(){
            self.moveLoginPage();
          }
        });
      });
      }
      this.startProgress(this.moveLoginPage);
    },
    initEvent: function initEvent(){
      // initEvent 바인딩
    }
  };
  window.__page__ = page;
})(jQuery, M, __serverpath__ , __mnet__ , window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window){
  M.onReady(function() {
    pageFunc.init();
    pageFunc.initView();
  });
})(jQuery, M, __page__,  window);