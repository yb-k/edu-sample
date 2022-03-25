/**
 * @file : join4.js
 * @author : 강샛별
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
      els: {
        $loginBtn : null 
      },
      data: {},
      init : function init() {
        this.els.$loginBtn = $('#login-btn');
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$loginBtn.on('click', function(){
           self.loginBtn();
        });
      },
      loginBtn : function() {
        M.page.html('./login.html');
      }
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);