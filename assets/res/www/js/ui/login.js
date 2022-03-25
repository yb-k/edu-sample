/**
 * @file : 로그인 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $loginIdIpt: null,
      $passwordIpt: null,
      $loginBtn: null,
      $autoLoginChk: null,
      $findIdBtn: null,
      $findPwBtn: null,
      $joinBtn: null
    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#loginid'); // input
      this.els.$passwordIpt = $('#password'); // input
      this.els.$loginBtn = $('#login-btn');
      this.els.$autoLoginChk = $('#auto-login-chk');
      this.els.$findIdBtn = $('#find-Id');
      this.els.$findPwBtn = $('#find-Pw');
      this.els.$joinBtn = $('#joinBtn');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      // 로그인 버튼 클릭시 동작
      var self = this;
      this.els.$loginBtn.on('click', function () {
        self.login();
      })
      // 아이디 찾기 버튼 동작
      this.els.$findIdBtn.on('click', function () {
        M.page.html('./findId.html');
      })
      // 비밀번호 찾기 버튼 동작
      this.els.$findPwBtn.on('click', function () {
        M.page.html('./findPw1.html');
      })
      // 회원가입 버튼 동작
      joinBtn
      this.els.$joinBtn.on('click', function () {
        M.page.html('./join1.html');
      })

    },
    setAutoLogin: function (id, pw) {
      // 자동로그인 기능
      M.data.storage('AUTO_LOGIN_AUTH', {
        id: id,
        pw: pw
      });

    },
    // 자동 로그인 해제 
    unsetAutoLogin: function () {
      M.data.removeStorage('AUTO_LOGIN_AUTH');
    },

    login: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val(); // 로그인 아이디 가져오기
      var pw = this.els.$passwordIpt.val(); // 비밀번호 가져오기 
      // 자동로그인
      var isAutoLogin = this.els.$autoLoginChk.prop('checked'); // true거나 false
      if (id == '') {
        return alert('아이디를 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.LOGIN,
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          console.log(data);
          M.data.global({
            'userIdSend': id
          });
          alert("로그인 성공");
          // 자동로그인 
          if (isAutoLogin) self.setAutoLogin(id, pw);
          M.page.html('./main.html');
        },
        error: function (data) {
          console.log(data);
          alert("로그인 실패");
        }
      });
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