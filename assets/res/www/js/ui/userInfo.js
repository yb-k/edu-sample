/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
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

    },

    initView: function initView() {
      var self = this;
      this.els.$loginId.val(M.data.global('myId'));
      MNet.sendHttp({
        path: SERVER_PATH.INFO,
        data: {
          "loginId": M.data.global('myId'),
        },
        succ: function (data) {
          console.log(data);
          self.els.$userNm.val(data.userNm);
          self.els.$birth.val(data.birthDate);
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

      this.els.$saveBtn.on('click', function () {
        //self.confirmPw();
        self.save();
      });
      
      this.els.$outBtn.on('click', function () {
        self.confirmPw();
//        self.outUser();
      });
    },
    
    outUser:function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
       MNet.sendHttp({
              path: SERVER_PATH.OUT,
              data: {
                loginId: id,
              },
              succ: function (data) {
                console.log(data);
                M.page.html("./login.html");
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
      var phone = this.els.$phoneIpt.val().trim();
      var email = this.els.$emailIpt.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      if (phone == '') {
        return alert('전화번호를 입력해주세요');
      }
      if (email == '') {
        return alert('이메일을 입력해주ㅁㄴㅇ세요');
      }
      MNet.sendHttp({
        path: SERVER_PATH.UPDATE,
        data: {
          loginId: id,
          password: pw,
          cellPhone: phone,
          email: email,
        },
        succ: function (data) {
          M.page.html("./userInfo.html");
        },
        error: function (data) {
          console.log(data);
          alert('수정에 실패하였습니다');
        }
      });

    },

    changePw: function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      MNet.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          console.log(data);
          M.page.html({
            path: "./findPw2.html",
            param: {
              "loginId": id
            },
          });
        },
        error: function (data) {
          console.log(data);
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        }
      });
    },

    confirmPw: function () { // 수정과 탈퇴 비밀번호확인
      var self = this;
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      MNet.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          console.log("성공");
          self.out();
          return true;
        },
        error: function (data) {
          console.log(data);
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
          return false;
        }
      });
    }

  };

  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);