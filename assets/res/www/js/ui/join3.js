/**
 * @file : 회원가입 
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M, MNet, config, SERVER_PATH, window) {
  var checkId;
  var page = {
    els: {
      $loginId: null,
      $dupBtn: null,
      $password: null,
      $repassword: null,
      $email: null,
      $joinBtn: null,
      $userNm: null,
      $cellPhone: null,
      $gender: null,
      $birthDate: null
    },
    data: {},
    init: function init() {
      this.els.$loginId = $('#loginId');
      this.els.$password = $('#password');
      this.els.$repassword = $('#repassword');
      this.els.$email = $('#email');
      this.els.$dupBtn = $('#dupBtn');
      this.els.$joinBtn = $('#joinBtn');
      //      // 가져온 데이터
      //      this.els.$userNm = M.data.param('userNm');
      //      this.els.$cellPhone = M.data.param('cellPhone');
      //      this.els.$gender = M.data.param('gender');
      //      this.els.$birthDate = M.data.param('birth');

    },
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$dupBtn.on('click', function () {
        self.doubleChk();
      })
      this.els.$joinBtn.on('click', function () {
        if (checkId == 'N') {
          self.info();
        } else {
          alert("아이디 중복체크를 확인해주세요.");
        }

      })
    },

    doubleChk: function () {
      var loginId = this.els.$loginId.val().trim();
      if (loginId == '') {
        return alert("아이디를 입력해주세요.");
      }
      if (loginId.length < 5) {
        return alert("아이디는 5자리 이상이어야 합니다.");
      }
      MNet.sendHttp({
        path: SERVER_PATH.DUPLICATE,
        data: {
          loginId: loginId
        },
        succ: function (data) {
          if (data.dupYn == 'Y') {
            alert("이미 존재하는 아이디입니다.");
          } else {
            checkId = data.dupYn;
            alert("사용 가능한 아이디입니다.");
          }
        },
        error: function (data) {
          console.log(data);
          alert("에러애오");
        }
      });
    },

    info: function () {
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$password.val();
      var pwCon = this.els.$repassword.val().trim();
      var email = this.els.$email.val().trim();
      var self = this;

      //      is not a function !!! T_T
      //      var name = this.els.$userNm.val().trim();
      //      var gender = this.els.$gender.val().trim();
      //      var year = this.els.$year.val().trim();
      //      var month = this.els.$month.val().trim();
      //      var date = this.els.$date.val().trim();
      //      var phone = this.els.$cellPhone.val().trim();

      if (id == '') {
        return alert('아이디를 입력해주세요.');
      }
      if (pw == '') {
        return alert('비밀번호를 선택해주세요.');
      }
      if (pwCon == '') {
        return alert('비밀번호 확인을 입력해주세요.');
      }
      if (pw != pwCon) {
        return alert('비밀번호와 비밀번화 확인이 일치하지 않습니다.');
      }
      if (email == '') {
        return alert('이메일을 선택해주세요.');
      }
      // 비밀번호 정규화규칙 확인 
      if (self.checkPw()) {
        MNet.sendHttp({
          path: SERVER_PATH.JOIN,
          data: {
            userNm: M.data.param('userNm'),
            birthDate: M.data.param('birth'),
            cellPhone: M.data.param('cellPhone'),
            gender: M.data.param('gender'),
            loginId: id,
            password: pw,
            email: email
          },
          succ: function (data) {
            console.log(data);
            M.page.html("./join4.html");
          },
          error: function (data) {
            console.log(data);
            alert("에러애오");
          }
        });
      } else {
        return alert("회원가입에 실패했습니다. ");
      }
    },
    checkPw: function () {
      var pw = this.els.$password.val().trim();
      var pwChk = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[@$!%*#^&_-]).{8,}$/;
      if (!pwChk.test(pw)) {
        alert("비밀번호는 영문, 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 이상의 비밀번호이어야합니다.");
        return false;
      } else return true;
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