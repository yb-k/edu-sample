/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $writeBtn: null,
      $topBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$writeBtn = $('#write-btn');
      this.els.$topBtn = $('#top-btn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$writeBtn.on('click', function () {
        M.page.html('./write.html');
      });

//      $(window).scroll(function () {
//        if ($(this).scrollTop() > 100) {
//          this.els.$topBtn.addClass("on");
//        } else {
//          this.els.$topBtn.removeClass("on");
//        }
//      });
//
//      this.els.$topBtn.on('click', function () {
//        window.scrollTo({
//          top: 0,
//          behavior: 'smooth'
//        });
//      });
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