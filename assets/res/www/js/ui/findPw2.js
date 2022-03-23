/**
 * @file : findPw2.js
 * @author : 김소담
 * @date : 2022-03-23
 */

(function ($, M, MNet, config, SERVER_PATH, window) {
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

      self.checkPW

      MNet.sendHttp({
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
    },

    checkPW : function (){

        var pw = this.els.$password.val().trim();
        var num = pw.search(/[0-9]/g);
        var eng = pw.search(/[a-z]/ig);
        var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
       
        if(pw.length < 8 || pw.length > 20){
       
         alert("8자리 ~ 20자리 이내로 입력해주세요.");
         return false;
        }else if(pw.search(/\s/) != -1){
         alert("비밀번호는 공백 없이 입력해주세요.");
         return false;
        }else if(num < 0 || eng < 0 || spe < 0 ){
         alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
         return false;
        }else {
           console.log("통과"); 
           return true;
        }
    }
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);