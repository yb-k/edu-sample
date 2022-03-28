/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginId: loginId, //아이디
      $userNm: userNm, //이름
      $password: null, //패스워드
      $birthDate: birthDate, //생년월일
      $email: email, //이메일
      $cellPhone: cellPhone, //휴대폰 번호
      $saveBtn: null, // 수정
      $outBtn: null, //탈퇴
      $changePw: null //비밀번호 변경
    },
    data: {},
    init : function init() {
      this.els.$loginId = $('#loginId');
      this.els.$password = $('#password');
      this.els.$userNm = $('#userNm');
      this.els.$birthDate = $('#birthDate');
      this.els.$email = $('#email');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$saveBtn = $('#saveBtn');
      this.els.$outBtn = $('#outBtn');
      this.els.$changePw = $('#changePw');
    },
    initView : function initView() {
      var self = this;
      this.els.$loginId.val(M.data.global('loginId'));
      $.sendHttp({
        path: SERVER_PATH.INFO,
        data: {
          "loginId": M.data.global('loginId'),
        },
        succ: function (data) {
          console.log(data);
          self.els.$userNm.val(data.userNm);
          self.els.$birthDate.val(data.birthDate);
          self.els.$cellPhone.val(data.cellPhone);
          self.els.$email.val(data.email);
        },
        error: function (data) {
          console.log(data);
          alert("회원 정보를 가져오지 못했습니다.");
        }
      });
      
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$password.on('input', function(){
        if($('#changePw').val() == ''){
          $('#saveBtn').prop("disabled", false);
         }
         else{
          $('#saveBtn').prop("disabled", true);
        }
      });
      
      //수정 버튼
      this.els.$saveBtn.on('click', function(){
//        var a = self.pwChk();
//        if(!a){
          self.save();
//        }
      });
      
      //탈퇴 버튼
      this.els.$outBtn.on('click', function(){
//        var a = self.pwChk();
//        if(a){
//          alert('탈퇴하시겠습니까?');
          self.outUser();
//        }
      });
      
      //비밀번호 변경
      this.els.$changePw.on('click', function(){
         self.changePw();
      });
    },
    save:function(){
      var self = this;
      var id = this.els.$loginId.val().trim();
      var phone = this.els.$cellPhone.val().trim();
      var email = this.els.$email.val().trim();
      var pw = this.els.$password.val().trim();
      if(phone == ''){
        alert('핸드폰 번호를 입력해주세요.');
      }
      if(email == ''){
        alert('이메일 주소를 입력해주세요.');
      }
      $.sendHttp({
        path: SERVER_PATH.UPDATE,
        data:{
          loginId : id, 
          password : pw,
          cellPhone : phone, 
          email : email
        },
        succ: function(data){
          console.log(data); 
          alert('회원 정보가 수정되었습니다.');
          M.page.html({
            path: './userInfo.html'
          });
        },
        error:function(data){
        console.log(data); 
          return alert('다시 입력해주세요');
        }
      });
    },
    //비밀번호 체크
    pwChk:function(){
      var self = this;
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$password.val().trim();
      $.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data:{
          loginId : id, 
          password : pw
        },
        succ: function(data){
          console.log(data); 
          return true;
        },
        error:function(data){
          console.log(data); 
          alert('비밀번호가 일치하지 않습니다.');
          return false;
        }
      });
    },
    //비밀번호 변경 페이지로 이동
    changePw: function(){
      var self = this;
      var id = this.els.$loginId.val().trim();
      var pw = this.els.$password.val().trim();
      $.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD, 
        data:{
          loginId : id, 
          password : pw
        },
        succ: function(data){
          console.log(data);
          M.page.html({
            path: './findPw2.html',
            param: {"loginId": id }
          });
        },
        error: function (data) {
          console.log(data);
          alert('비밀번호가 일치하지 않습니다.');
        }
      });
    },

    outUser:function(){
      var self = this;
      var id = this.els.$loginId.val().trim();
      alert('탈퇴하시겠습니까?');
      $.sendHttp({
        path: SERVER_PATH.OUT, 
        data:{
          loginId : id
        },
        succ: function(data){
          console.log(data);
          M.page.html({
            path: './login.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert('탈퇴실패');
        }
      })
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