/**
 * @file : join4.js
 * @author : 김소담
 * @date : 2022-03-23
 */

(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $loginBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginBtn = $('#login-btn');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      this.els.$loginBtn.on('click', function () {
        M.page.html({
          url: "./login.html",
          actionType: "CLEAR_TOP"
        });
      })
    },
    //    method: {},
  };
  window.__page__ = page;
})(jQuery, M,  __config__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);