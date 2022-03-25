/**
 * @file : 회원가입
 * @author : 김정원
 * @date : 2022-03-25
 */
// 페이지단위 모듈
(function ($, M, window) {

  var checkId;
  var page = {
    els: {
      $loginBtn: null,


    },
    data: {},
    init: function init() {
      this.els.$loginBtn = $('#loginBtn');
      

      

    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      this.els.$loginBtn.on('click', function () {
        M.page.html("./login.html");
      });
      

    },

   


  };
  window.__page__ = page;
})(jQuery, M, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);