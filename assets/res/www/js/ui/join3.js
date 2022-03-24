/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, M, MNet, module, SERVER_PATH, window) {
  var page = {
    els: {
      $userName: null,
      $gender: null,
      $birth: null,
      $cellphone: null,
      $loginId: null,
      $isCheckedId: null,
      $dupBtn: null,
      $password: null,
      $rePassword: null,
      $isCheckedPw: null,
      $email: null,
      $joinBtn: null
    },
    data: {},
    init: function init() {
      var self = this;
      self.els.$userName = M.data.param('userName');
      self.els.$gender = M.data.param('gender');
      self.els.$birth = M.data.param('birth');
      self.els.$cellphone = M.data.param('cellphone');
      self.els.$loginId = $('#login-id');
      self.els.$isCheckedId = false;
      console.log(self.els.$isCheckedId);
      self.els.$dupBtn = $('#dup-btn');
      self.els.$password = $('#password');
      self.els.$rePassword = $('#repassword');
      self.els.$email = $('#email');
      self.els.$joinBtn = $('#join-btn');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;

      self.els.$password.on('input', function () {
        self.els.$isCheckedPw = false;
      });
      self.els.$rePassword.on('input', function () {
        self.els.$isCheckedPw = false;
      });
      self.els.$loginId.on('input', function () {
        self.els.$isCheckedId = false;
      });
      self.els.$dupBtn.on('click', function () {
        var id = self.els.$loginId.val().trim();
        if (id == '') {
          return alert('아이디를 입력해주세요');
        }
        if (id.length < 5) {
          return alert('아이디는 5자 이상으로해주세요');
        }
        MNet.sendHttp({
          path: SERVER_PATH.DUPLICATE,
          data: {
            loginId: id
          },
          succ: function succ(data) {
            if (data.dupYn === 'Y') {
              return alert('중복된 아이디입니다.');
            } else {
              self.els.$isCheckedId = true;
              return alert('사용가능한 아이디입니다.');
            }
          }
        })
      });
      self.els.$joinBtn.on('click', function () {
        var id = self.els.$loginId.val().trim();
        var userName = self.els.$userName;
        var birth = self.els.$birth;
        var gender = self.els.$gender;
        var cellphone = self.els.$cellphone;
        var email = self.els.$email.val().trim();
        var pass = self.els.$password.val().trim();
        var repass = self.els.$rePassword.val().trim();
        if (self.els.$isCheckedId === false) {
          return alert('아이디 중복체크를 해주세요');
        }
        module.confirmPasswordAndRePassword(pass, repass, function () {
          self.els.$isCheckedPw = true;
        });
        if (self.els.$isCheckedPw === false) {
          return;
        }
        if (email == '') {
          return alert('이메일을 입력해주세요');
        }
        MNet.sendHttp({
          path: SERVER_PATH.JOIN,
          data: {
            loginId: id,
            password: pass,
            userNm: userName,
            birthDate: birth,
            gender: gender,
            cellPhone: cellphone,
            email: email
          },
          succ: function (data) {
            console.log('성공!');
            M.page.html('./join4.html');
          }
        });
      })
    },
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __util__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);