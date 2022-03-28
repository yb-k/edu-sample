/**
 * @file : 로그인 페이지
 * @author : 김용범
 * @date : 2022-03-22
 */

// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginIdIpt: null,
      $passwordIpt: null,
      $loginBtn: null,
      $autoLoginChk: null,
      $findIdBtn: null,
      $findPwBtn: null,
      $joinBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#loginId'); // input 
      this.els.$passwordIpt = $('#password');
      this.els.$autoLoginChk = $('#autoLoginChk');
      this.els.$findIdBtn = $('#findId');
      this.els.$findPwBtn = $('#findPw');
      this.els.$joinBtn = $('#joinBtn');
      this.els.$loginBtn = $('#loginBtn');
    },
 
   
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
    },
    
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$loginBtn.on('click', function () {
        self.login();
      });
      this.els.$findIdBtn.on('click', function() {
        M.page.html('./findId.html');
      });
      this.els.$findPwBtn.on('click', function() {
        M.page.html('./findPw1.html');
      });
      this.els.$joinBtn.on('click', function() {
        M.page.html('./join1.html');
      });
 
    },

    setAutoLogin: function (id,pw) {
      // 자동로그인 기능
      M.data.storage('AUTO_LOGIN_AUTH', { id:id, pw:pw });
    },

    unsetAutoLogin:function () {
      M.data.removeStorage('AUTO_LOGIN_AUTH');
    },

    login: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim(); // 로그인 아이디 가져오기
      var pw = this.els.$passwordIpt.val().trim(); // 비밀번호 가져오기
      var isAutoLogin = this.els.$autoLoginChk.prop('checked'); //true /false
      if(id == '') {
        return alert('아이디를 입력해주세요');
      }
      if(pw == '') {
        return alert('비밀번호를 입력해주세요');
      }
      
      $.sendHttp({
        path: SERVER_PATH.LOGIN,
        data: {
          loginId : id,
          password : pw
        },
        succ: function (data) {
          //로그인이 성공했을 때 콜백
          if(isAutoLogin) self.setAutoLogin(id, pw);
          console.log(data);
          M.data.global({'userId':id});
          $.movePage({
                      url: './main.html',
                      actionType: 'CLEAR_TOP',
                    });
          //alert('로그인 성공')
        }, 
        error : function(data){
           console.log(data);
           alert('로그인 실패');      
        }
      });
    }
  };
  
  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);