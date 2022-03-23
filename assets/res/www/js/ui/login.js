/**
 * @file : 로그인 페이지
 * @author : 김용범
 * @date : 2022-03-22
 */

// 페이지 단위 모듈
(function ($, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginIdIpt: null,
      $passwordIpt: null,
      $loginBtn: null,
      $autoLoginChk: null,
      $findIdBtn: null,
      $findPwBtn: null,
      $joinBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#login-id'); // input 
      this.els.$passwordIpt = $('#password');
      this.els.$autoLoginChk = $('#auto-login-chk');
      this.els.$findIdBtn = $('#find-id');
      this.els.$findPwBtn = $('#find-pw');
      this.els.$joinBtn = $('#join-btn');
      this.els.$loginBtn = $('#login-btn');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$loginBtn.on('click', function () {
        self.login();
      })
    },
    login: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim(); // 로그인 아이디 가져오기
      var pw = this.els.$passwordIpt.val().trim(); // 비밀번호 가져오기
      var isAutoLogin = this.els.$autoLoginChk.prop('checked')// true / false;
      if (id == '') {
        return $.alert('아이디를 입력해주세요');
      }

      $.sendHttp({
        path: SERVER_PATH.LOGIN,
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          // 로그인이 성공했을때 콜백
          isAutoLogin ?  $.storage.setAuth(id,pw) : $.storage.clearAuth();
          $.movePage({
            url: './main.html',
            actionType: 'CLEAR_TOP',
          });
        }
      });
    }
  };
  window.__page__ = page;
})(jQuery, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  // 화면에 리소스가 로딩을 끝내고 정상적으로 동작할 수 있는 시점에 대한 콜백
  // window.onload 와 비슷함.
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);