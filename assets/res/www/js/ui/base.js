/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

// 페이지 단위모듈
(function ($, M, window) {
  var page = {
    els: {},
    data: {},
    init: function init() {

    },

    initView: function initView() {
      //화면에서 세팅할 동적데이터
      this.startProgress(this.moveLoginPage);
    },
    initEvent: function initEvent() {
      // initEvent 바인딩
    }
  };
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initEvent();
    pageFunc.initView();
  });

})(jQuery, M, __page__, window);