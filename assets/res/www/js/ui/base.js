/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, window){
  var page = {
    els: {},
    data: {},
    init : function init() {},
    initView : function initView() {
      // 화면에서 세팅할 동적데이터

    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
    },
  };
  
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);