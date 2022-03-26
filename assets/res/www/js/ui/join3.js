/**
 * @file : 회원가입 3 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var checkId;
  var page = {
    els: {
      $userNmIpt: null,
      $gender: null,
      $year: null,
      $month: null,
      $date: null,
      $cellPhone: null,
      $nextBtn: null,


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
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작

      var self = this;
      this.els.$joinBtn.on('click', function () {

        if (checkId == 'N') {
          self.joinEnd();
        } else {
          alert("아이디 체크를 먼저 해주세요");
        }
      })

      this.els.$dupBtn.on('click', function () {

        self.idCheck();

      })
    },

    // 아이디 중복체크

    idCheck: function () {
      var self = this;
      var userId = this.els.$loginIdIpt.val().trim(); // 회원가입 아이디 가져오기

      MNet.sendHttp({
        path: SERVER_PATH.DUPLICATE,
        data: {
          loginId: userId,
        },
        succ: function (data) {
          if (data.dupYn == 'N') {
            checkId = data.dupYn;
            alert("사용 가능한 아이디입니다.");
          } else {
            alert("사용 불가능한 아이디입니다.");
          }

        },
        error: function (data) {
          console.log(data);
          alert("에러가 났습니다.");
        }
      });

    },

    // 회원가입 

    joinEnd: function () {
      var self = this;
      var loginIdIpt = this.els.$loginIdIpt.val().trim(); // 회원가입 아이디 가져오기
      var password = this.els.$password.val().trim(); // 회원가입  가져오기
      var repassword = this.els.$repassword.val().trim(); // 회원가입 패스워드 가져오기
      var email = this.els.$email.val().trim(); // 회원가입 이메일 가져오기
      console.log(checkId);
      if (loginIdIpt == '') {
        return alert('아이디를 입력해주세요.');
      }
      if (password == '') {
        return alert('비밀번호를 입력해주세요.');
      }
      if (repassword == '') {
        return alert('비밀번호 확인을 입력해주세요.');
      }

      if (email == '') {
        return alert('이메일을 입력해주세요.');
      }


      var PwCon = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      if (password != repassword) {
        alert("비밀번호와 비밀번호 확인이 다릅니다.");

      } else if (!PwCon.test(password)) {
        alert("특수문자,숫자,영문이 포함된 8글자 이상으로 해주세요")

        return false;

      } else {




        MNet.sendHttp({
          path: SERVER_PATH.JOIN,
          data: {
            "loginId": loginIdIpt,
            "password": password,
            "userNm": M.data.param("userNms"),
            "gender": M.data.param("gender"),
            "birthDate": M.data.param("birthDates"),
            "cellPhone": M.data.param("cellPhones"),
            "email": email
          },
          succ: function (data) {
            console.log(data);
            alert("회원가입 성공");

            M.page.html('./login.html');
          },
          error: function (data) {
            console.log(data);
            alert("회원가입 실패");
          }
        });

      }

    }



  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);