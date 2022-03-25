/**
 * @file : login.js
 * @author : 
 * @date : 22.03.22
 */
 /*
  * Page 상세정보 추출
  * Page 상세 정보를 추출할 수 있다.
  *
  * M.page.info
  * @param {select} 상세 정보를 알고자 하는 Key 값 [action:화면 스택 관리 방법,alias:화면의 Alias 경로,browser:브라우저 이름,browserVer:브라우저 버전,device:Device 정보,filename:화면의 파일명,orient:화면 방향,os:디바이스 os, 소문자출력,osVer:디바이스 os 버전,params:화면의 parameter 데이타,path:화면의 경로값,screenHeight:화면 높이,screenWidth:화면 넓이,scrollHeight:컨텐트 높이,scrollWidth:컨텐트 넓이,source:화면의 source 경로,stack:스택 정보,tabStack:현재 스택의 tab 정보,time:화면이 생성되고 경과된 시간, millisecond 단위]
  */
 M.page.info("action");
// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: { 
      $loginIdIpt : null,
      $passwordIpt : null,
      $loginBtn : null,
      $autoLoginChk : null,
      $findIdBtn : null,
      $findPwBtn : null,
      $joinBtn : null
    },
    data: {},
    init :function init(){
      this.els.$loginIdIpt = $('#login-id'); // input
      this.els.$passwordIpt = $('#password'); // input
      this.els.$loginBtn = $('#login-btn');
      this.els.$autoLoginChk = $('#auto-login-chk');
      this.els.$findIdBtn = $('#find-id');
      this.els.$findPwBtn = $('#find-pw');
      this.els.$joinBtn = $('#join-btn');
    },
    initView : function initView(){
      //화면에서 세팅할 동적데이터
    },
    initEvent : function initEvent(){
      // Dom Event 바인딩
      
      // 로그인 버튼 클릭시 동작
      var self = this;
      this.els.$loginBtn.on('click', function(){
        self.login();
      })
      this.els.$findIdBtn.on('click', function(){
        M.page.html('./findId.html');
      })
      this.els.$findPwBtn.on('click', function(){
        M.page.html('./findPw1.html');
      })
      this.els.$joinBtn.on('click', function(){
        M.page.html('./join1.html');
      })
    }, 
    setAutoLogin : function(id, pw){
      // 자동로그인 기능
      M.data.storage('AUTO_LOGIN_AUTH',{ id: id, pw : pw });
      
    },
    // 자동 로그인 해제 
    unsetAutoLogin : function(){
      M.data.removeStorage('AUTO_LOGIN_AUTH');
    },
    
    login : function(){
      var self = this;
      var id = this.els.$loginIdIpt.val(); // 로그인 아이디 가져오기
      var pw = this.els.$passwordIpt.val(); // 비밀번호 가져오기 
      // 자동로그인
      var isAutoLogin = this.els.$autoLoginChk.prop('checked'); // true거나 false
      if (id == ''){
        return alert('아이디를 입력해주세요.');
      }
      if (pw == ''){
        return alert('비밀번호를 입력해주세요.');
      }
     
     MNet.sendHttp({
      path : SERVER_PATH.LOGIN,
      data : {
        loginId : id, 
        password : pw
      },
      
      succ : function(data){
        M.data.global('loginId', id);
        console.log(data); 
//        alert("로그인 성공");
        // 자동로그인 
        if (isAutoLogin)  self.setAutoLogin(id, pw);
        M.page.html('./main.html');
      }, 
      error : function(data){
        console.log(data);
        alert("로그인 실패");      
      }
     });
    }
    
  };
  window.__page__ = page;
})(jQuery,M, __mnet__ , __config__ , __serverpath__ ,window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window){
  M.onReady(function(){
  pageFunc.init(); //최초 화면 초기화
  pageFunc.initView();
  pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);