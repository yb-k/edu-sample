/**
 * @file : intro.js 인트로 페이지
 * @author : 류혜리
 * @date : 2022-03-22
 */

(function ($, M, MNet,CONFIG,SERVER_PATH, window){
  var page = {
    els:  {
      $loginIdIpt: null,
      $passwordIpt: null,
      $loginBtn: null,
      $autoLoginChk :  null,
      $findIdBtn : null,
      $findPwBtn : null,
      $joinBtn : null,
    },
    data: {},
    init: function init(){
      this.els.$loginIdIpt = $('#loginId'); // input 태그
      this.els.$passwordIpt = $('#password');
      this.els.$autoLoginChk = $('#auto-login-chk');
      this.els.$findIdBtn = $('#findId');
      this.els.$findPwBtn = $('#findPw');
      this.els.$joinBtn = $('#joinBtn');
      this.els.$loginBtn = $('#login-btn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$loginBtn.on('click', function(){
        self.login();
      });
      this.els.$findIdBtn.on('click', function(){
        M.page.html('./findId.html');
      });
      this.els.$findPwBtn.on('click', function(){
        M.page.html('./findPw1.html');
      });
      this.els.$joinBtn.on('click', function(){
        M.page.html('./join1.html');
      });
    },
    
    setAutoLogin: function(id, pw){
      // 자동 로그인 기능
      M.data.storage('AUTO_LOGIN_AUTH', {id: id, pw: pw});
    },
    unsetAutoLogin: function(){
      M.data.remobeStorage('AUTO_LOGIN_AUTH');
    },
    login : function(){
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();  // 로그인 아이디 가져오기
      var pw = this.els.$passwordIpt.val().trim();
      var isAutoLogin = this.els.$autoLoginChk.prop('checked'); // true/false
      if(id == ''){
        return alert('아이디를 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.LOGIN,
        data: {
          loginId : id,
          password : pw
        },
        succ: function(data){
          //console.log(data); // 정상실행되었을때 log를 실행한다.
          // 로그인 성공시 콜백 - true일때 id, pw 저장
          if(data.rsltCode == '0000'){
            M.data.global({'id' : id });
            if(isAutoLogin) self.setAutoLogin(id, pw);
            M.page.html('./main.html');          
          }else{
            return alert('아이디와 비밀번호가 일치하지 않습니다.');
          }
        }
      });
      
    }
    
  };
  window.__page__ = page;
})(jQuery, M,__mnet__,__config__,__serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);