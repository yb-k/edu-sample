/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $userName: null,
      $gender: null,
      $birth: null,
      $cellphone: null,
      
      $loginId: null,
      $isCheckedId: null,
      $dupBtn: null,
      $password: null,
      $rePassword: null,
      $isCheckedPw: null,
      $email: null,
      $joinBtn: null
    },
    data: {},
    init: function init() {
      var self = this;
      self.els.$userName = M.data.param('userNm');
      self.els.$gender = M.data.param('gender');
//      self.els.$year = M.data.param('year');
//      self.els.$month = M.data.param('month');
//      self.els.$date = M.data.param('date');
      self.els.$birth = M.data.param('birth');
      self.els.$cellphone = M.data.param('cellphone');
      
      self.els.$loginId = $('#loginId');
      self.els.$dupBtn = $('#dupBtn');
      self.els.$password = $('#password');
      self.els.$rePassword = $('#repassword');
      self.els.$email = $('#email');
      self.els.$joinBtn = $('#joinBtn');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      self.els.$loginId.on('input', function () {
        self.els.$isCheckedId = false;
      });
      self.els.$password.on('input', function () {
        self.els.$isCheckedPw = false;
      });
      self.els.$rePassword.on('input', function () {
        self.els.$isCheckedPw = false;
      });

      self.els.$dupBtn.on('click', function () {
        var id = self.els.$loginId.val().trim();
        var regId = /^[a-zA-z0-9]{5,}$/;        
        if (id == '') {
          return alert('아이디를 입력해주세요.');
        }
       if(!regId.test(id)) {
         return alert("아이디는 숫자 또는 영문을 포함해 5자 이상 입력해주세요.");
       }             
        if (id.length < 5) {
          return alert('아이디는 5자 이상 입력해주세요.');
        }
        $.sendHttp({
          path: SERVER_PATH.DUPLICATE,
          data: {
            loginId: id
          },
          succ: function (data) {
            if (data.dupYn === 'Y') {
              return alert('중복된 아이디로 사용이 불가합니다.');
            } else {
              self.els.$isCheckedId = true;
              return alert('사용 가능한 아이디입니다.');
            }
          }
        })
      });
      self.els.$joinBtn.on('click', function () {
        var id = self.els.$loginId.val().trim();
        var regId = /^[a-zA-z0-9]{5,}$/;
        var userName = self.els.$userName;
        var birth = self.els.$birth;
        var gender = self.els.$gender;
        var cellphone = self.els.$cellphone;
        var email = self.els.$email.val().trim();
        var regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        var pass = self.els.$password.val().trim();
        var regPass = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        var repass = self.els.$rePassword.val().trim();
       
        var id = self.els.$loginId.val().trim();
        if (id == '') {
          return alert('아이디를 입력해주세요.');
        }
       if(!regId.test(id)) {
         return alert("아이디는 숫자 또는 영문을 포함해 5자 이상 입력해주세요.");
       }       
        if (id.length < 5) {
          return alert('아이디는 5자 이상 입력해주세요.');
        }
        if (self.els.$isCheckedId === false) {
          return alert('아이디 중복 확인을 해주세요.');
        }
//        module.confirmPasswordAndRePassword(pass, repass, function () {
//          self.els.$isCheckedPw = true;
//        });
        if (pass == '') {
          return alert('비밀번호를 입력해주세요.');
        }
        if(!regPass.test(pass)) {
          return alert("비밀번호는 특수문자, 숫자, 영문을 포함해 8자 이상 입력해주세요.");
        }        
        if (repass == '') {
          return alert('비밀번호 확인을 입력해주세요.');
        }
        if(repass != pass){
            return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }
        if (email == '') {
          return alert('이메일을 입력해주세요.');
        }
       if(!regEmail.test(email)) {
         return alert("이메일을 정확히 입력해주세요.");
       }           
        $.sendHttp({
          path: SERVER_PATH.JOIN,
          data: {
            loginId: id,
            password: pass,
            
            userNm: userName,
            birthDate: birth,
            gender: gender,
            cellPhone: cellphone,
            email: email
          },
          succ: function (data) {
            console.log('성공');
            M.page.html('./join4.html');
          }
        });
      })
    },
  };
  window.__page__ = page;
})(jQuery, M, __config__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);