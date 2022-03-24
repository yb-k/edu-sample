/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $userMenuBtn: null,
      $allViewBtn: null,
      $noticeBtn: null
    },
    data: {},
    init: function init() {
      this.els.$userMenuBtn = $('#userMenu-btn');
      this.els.$allViewBtn = $('#allView-btn');
      this.els.$noticeBtn = $('#notice-btn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$userMenuBtn.on('click', function () {
        M.page.html('./userInfo.html');
      });
      this.els.$allViewBtn.on('click', function () {
        M.page.html('./list.html');
      });
      this.els.$noticeBtn.on('click', function () {
        M.page.html('./list.html');
      });
      console.log(M.data.global('myId'));

    },

  };

  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);