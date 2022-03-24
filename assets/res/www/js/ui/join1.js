/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, M, window) {
  var page = {
    els: {
      $chk1: null,
      $chk2: null,
      $chk3: null,
      $chk4: null,
      $nextBth: null
    },
    data: {},
    init: function init() {
      this.els.$chk1 = $('#chk1');
      this.els.$chk2 = $('#chk2');
      this.els.$chk3 = $('#chk3');
      this.els.$chk4 = $('#chk4');
      this.els.$nextBth = $('#next-btn');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      this.els.$chk1.on('click', function () {
        if (self.els.$chk1.prop('checked')) {
          $('.chk').prop('checked',true);
        } else {
          $('.chk').prop('checked',false);
        }
      });
      this.els.$nextBth.on('click',function (){
        if ($('#chk2').prop('checked') == false){
          return alert('서비스 이용약관에 동의하셔야합니다');
        }
        if ($('#chk3').prop('checked') == false){
          return alert('개인정보 수집 및 이용에 동의하셔야합니다');
        }
        M.page.html('./join2.html');
      });
    },
  };
  window.__page__ = page;
})(jQuery, M, window);


(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);