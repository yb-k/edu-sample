/**
 * @file : login.js 페이지
 * @author : 박도영
 * @date : 2022-03-22
 */

(function ($, M, MNet, config, SERVER_PATH, window) {
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
      this.els.$loginIdIpt = $('#login-id'); // input tag 임
      this.els.$passwordIpt = $('#password');
      this.els.$loginBtn = $('#login-btn');
      this.els.$autoLoginChk = $('#auto-login-chk');
      this.els.$findIdBtn = $('#find-id');
      this.els.$findPwBtn = $('#find-pw');
      this.els.$joinBtn = $('#join-btn');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      this.els.$loginBtn.on('click', function () {
        self.login();
      });
      this.els.$findIdBtn.on('click', function () {
        M.page.html('./findId.html');
      });
      this.els.$findPwBtn.on('click', function () {
        M.page.html('./findPw1.html');
      });
      this.els.$joinBtn.on('click', function () {
        M.page.html('./join1.html');
      })
    },
    setAutoLogin: function saveAutoLogin(id, pw) {
      M.data.storage('AUTO_LOGIN_AUTH', {id: id, pw: pw});
    },
    unsetAutoLogin: function unsetAutoLogin() {
      M.data.removeStorage('AUTO_LOGIN_AUTH');
    },
    login: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      var isAutoLogin = this.els.$autoLoginChk.prop('checked'); // true or false
      if (id == '') {
        return alert('아이디를 입력해주세요');
      }
      if (pw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      MNet.sendHttp({
        path: SERVER_PATH.LOGIN,
        data: {
          loginId: id,
          password: pw,
        },
        succ: function (data) {
          if (isAutoLogin) self.setAutoLogin(id, pw);
          else self.unsetAutoLogin();
          console.log(data);
          if (data.rsltCode == '0000'){
            M.data.global("LOGIN_INFO",{id : id});
            M.page.html('./main.html');
          }else {
            alert('패스워드가 틀립니다.');
          }
        }
      });
    },
//    method: {},
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __difinition__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);