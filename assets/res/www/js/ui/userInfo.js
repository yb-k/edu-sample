/**
 * @file : 회원정보 수정/비밀번호변경/탈퇴
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M,CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $changePw: null,
      $userNm: null,
      $loginId: null,
      $password: null,
      $birthDate: null,
      $email: null,
      $cellPhone: null,
      $saveBtn: null,
      $outBtn: null,

      $gender: null,
      $rsltCode: null,
      $rsltMsg: null
    },
    data: {},
    init: function init() {
      this.els.$changePw = $('#changePw');
      this.els.$userNm = $('#userNm');
      this.els.$loginId = $('#loginId');
      this.els.$password = $('#password');
      this.els.$birthDate = $('#birthDate');
      this.els.$changePw = $('#changePw');
      this.els.$email = $('#email');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$saveBtn = $('#saveBtn');
      this.els.$outBtn = $('#outBtn');

      this.els.$loginId.val(M.data.global("userId"));

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      $.sendHttp({
        path: SERVER_PATH.INFO,
        data: {
          loginId: M.data.global("userId")
        },
        succ: function (data) {
          self.els.$userNm.val(data.userNm);
          self.els.$birthDate.val(data.birthDate);
          self.els.$email.val(data.email);
          self.els.$cellPhone.val(data.cellPhone);
        },
        error: function () {
          alert("데이터를 불러오지 못했습니다.");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$saveBtn.on('click', function () {
        var email = self.els.$email.val().trim();
        var cellPhone = self.els.$cellPhone.val().trim();
        var password = self.els.$password.val().trim();
        $.sendHttp({
          path: SERVER_PATH.UPDATE,
          data: {
            loginId: M.data.global("userId"),
            email: email,
            cellPhone: cellPhone,
            password: password
          },
          succ: function (data) {
            alert("회원 정보가 수정되었습니다.");
            self.els.$password.val(null);
          },
          error: function () {
            alert("회원정보 변경 실패");
          }
        });
      })
      this.els.$changePw.on('click', function () {
        self.changPw();
      })
      this.els.$outBtn.on('click', function () {
        self.out();
      })
    },
    changPw: function () {
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$password.val().trim();
      $.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          password: pw,
          loginId: id
        },
        succ: function (data) {
          M.page.html({
            path: "./findPw2.html",
            param: {
              "loginId" : id
            }
          });
        },
        error: function () {
          alert("비밀번호가 틀렸습니다.");
        }
      });
    },
    out: function () {
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$password.val().trim();
      $.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          password: pw,
          loginId: id
        },
        succ: function (data) {
          M.pop.alert({
            title: '알림',
            message: '정말로 탈퇴하시겠습니까?',
            buttons: ['예', '아니오'],
            callback: function (index) {
              if (index == 1) {
                return false;
              }
              if (index == 0) {
                $.sendHttp({
                  path: SERVER_PATH.OUT,
                  data: {
                    loginId: id
                  },
                  succ: function () {
                    alert("탈퇴가 완료되었습니다.");
                    M.page.html("./login.html");
                  },
                  error: function () {
                    alert("탈퇴 실패");
                  }

                });

              }
            }
          });
        },
        error: function () {
          alert("비밀번호가 틀렸습니다.");
        }
      });
    }
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);