/**
 * @file : 회원가입 약관동의
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M,CONFIG ,  window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
 
  var page = {
    els: {
      $chk1: null,
      $chk2: null,
      $chk3: null,
      $chk4: null,
      $nextBtn: null
    },
    data: {},
    init: function init() {
      this.els.$chk1 = $('#chk1'); // input check
      this.els.$chk2 = $('#chk2'); // input check
      this.els.$chk3 = $('#chk3'); // input check
      this.els.$chk4 = $('#chk4'); // input check
      this.els.$nextBtn = $('#nextBtn');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    //input:checkbox[class='chk']
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      // 모두 확인, 동의합니다 checkbox를 클릭했을 때 동작 
      this.els.$chk1.on('click', function () {
        self.selectAll();
      })
      // 다음 버튼 누른 후 동작
      this.els.$nextBtn.on('click', function () {
        self.next();
      })
    },
    selectAll: function () {
      if (this.els.$chk1.is(':checked')) {
        $("input:checkbox[class='chk']").prop('checked', true);
      } else {
        $("input:checkbox[class='chk']").prop('checked', false);
      }
    },
    next: function () {
      if (!this.els.$chk2.is(':checked')) {
        return alert("이용약관 동의를 선택해주세요(필수)");
      }
      if (!this.els.$chk3.is(':checked')) {
        return alert("개인정보 수집 및 동의를 선택해주세요(필수)");
      }
      M.page.html("./join2.html");
    }
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);