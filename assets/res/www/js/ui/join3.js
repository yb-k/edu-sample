/**
 * @file : base.js 인트로 페이지
 * @author : 
 * @date :
 */

(function ($, M, MNet, module, SERVER_PATH, window) {
  var page = {
    els: {
          $userNm: null,
          $gender: null,
          $year: null,
          $month: null,
          $date: null,
          $cellPhone: null,

          $loginId: null,
          $isCheckedId: null,

          $dupBtn: null,
          $password: null,
          $repassword: null,

          $isCheckedPw: null,

          $email: null,
          $joinBtn: null
    },
    data: {},
    init: function init() {
      var self = this;
          this.els.$userNm = M.data.global('#userNm');
          this.els.$gender = M.data.global('#gender');
          this.els.$year = M.data.global('#year');
          this.els.$month = M.data.global('#month');
          this.els.$date = M.data.global('#date');
          this.els.$cellPhone = M.data.global('#cellPhone');

          self.els.$loginId = $('#loginId');
          self.els.$dupBtn = $('#dupBtn');
          self.els.$password = $('#password');
          self.els.$repassword = $('#repassword');

          self.els.$email = $('#email');
          self.els.$joinBtn = $('#joinBtn');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
     //  DOM Event 바인딩
        var self = this;
        self.els.$loginId.on('input', function () {
          self.els.$isCheckedId = false;
        });
        self.els.$password.on('input', function () {
          self.els.$isCheckedPw = false;
        });
        self.els.$repassword.on('input', function () {
          self.els.$isCheckedPw = false;
        });

        self.els.$dupBtn.on('click', function () {
          var id = self.els.$loginId.val().trim();
                if (id == '') {
                  return alert('아이디를 입력해주세요.');
                }
                if (id.length < 5) {
                  return alert('아이디는 5자 이상으로 입력해주세요.');
                }
                MNet.sendHttp({
                  path: SERVER_PATH.DUPLICATE,
                  data: {
                    loginId: id
                  },
                  succ: function succ(data) {
                      if (data.dupYn === 'Y') {
                        return alert('아이디가 중복되오니 다른 아이디를 입력해주세요.');
                      } else {
                        self.els.$isCheckedId = true;
                        return alert('사용 가능한 아이디입니다.');
                      }
                  }
                });
                });

        },
        self.els.$joinBtn.on('click', function () {

          nm = M.data.global('#userNm');
          gender = M.data.global('#gender');
          year = M.data.global('#year');
          month = M.data.global('#month');
          date = M.data.global('#date');
          cellPhone = M.data.global('#cellPhone');

        var id = self.els.$loginId.val().trim();
        var password = self.els.$password.val().trim();
        var regPassword = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        var repassword = self.els.$repassword.val().trim();

        var email = self.els.$email.val().trim();
        var regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        var id = self.els.$loginId.val().trim();

        if (id == '') {
            return alert('아이디를 입력해주세요.');
        }
        if (self.els.$isCheckedId === false) {
          return alert('아이디를 중복 확인해주세요.');
        }
        module.confirmPasswordAndRePassword(password, repassword, function () {
          self.els.$isCheckedPw = true;
        });
        if (self.els.$isCheckedPw === false) {
          return;
        }
        
        if(password == '') {
           return alert('비밀번호를 입력해주세요.');
        }else if(!regPassword.test(password)) {
           return alert('비밀번호는 특수문자, 숫자, 영문이 포함된 8자 이상의 문자열로 입력해주세요.');
        }
        if(repassword == '') {
           return alert('비밀번호 확인을 입력해주세요.');
        }
        if(password != repassword) {
           return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }
        if (email == '') {
          return alert('메일을 입력해주세요.');
        }else if(!regEmail.test(email)) {
          return alert('메일을 정확히 입력해주세요.');
        }

            MNet.sendHttp({
            path: SERVER_PATH.JOIN,
            data: {
                  userNm : nm,
                  gender : gender,
                  year : year,
                  month : month,
                  date : date,
                  cellPhone	: cellPhone,

                  loginId: id,
                  password: password,
                  email: email
                  },
          succ : function(data){
           M.page.html('./join4.html');
          }

            });
      });
   }
    
    
    
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __util__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);