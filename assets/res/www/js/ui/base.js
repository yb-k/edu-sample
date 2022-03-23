/**
 * @file : base.js
 * @author : 심수현
 * @date : 2022-03-22
 */

 (function ($,M,window){
  var page = {
    els:{
    },
    data: {},
    init: function init(){},
    initView: function initView(){
      // 화면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent(){
      // DOM Event 바인딩
    },
    
//    method: {},
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