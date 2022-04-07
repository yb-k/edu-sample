/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var con;
  var page = {
    els: {
      $userNm: null,
      $loginId: null,
      $passwordIpt: null,
      $birth: null,
      $emailIpt: null,
      $phoneIpt: null,
      $saveBtn: null,
      $outBtn: null,
      $changePwBtn: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$userNm = $('#userNm');
      this.els.$loginId = $('#loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$birth = $('#birthDate');
      this.els.$emailIpt = $('#email');
      this.els.$phoneIpt = $('#cellPhone');
      this.els.$saveBtn = $('#saveBtn');
      this.els.$outBtn = $('#outBtn');
      this.els.$changePwBtn = $('#changePw');
      this.els.$backBtn = $('#backBtn');

    },

    initView: function initView() {
      var self = this;
      this.els.$loginId.val(M.data.global('loginId'));
      $.sendHttp({
        path: SERVER_PATH.INFO,
        data: {
          "loginId": M.data.global('loginId'),
        },
        succ: function (data) {
          console.log(data);
          self.els.$userNm.val(data.userNm);
          self.els.$birth.val(data.birthDate.substring(0, 4) + "-" + data.birthDate.substring(4, 6) + "-" + data.birthDate.substring(6, 8));
 //         self.els.$phoneIpt.val(data.cellPhone.substring(0, 3) + "-" + data.cellPhone.substring(3, 7) + "-" + data.cellPhone.substring(7, ));
          self.els.$phoneIpt.val(data.cellPhone);
          self.els.$emailIpt.val(data.email);
        },
        error: function (data) {
          console.log(data);
          alert("유저 정보를 가져오지 못했습니다.");
        }
      });
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$changePwBtn.on('click', function () {
        self.changePw();
      });

      this.els.$passwordIpt.on('input', function () {
        if ($('#changePw').val() == '')
          $('#saveBtn').prop("disabled", false);
        else
          $('#saveBtn').prop("disabled", true);
      });

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

      this.els.$saveBtn.on('click', function () {
        //self.confirmPw();
        self.save();
      });

      this.els.$outBtn.on('click', function () {
        M.pop.alert({
          title: '확인',
          message: '정말 탈퇴하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.outUser();
            }
          }
        });
      });
    },

    outUser: function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
      $.sendHttp({
        path: SERVER_PATH.OUT,
        data: {
          loginId: id,
        },
        succ: function (data) {
          console.log(data);
          M.data.removeStorage('AUTO_LOGIN_AUTH');
          M.page.html({
            url: "./login.html",
            actionType: 'CLEAR_TOP'
          });
        },
        error: function (data) {
          console.log(data);
          alert('탈퇴에 실패하였습니다');
        }
      });
    },

    save: function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
      var phoneNumber = this.els.$phoneIpt.val().trim();
      var phone = phoneNumber.replace(/-/g, '');
      var email = this.els.$emailIpt.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
      console.log(id);
      console.log(phone);
      console.log(email);
      console.log(pw);
      if (!patternPhone.test(phone)) {
        alert('핸드폰 번호를 확인 해주세요');
        return;
      }
 //     var regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        var regExpEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (email.length < 6 || !regExpEmail.test(email)) {
        alert('메일 형식이 맞지 않습니다.')
        return;
      }

      if (email == '') {
        return alert('메일을 입력해주세요');
      }
      if (phone == '') {
        return alert('휴대폰 번호를 입력해주세요');
      }
      $.sendHttp({
        path: SERVER_PATH.UPDATE,
        data: {
          loginId: id,
          password: pw,
          cellPhone: phone,
          email: email,
        },
        succ: function (data) {
          M.page.html({
            url: "./userInfo.html",
            action: 'NO_HISTORY'
          });
        },
        error: function (data) {
          console.log(data);
          alert('수정에 실패하였습니다. 다시 확인해주세요.');
        }
      });

    },

    changePw: function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      $.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          console.log(data);
          M.page.html({
            path: "./findPw2.html",
            action: 'NO_HISTORY',
            param: {
              "loginId": id
            },
          });
        },
        error: function (data) {
          console.log(data);
          alert('비밀번호가 일치하지 않습니다.');
        }
      });
    },

  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);