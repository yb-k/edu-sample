/**
 * @file : 회원가입 3 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, SERVER_PATH, window) {

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
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작

      var self = this;
      this.els.$loginBtn.on('click', function () {
        M.page.html('./main.html');
      
      })
    },


    



  };
  window.__page__ = page;
})(jQuery, M, __mnet__,  __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);