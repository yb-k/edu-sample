/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */
 
// 페이지 단위모듈
(function ($, M, SERVER_PATH, MNet,  window){
  var page = {
    els: { // elements 
      $percent : null,
      $progressBar : null,
      
    },
    data: {},
    init :function init(){
      this.els.$percent = $('#percent'); // # < intro.html 에서 id갖고옴
      this.els.$progressBar = $('#progressBar');
    },
    
    /*
      진행도를 표시한ㄷㅏ.
      @param {function} succCallback 완료 후 호출될 함수
    */
    
    startProgress : function startProgress(succCallback){
      var $percent =  this.els.$percent;
      var $progressBar = this.els.$progressBar;
      var count = 0;
      
      var interval = setInterval(function(){
        $percent.html(++count);
        $progressBar.css ('width',count+'%')
        if (count == 100 ){
          clearInterval(interval)// 100퍼센트가 되면 멈출거고, 
          succCallback(); // 완료 후 호출 될 함수 
          }
      }, 5); // 반복적으로 함수를 실행 1ms
    },
    // 로그인 페이지로 이동
    moveLoginPage : function moveLoginPage(){
      M.page.html({
        url: "./login.html",
        actionType : "CLEAR_TOP"
      });
    },
    initView : function initView(){
      //화면에서 세팅할 동적데이터
      var self = this;
      var existLoginData = M.data.storage('AUTO_LOGIN_AUTH');
      // 자동로그인 체크가 되어있는 상태라면 
      if (existLoginData) {
        this.startProgress (function(){
           MNet.sendHttp({
            path : SERVER_PATH.LOGIN,
            data : {
              loginId : existLoginData.id, 
              password : existLoginData.pw
            },
            succ : function(data){
              M.page.html('./main.html');
            }, 
            error : function(data){
              alert("로그인 슈퍼 실패");   
              self.moveLoginPage();   
            }
           });
      });
      }else {
        this.startProgress(this.moveLoginPage);
      }
      this.startProgress(this.moveLoginPage); // 로그인 무브 함수 넘겨주기 (호출아님)
    },
    initEvent : function initEvent(){
      // Dom Event 바인딩
    }
  };
  window.__page__ = page;
})(jQuery,M, __serverpath__, __mnet__ , window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window){
  M.onReady(function(){
  pageFunc.init(); //최초 화면 초기화
  pageFunc.initView();
  });
  
})(jQuery, M, __page__,window);