/**
 * @file : 회원가입
 * @author : 김정원
 * @date : 2022-03-25
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window) {

  var checkId;
  var page = {
    els: {
      $loginIdIpt: null,
      $dupBtn: null,
      $password: null,
      $repassword: null,
      $email: null,
      $joinBtn: null,
      $joinBtn: null,
      $userNm: null,
      $year: null,
      $month: null,
      $date: null,
      $cellPhone: null,
      $gender: null,

    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#loginId');
      this.els.$dupBtn = $('#dupBtn');
      this.els.$password = $('#password');
      this.els.$repassword = $('#repassword');
      this.els.$email = $('#email');
      this.els.$joinBtn = $('#joinBtn');



    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      var self = this;
      this.els.$dupBtn.on('click', function () {
        self.idCheck();
      });
      this.els.$joinBtn.on('click', function () {
        if (checkId == 'N') {
          self.join();
        } else {
          alert("아이디 중복확인을 해주세요.");
        }
      });
      this.els.$loginId.on('input', function () {
        checkId = 'Y';
      });

    },

    idCheck: function () {
      var id = this.els.$loginIdIpt.val().trim();


      if (id == '') {
        alert('아이디를 입력해주세요.');
      } 
      else if(id.length < 5){
        alert("아이디는 5자 이상 입력해주세요.");
      }
        else {
        MNet.sendHttp({
          path: SERVER_PATH.DUPLICATE,
          data: {
            loginId: id,
          },
          succ: function (data) {
            if (data.dupYn === 'Y') {
              checkId = data.dupYn;
              return alert('중복된 아이디입니다.');
            } else {
              checkId = data.dupYn;
              return alert("사용가능한 아이디입니다.");

            }

          },

        });
      }

    },
    join: function () {
      var id = this.els.$loginIdIpt.val().trim();
      var pw = this.els.$password.val().trim();
      var repw = this.els.$repassword.val().trim();
      var email = this.els.$email.val().trim();


      var userNm = M.data.param("userNm");
      var year = M.data.param("year");
      var month = M.data.param("month");
      var date = M.data.param("date");
      var cellPhone = M.data.param("cellPhone");
      var gender = M.data.param("gender");
      var birthDate = year + month + date;
      var passchk = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;


      if (pw == '') {
        return alert('비밀번호를 입력해주세요.');
      }
      if (repw == '') {
        return alert('비밀번호확인을 입력해주세요.');
      }
      if (email == '') {
        return alert('이메일을 입력해주세요.');
      }
      if (pw != repw) {
        return alert('비밀번호와 비밀번호확인이 다릅니다.');
      } else if (!passchk.test(pw)) {
        alert("비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 이상으로 설정해주세요.");
        return false;
      } else {
        if (id.length >= 5) {
          MNet.sendHttp({
            path: SERVER_PATH.JOIN,
            data: {
              loginId: id,
              password: pw,
              userNm: userNm,
              birthDate: birthDate,
              gender: gender,
              cellPhone: cellPhone,
              email: email,

            },
            succ: function (data) {
              M.page.html("join4.html");

            },

          });
        } else {
          alert("아이디는 5자 이상 입력해주세요.");
        }

      }

    },



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