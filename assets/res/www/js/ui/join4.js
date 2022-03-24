/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($,M,window){
  var page = {
    els:{
      $loginBtn : null
    },
    data: {},
    init: function init(){
      this.els.$loginBtn = $('#login-btn');
    },
    initView: function initView(){
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent(){
      // DOM Event 바인딩
      this.els.$loginBtn.on('click',function (){
        M.page.html('./login.html');
      })
    },
  };
  window.__page__ = page;
})(jQuery,M,window);

(function($,M,pageFunc,window){
  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M,__page__,window);