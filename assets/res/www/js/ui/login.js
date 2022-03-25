/**
 * @file : 로그인 페이지
 * @author : 김정원
 * @date : 2022-03-22
 */
// 페이지단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window) {


  var page = {
    els: {
      $loginIdIpt: null,
      $passwordIpt: null,
      $loginBtn: null,
      $autoLoginChk: null,
      $findId: null,
      $findPw: null,
      $joinBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#login-id'); // input type
      this.els.$loginBtn = $('#login-btn');
      this.els.$autoLoginChk = $('#auto-login-chk');
      this.els.$passwordIpt = $('#password');
      this.els.$joinBtn = $('#join-btn');
      this.els.$findId = $('#find-id');
      this.els.$findPw = $('#find-pw');

    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      var self = this;
      this.els.$loginBtn.on('click', function () {
        self.login();
      });
      this.els.$findId.on('click', function(){
        self.findId();
      });
      this.els.$findPw.on('click', function(){
        self.findPw();
      });
      this.els.$joinBtn.on('click', function(){
        self.join();
      });
    },

    setAutoLogin: function (id, pw) {
      //자동로그인 기능
      M.data.storage('AUTO_LOGIN_AUTH', {
        id: id,
        pw: pw
      });


    },
    unsetAutoLogin: function () {
      M.dat.removeStorage('AUTO_LOGIN_AUTH');
    },

    login: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim(); // 로그인 아이디 가져오기
      var pw = this.els.$passwordIpt.val().trim(); // 비밀번호 가져오기
      var isAutoLogin = this.els.$autoLoginChk.prop('checked'); // true / false
      if (id == '') {
        return alert('아이디를 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.LOGIN,
        data: {
          loginId: id,
          password: pw
        },
        succ: function (data) {
          // 로그인이 성공했을 때 콜백
          if(isAutoLogin) self.setAutoLogin(id, pw); 
          M.data.global("userId", id);  
          M.page.html('./main.html');
          
        },

      });

    },

    findId: function(){
      M.page.html('./findId.html');
    },
    findPw: function(){
      M.page.html('./findPw1.html');
    },
    join: function(){
      M.page.html('./join1.html');
    }
    
    
    
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);