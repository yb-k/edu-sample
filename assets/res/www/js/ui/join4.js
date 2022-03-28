/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, window){

  var page = {
    els:  {
      $loginBtn : null
    },
    data: {},
    init: function init(){
      this.els.$loginBtn = $('#loginBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      $('.l-fix').on('click', function(){
        M.page.back();
      });
    },
    initEvent : function initEvent(){
      this.els.$loginBtn.on('click', function(){
        M.page.html({
          url: "./login.html",
          actionType: 'CLEAR_TOP'
        });
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);