/**
 * @file : userInfo.js
 * @author : 강샛별
 * @date : 22-03-25
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, CONFIG, SERVER_PATH, window){
  var page = {
      els: {
        $changePw : null,
        $userNmIpt : null,
        $loginIdIpt : null,
        $passwordIpt : null,
        $birthDateIpt : null,
        $emailIpt : null,
        $cellPhoneIpt : null,
        $saveBtn : null,
        $outBtn : null,
        $backBtn : null
      },
      data: {},
      init : function init() {
        this.els.$changePw = $('#change-pw');
        this.els.$userNmIpt = $('#user-nm');
        this.els.$loginIdIpt = $('#login-id');
        this.els.$passwordIpt = $('#password');
        this.els.$birthDateIpt = $('#birth-date');
        this.els.$emailIpt = $('#email');
        this.els.$cellPhoneIpt = $('#cell-phone');
        this.els.$saveBtn = $('#save-btn');
        this.els.$outBtn = $('#out-btn');
        this.els.$backBtn = $('.btn-back');
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
        var self = this;
        var id = M.data.global('loginId');
        console.log("id "+id);
        MNet.sendHttp({
          path : SERVER_PATH.INFO,
          data : {
            loginId : id
          },
          succ : function(data){
          console.log(data);
            self.els.$loginIdIpt.val(id);
            self.els.$userNmIpt.val(data.userNm);
            self.els.$birthDateIpt.val(data.birthDate);
            self.els.$emailIpt.val(data.email);
            self.els.$cellPhoneIpt.val(data.cellPhone);
         }, 
          error : function(data){
            console.log(data);
            alert("실패");      
          }
         });
        
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        
        var self = this;
        this.els.$backBtn.on('click', function(){
            M.page.html('./main.html');
        });
        this.els.$passwordIpt.on('input', function() {
          if($('#password').val() == '') {
            $('#change-pw').prop('disabled', true);
            $('#save-btn').prop('disabled', true);
          }else {
            $('#change-pw').prop('disabled', false);
            $('#save-btn').prop('disabled', false);
          }
        });
        
        this.els.$changePw.on('click', function(){
           self.changePw();
        });
        this.els.$saveBtn.on('click', function(){
           self.saveBtn();
        });
        this.els.$outBtn.on('click', function(){
           self.outBtn();
        });
      },
      
      changePw : function() {
        var id = this.els.$loginIdIpt.val().trim();
        var password = this.els.$passwordIpt.val().trim();
        MNet.sendHttp({
          path : SERVER_PATH.CHECK_PASSWORD,
          data : {
            loginId : id,
            password : password
          },
          succ : function(data){
            M.page.html({
              path: "findPw2.html",
              param: {
                "loginId": id
              }
            });
         }, 
          error : function(data){
            alert(" 실패");      
          }
         });
        
      },
      
      saveBtn : function() {
        var id = this.els.$loginIdIpt.val().trim();
        var password = this.els.$passwordIpt.val().trim();
        var email = this.els.$emailIpt.val().trim();
        var cellPhone = this.els.$cellPhoneIpt.val().trim();
        
        MNet.sendHttp({
          path : SERVER_PATH.UPDATE,
          data : {
            loginId : id,
            password : password,
            email : email,
            cellPhone : cellPhone
          },
          succ : function(data){
            alert("수정 완료");
            M.page.html("./userInfo.html");
         }, 
          error : function(data){
            console.log(data);
            alert("수정 실패");      
          }
         });
        
      },
      
      outBtn : function() {
        var id = this.els.$loginIdIpt.val().trim();  
        MNet.sendHttp({
          path : SERVER_PATH.OUT,
          data : {
            loginId : id
          },
          succ : function(data){
            alert(" 완료");
            M.page.html("./login.html");
         }, 
          error : function(data){
            alert(" 실패");      
          }
         });
        
          
      }
     
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);