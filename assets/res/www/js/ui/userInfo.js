/**
 * @file : userInfo.js
 * @author : 김소담
 * @date : 2022-03-24
 */

(function ($, M, MNet, config, SERVER_PATH, window) {
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
      $changePw: null
    },
    data: {},
    init: function init() {
      this.els.$userNm = $('#user-name');
      this.els.$loginId = $('#login-id');
      this.els.$password = $('#password');
      this.els.$birthDate = $('#birth-date');
      this.els.$email = $('#email');
      this.els.$cellPhone = $('#cell-phone');
      this.els.$saveBtn = $('#save-btn');
      this.els.$outBtn = $('#out-btn');
      this.els.$changePw = $('#change-pw');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
      var id = M.data.global("loginId");
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.INFO,
        data: {
          loginId: id
        },
        succ: function (data) {
          self.els.$userNm.val(data.userNm);
          self.els.$loginId.val(id);
          self.els.$birthDate.val(data.birthDate);
          self.els.$cellPhone.val(data.cellPhone);
          self.els.$email.val(data.email);
        },
        error: function () {
          alert('회원정보를 불러올 수 없습니다.');
        }
      });
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      var id = M.data.global("loginId");
      this.els.$password.on('change', function () {
        if (self.els.$password.val() != null) {
          self.els.$saveBtn.attr("disabled", false);
        } 
        if (self.els.$password.val() == null) {
          self.els.$saveBtn.attr("disabled", true);
        }
      });
      this.els.$changePw.on('click', function () {
        M.page.html({
          path: "./findPw2.html",
          param: {
            "loginId": id
          }
        });
      });
      this.els.$saveBtn.on('click', function () {
        var pw = self.els.$password.val().trim();
        var phone = self.els.$cellPhone.val().trim();
        var email = self.els.$email.val().trim();

        MNet.sendHttp({
          path: SERVER_PATH.UPDATE,
          data: {
            loginId: id,
            password: pw,
            cellPhone: phone,
            email: email
          },
          succ: function (data) {
            alert('회원수정이 완료되었습니다.');
          },
          error: function () {
            alert('회원정보를 불러올 수 없습니다. 비밀번호를 다시 입력하세요.');
          }
        });
      });

      this.els.$outBtn.on('click', function () {
        var pw = self.els.$password.val().trim();
        M.pop.alert({
          title: '탈퇴',
          message: '회원을 탈퇴하시겠습니까?',
          buttons: ['취소', '탈퇴'],
          callback: function (index) {
            if (index == 0) {
              return false;
            }
            if (index == 1) {
              MNet.sendHttp({
                path: SERVER_PATH.CHECK_PASSWORD,
                data: {
                  loginId: id,
                  password: pw
                },
                succ: function (data) {
                  MNet.sendHttp({
                    path: SERVER_PATH.OUT,
                    data: {
                      loginId: id
                    },
                    succ: function (data) {
                      alert('회원탈퇴가 정상적으로 처리되었습니다.')
                      M.page.html({
                        url: "./login.html",
                        actionType: "CLEAR_TOP"
                      });
                    },
                    error: function () {
                      alert('탈퇴가 불가합니다.');
                    }
                  });
                },
                error: function () {
                  alert('비밀번호를 확인해주세요.');
                }
              });
            }
          }
        });
      });

    },

    //    method: {},
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