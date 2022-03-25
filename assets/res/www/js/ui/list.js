/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($,module, M, window) {
  var page = {
    els: {
      $btnModify: null,
    },
    data: {},
    init: function init() {
      this.els.$btnModify = $('.btn-modify');
      console.log(this.els.$btnModify);
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      module.setEventAllIds(this.els.$btnModify,'click','./write.html');
    },
  };
  window.__page__ = page;
})(jQuery,__util__, M, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);