/**
 * @file : userInfo.js 정보수정 페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

(function ($, M, MNet, SERVER_PATH, config, window) {
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
      $outBtn: null
    },
    data: {},
    init: function init() {
      this.els.$changePw = $('#changePw');
      this.els.$userNm = $('#userNm');
      this.els.$loginId = $('#loginId');
      this.els.$password = $('#password');
      this.els.$birthDate = $('#birthDate');
      this.els.$email = $('#email');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$saveBtn = $('#saveBtn');
      this.els.$outBtn = $('#outBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
      //이름, 아이디, 생년월일, 메일, 휴대폰번호
      //생년월일 yyyy-MM-dd로 나타내야해
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
          self.els.$email.val(data.email);
          self.els.$cellPhone.val(data.cellPhone);
        }
      });
    },

    initEvent: function initEvent() {
      // DOM Event 바인딩
      var id = M.data.global("loginId");
      var self = this;

      //비밀번호 변경
      this.els.$changePw.on('click', function () {
        M.page.html({
          url: "./findPw2.html",
          param: {
            "loginId": id
          }
        });
      });

      //비밀번호 입력하면 수정 버튼 활성화
      this.els.$password.on('change', function () {
        if (self.els.$password.val() != '') {
          self.els.$saveBtn.prop('disabled', false);
        } else {
          self.els.$saveBtn.prop('disabled', true);
        }
      });

      //정보수정
      this.els.$saveBtn.on('click', function () {
        self.memberUpdate(id);
      });

      //탈퇴
      this.els.$outBtn.on('click', function () {
        self.memberOut(id);
      });
    },

    memberUpdate: function (id) {
      var self = this;
      var pw = this.els.$password.val().trim();
      var email = this.els.$email.val().trim();
      var phone = this.els.$cellPhone.val().trim();

      MNet.sendHttp({
        path: SERVER_PATH.UPDATE,
        data: {
          loginId: id,
          password: pw,
          email: email,
          cellPhone: phone
        },
        succ: function (data) {
          alert("정보가 수정되었습니다.");
          self.els.$password.val('');
        },
        error: function (data) {
          alert("올바른 비밀번호를 입력해 주세요.");
        }
      });
    },

    memberOut: function (id) {
      M.pop.alert({
        title: '탈퇴확인',
        message: '탈퇴하시겠습니까?',
        buttons: ['예', '아니오'],
        callback: function (index) {
          if (index == 0) {
            //탈퇴후 로그인페이지로 이동
            MNet.sendHttp({
              path: SERVER_PATH.OUT,
              data: {
                loginId: id
              },
              succ: function (data) {
                alert("정상적으로 탈퇴되었습니다.");
                M.page.html({
                  url: "./login.html",
                  actionType: "CLEAR_TOP"
                });
              }
            });
          } else {
            return false;
          }
        }
      });
    }

    //    method: {},
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, __config__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);