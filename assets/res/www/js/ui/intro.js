/**
 * @file : intro.js 인트로 페이지
 * @author : 
 * @date : 
 */
 
// 페이지 단위모듈
(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $percent : null,
      $progressBar : null,
      
    },
    data: {},
    init :function init(){
      this.els.$percent = $('#percent');
      this.els.$progressBar = $('#progress-bar');
    },
    
    /*
    진행도를 표시한다
    @param {function} succCallback
    */
    startProgress : function startProgress(succCallBack){
      var $percent =  this.els.$percent;
      var $progressBar = this.els.$progressBar;
      var count = 0;
      
      var interval = setInterval(function(){
        $percent.html(++count);
        $progressBar.css ('width',count+'%')
        if (count == 100 ){
          clearInterval(interval); // 반복 실행을 멈춘다.
          succCallBack();
          }
      }, 2); // 반복적으로 함수를 실행 1ms
    },
    
    moveLoginPage : function moveLoginPage() {
      M.page.html({
              url: "./login.html",
              actionType: "CLEAR_TOP"
      });
    },
    
    initView : function initView(){
      //화면에서 세팅할 동적데이터
      this.startProgress(this.moveLoginPage);
    },
    
    initEvent : function initEvent(){
      // Dom Event 바인딩
    }
  };
  
  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window){
  M.onReady(function(){
  pageFunc.init(); //최초 화면 초기화
  pageFunc.initView();
  });
  
})(jQuery,M,__page__,window);