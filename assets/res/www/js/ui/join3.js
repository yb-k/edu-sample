/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var dulStatus;
  var page = {
    els: {
      $loginIdIpt: null,
      $dupBtn: null,
      $passwordIpt: null,
      $repasswordIpt: null,
      $emailIpt: null,
      $joinBtn: null,

    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#loginId');
      this.els.$dupBtn = $('#dupBtn');
      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$emailIpt = $('#email');
      this.els.$joinBtn = $('#joinBtn');

    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$dupBtn.on('click', function () {
        self.dupId();
      });

      this.els.$joinBtn.on('click', function () {
        if(dulStatus == 'N') {
          self.join();
        } else {
          alert("다시 중복체크 하세요.");       
        }
      });

    },

    dupId: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();

      $.sendHttp({
        path: SERVER_PATH.DUPLICATE,
        data: {
          loginId: id,
        },
        succ: function (data) {
          dulStatus = data.dupYn;
          if (dulStatus == 'Y') {
            console.log(data);
            alert("사용 불가! 중복된 아이디가 있습니다.");
          } else {
            console.log(data);
            alert("사용 가능! 중복된 아이디가 없습니다.");
          }
        },
        error: function (data) {
          console.log(data);
          alert("사용 불가! 중복된 아이디가 없습니다.");
        }
      });

    },
    
    join: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var name = M.data.param('userNm');
      var pw = this.els.$passwordIpt.val().trim();
      var birth = M.data.param('birthDate');
      var gender = M.data.param('gender');
      var phone = M.data.param('cellPhone');
      var pwCon = this.els.$repasswordIpt.val().trim();
      var email = this.els.$emailIpt.val().trim();

      if (id == '') {
        return alert('아이디를 입력해주세요');
      }
      if (pw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      if (pwCon == '') {
        return alert('비밀번호 확인을 입력해주세요');
      }
      if (email == '') {
        return alert('이메일을 입력해주세요');
      }
      var newpw = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      if (pw != pwCon) {
        alert("비밀번호가 일치 하지 않습니다");
      } else {
        if (!newpw.test(pw)) {
          alert("특수문자, 숫자, 영문이 포함된 8가지 이상의 비밀번호를 넣으세요.");
          return false;
        } else {
          MNet.sendHttp({
            path: SERVER_PATH.JOIN,
            data: {
              loginId: id,
              password: pw,
              userNm: name,
              birthDate: birth,
              gender: gender,
              cellPhone: phone,
              email: email,
            },
            succ: function (data) {
              console.log(data);
              M.page.html('./join4.html');
            },
            error: function (data) {
              console.log(data);
              alert('회원가입실패! 다시 가입해보세요');
            }
          });
          return true;
        }
      }
    },
  };

  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);