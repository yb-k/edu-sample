/**
 * @file : join3.js
 * @author : 김소담
 * @date : 2022-03-23
 */

(function ($, M, CONFIG, window){
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginId: null,
      $dupBtn: null,
      $password: null,
      $passwordCon: null,
      $email: null,
      $joinBtn: null
    },
    data: {},
    init: function init() {
      this.els.$loginId = $('#login-id');
      this.els.$dupBtn = $('#dup-btn');
      this.els.$password = $('#password');
      this.els.$passwordCon = $('#repassword');
      this.els.$email = $('#email');
      this.els.$joinBtn = $('#join-btn');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      this.els.$dupBtn.on('click', function () {
        self.dupId();
      });
      this.els.$joinBtn.on('click', function () {
        self.join();
      });
    },
    dupId: function () {
      var id = this.els.$loginId.val().trim();

      $.sendHttp({
        path: SERVER_PATH.DUPLICATE,
        data: {
          loginId: id
        },
        succ: function (data) {
          if (data.dupYn == 'Y') {
            alert('이미 존재하는 ID입니다.');
            this.els.$loginId.val('');
          }
          if (data.dupYn == 'N') {
            alert('사용 가능한 ID입니다.');
          }
        }
      });
    },

    join: function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$password.val().trim();
      var pwCon = this.els.$passwordCon.val().trim();
      var email = this.els.$email.val().trim();

      if (id == '') {
        return alert('아이디를 입력해주세요');
      } else if (id.length < 5) {
        return alert('아이디는 최소 5자 이상입니다');
      }
      if (pw == '') {
        return alert('비밀번호를 입력해주세요.');
      }
      if (pwCon == '') {
        return alert('비밀번호 확인을 입력해주세요.');
      }
      if (pw != pwCon) {
        return alert('비밀번호가 일치하지 않습니다.');
      }
      if (email == '') {
        return alert('이메일을 입력해주세요');
      }

      self.checkPW

      $.sendHttp({
        path: SERVER_PATH.JOIN,
        data: {
          loginId: id,
          password: pw,
          userNm: M.data.param("userNm"),
          birthDate: M.data.param("birthDate"),
          gender: M.data.param("gender"),
          cellPhone: M.data.param("cellPhone"),
          email: email
        },
        succ: function (data) {
          M.page.html('./join4.html');
        },
        error: function () {
          alert('error');
        }
      });
    },

    checkPW: function () {
      var self = this;
      var pw = this.els.$password.val().trim();
      var num = pw.search(/[0-9]/g);
      var eng = pw.search(/[a-z]/ig);
      var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

      if (pw.length < 8 || pw.length > 20) {

        alert("8자리 ~ 20자리 이내로 입력해주세요.");
        return false;
      } else if (pw.search(/\s/) != -1) {
        alert("비밀번호는 공백 없이 입력해주세요.");
        return false;
      } else if (num < 0 || eng < 0 || spe < 0) {
        alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
        return false;
      } else {
        console.log("통과");
        return true;
      }
    }

    //    method: {},
  };
  window.__page__ = page;
})(jQuery, M,  __config__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);