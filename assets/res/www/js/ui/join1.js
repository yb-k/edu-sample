/**
 * @file : 회원가입1 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $chk1: null,
      $chk2: null,
      $chk3: null,
      $chk4: null,
      $nextBtn: null,

    },
    data: {},
    init: function init() {
      this.els.$chk1 = $('#chk1'); // 체크박스 1 가져오기
      this.els.$chk2 = $('#chk2'); // 체크박스 2 가져오기
      this.els.$chk3 = $('#chk3'); // 체크박스 3 가져오기
      this.els.$chk4 = $('#chk4'); // 체크박스 4 가져오기
      this.els.$nextBtn = $('#nextBtn');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      //  체크박스 눌렀을 때 동작
      this.els.$chk1.on('change', function () {
        self.allCheck();
      });

      // 다음 버튼 눌렀을 때 동작
      this.els.$nextBtn.on('click', function () {
        self.newxtJoin2();
      })
    },


    allCheck: function () {
      if (this.els.$chk1.prop('checked')) {
        return $("input:checkbox[class='chk']").prop("checked", true);
      } else {
        return $("input:checkbox[class='chk']").prop("checked", false);
      }
    },


    // 다음으로 가기
    newxtJoin2: function () {
      if (this.els.$chk2.prop('checked') && this.els.$chk3.prop('checked')) {
        return M.page.html("./join2.html");
      } else {
        alert("(필수)서비스 와 개인정보 이용약관에 동의해주세요.");
      }
    }

  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);