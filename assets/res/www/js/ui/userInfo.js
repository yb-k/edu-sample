/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, MNet, SERVER_PATH, module, M, window) {
  var page = {
    els: {
      $changePw: null,
      $loginId: null,
      $password: null,
      $email: null,
      $cellPhone: null,
      $saveBtn: null,
      $outBtn: null,
    },
    data: {},
    init: function init() {
      var self = this;
      self.els.$changePw = $('#changePw');
      self.els.$loginId = M.data.global('LOGON_INFO').id;
      self.els.$password = $('#password');
      self.els.$email = $('#email');
      self.els.$cellPhone = $('#cellPhone');
      self.els.$saveBtn = $('#saveBtn');
      self.els.$outBtn = $('#outBtn');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      module.onKeyupNum(this.els.$cellPhone);
      self.els.$password.on('propertychange change keyup paste input', function () {
        $(self.els.$saveBtn).attr("disabled", false);
      });
      self.els.$changePw.on('click', function () {
        var id = M.data.global('LOGIN_INFO').id;
        var pass = self.els.$password.val().trim();
        console.log(id);
        console.log(pass);
        MNet.sendHttp({
          path: SERVER_PATH.CHECK_PASSWORD,
          data: {
            loginId: id,
            password: pass
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              return alert('password 변경 페이지로 이동!');
            } else {
              console.log(data);
              alert('password가 일치하지 않습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('error!');
          }
        });
      });
      self.els.$saveBtn.on('click', function () {
        var id = M.data.global('LOGIN_INFO').id;
        var pass = self.els.$password.val().trim();
        var email = self.els.$email.val().trim();
        var cellphone = self.els.$cellPhone.val().trim();
        if (email == '') {
          return alert('이메일을 입력하세요.');
        }
        if (cellphone.length < 11) {
          return alert('휴대폰번호를 11자리 입력해주세요.');
        }
        var isCorrectPw = false;
        console.log(id);
        console.log(pass);
        MNet.sendHttp({
          path: SERVER_PATH.CHECK_PASSWORD,
          data: {
            loginId: id,
            password: pass
          },
          succ : function (data) {
            console.log(data);
            if (data.rsltCode == '0000') {
              MNet.sendHttp({
                path : SERVER_PATH.UPDATE,
                data : {
                  loginId : id,
                  password : pass,
                  cellPhone : cellphone,
                  email : email
                },
                succ : function (data) {
                  if (data.rsltCode == '0000'){
                    alert('회원정보 수정을 완료했습니다.');
                  }else{
                    alert('i have problem');
                  }
                },
                error : function (){
                  alert('error');
                }
              });
            }
          },
          error : function () {
            alert('error');
          }
        });
      })
    },
  };
  window.__page__ = page;
})(jQuery, __mnet__, __serverpath__, __util__, M, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);