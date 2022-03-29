/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window) {
  var id;
  var page = {
    els: {
      $userNm: null,
      $loginId: null,
      $password: null,
      $birthDate: null,
      $email: null,
      $cellPhone: null,
      $saveBtn: null,
      $outBtn: null,
      $btnBack: null,
      $changePw: null,




    },
    data: {},
    init: function init() {
      this.els.$userNm = $('#userNm');
      this.els.$loginId = $('#loginId');
      this.els.$password = $('#password');
      this.els.$birthDate = $('#birthDate');
      this.els.$email = $('#email');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$saveBtn = $('#saveBtn');
      this.els.$outBtn = $('#outBtn');
      this.els.$btnBack = $("button[class='btn-back l-fix']");
      this.els.$changePw = $('#changePw');

    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      if (M.data.storage("AUTO_LOGIN_AUTH")) {
        id = M.data.storage("AUTO_LOGIN_AUTH").id;
      } else {
        id = M.data.global("userId");
      }
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.INFO,
        data: {
          loginId: id,
        },
        succ: function (data) {
          self.els.$userNm.val(data.userNm);
          self.els.$birthDate.val(data.birthDate);
          self.els.$loginId.val(id);
          self.els.$cellPhone.val(data.cellPhone);
          self.els.$email.val(data.email);
        },

      });

    },
    initEvent: function initEvent() {
      var self = this;
      // initEvent 바인딩
      self.els.$btnBack.on('click', function () {
        M.page.back();
      });
      self.els.$password.on('propertychange change keyup paste input', function () {
        if (self.els.$password.val().trim().length >= 1) {
          $(self.els.$saveBtn).attr("disabled", false);

        } else {
          $(self.els.$saveBtn).attr("disabled", true);
        }

      });
      self.els.$changePw.on('click', function () {
        self.changePw();
      });
      self.els.$saveBtn.on('click', function () {
        self.changeInfo();
      });
      $('#outBtn').on('click', function () {
          self.pwChk();

      });

    },

    changePw: function () {
      var pw = this.els.$password.val().trim();
      if (pw == '') {
        return alert("비밀번호를 입력해주세요.");
      }
      MNet.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          loginId: id,
          password: pw,

        },
        succ: function (data) {
          if (data.rsltCode == '0000') {
            alert('password 변경 페이지로 이동!');
            M.page.html('./findPw2.html', {
              param: {
                loginId: id
              }
            });
          } else {
            console.log(data);
            return alert('password가 일치하지 않습니다.');
          }
        },

      });
    },

    changeInfo: function () {
      if (M.data.storage("AUTO_LOGIN_AUTH")) {
        id = M.data.storage("AUTO_LOGIN_AUTH").id;
      } else {
        id = M.data.global("userId");
      }
      var self = this;
      var userNm = self.els.$userNm.val().trim();
      var birthDate = self.els.$birthDate.val().trim();
      var cellPhone = self.els.$cellPhone.val().trim();
      var email = self.els.$email.val().trim();
      var pw = this.els.$password.val().trim();
      MNet.sendHttp({
        path: SERVER_PATH.UPDATE,
        data: {
          loginId: id,
          password: pw,
          userNm: userNm,
          birthDate: birthDate,
          cellPhone: cellPhone,
          email: email,

        },
        succ: function (data) {
          alert("정보수정 완료!");
          self.els.$password.val('');


        },

      });
    },
    pwChk: function () {
      var pw = this.els.$password.val().trim();
      var self = this;

      if (pw == '') {
        return alert("비밀번호를 입력해주세요.");
      }
      MNet.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          loginId: id,
          password: pw,

        },
        succ: function (data) {
          if (data.rsltCode == '0000') {
            self.out();
          } else {
            console.log(data);
            return alert('password가 일치하지 않습니다.');
          }
        },
        error: function (data) {
          return alert('password가 일치하지 않습니다.');
        },

      });

    },
    out: function () {
      var result = confirm('정말로 탈퇴하겠습니까?');
      if (result) {
        MNet.sendHttp({
          path: SERVER_PATH.OUT,
          data: {
            loginId: id,
          },
          succ: function (data) {
            alert('탈퇴되었습니다.');
            M.data.removeStorage('AUTO_LOGIN_AUTH');
            M.page.html({
              url: "./login.html",
              actionType: 'CLEAR_TOP'
            });
          },
          error: function (data) {
            return alert('password가 일치하지 않습니다.');
          },

        });
      } 
    }
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);