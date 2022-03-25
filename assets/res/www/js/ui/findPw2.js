/**
 * @file : findPw2.js
 * @author : 김소담
 * @date : 2022-03-23
 */

(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginId: null,
      $password: null,
      $passwordCon: null,
      $chgPwBtn: null
    },
    data: {},
    init: function init() {
      this.els.$loginId = $('#login-id');
      this.els.$password = $('#password');
      this.els.$passwordCon = $('#repassword');
      this.els.$chgPwBtn = $('#change-pw-btn');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
      this.els.$loginId.val(M.data.param("loginId"));
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      this.els.$chgPwBtn.on('click', function () {
        self.changePw();
      });
    },

    //    method: {},
    changePw: function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$password.val().trim();
      var pwCon = this.els.$passwordCon.val().trim();

      if (id == '') {
        return alert('ID를 입력해주세요.');
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

      if(self.checkPw(pw)){
        $.sendHttp({
          path: SERVER_PATH.PASSWORD,
          data: {
            loginId: id,
            password: pw
          },
          succ: function (data) {
            alert('비밀번호 변경 완료');
            M.page.html({
              url: "./login.html",
              actionType: "CLEAR_TOP"
            });
          },
          error: function () {
            alert('비밀번호 변경 실패');
          }
        });
      }
      else{
        return alert("비밀번호는 8~20자 사이의 문자, 숫자, 특수문자를 한 개 이상 포함해야 합니다.");
      }
    
  
    },
  
  checkPw: function (pw) {
    var reg_pw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!reg_pw.test(pw)) {
      return false;
    }
    else {
      return true;
    }
  }
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