/**
 * @file : 
 * @author :
 * @date : 
 */

// 페이지 단위 모듈
(function ($, M, window){
  var ENV = CONFIG.ENV;
  var MSG = CONFIG.MSG;
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_CODE = CONFIG.SERVER_CODE;
  var page = {
    els: {},
    data: {},
    init: function init() {},
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
    }
  };
  window.__page__ = page;
})(jQuery, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  // 화면에 리소스가 로딩을 끝내고 정상적으로 동작할 수 있는 시점에 대한 콜백
  // window.onload 와 비슷함.
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);