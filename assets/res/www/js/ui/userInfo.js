/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet, module,SERVER_PATH, window){

  var page = {
    els:  {
      $changePwBtn : null,
      $userNmIpt : null,
      $loginIdIpt : null,
      $passwordIpt : null,
      $birthDateIpt : null,
      $emailIpt : null,
      $cellPhoneIpt : null,
      $saveBtn : null,
      $outBtn : null,
    },
    data: {},
    init: function init(){
      this.els.$changePwBtn = $('#changePw');
      this.els.$userNmIpt = $('#userNm');
      this.els.$loginIdIpt = $('#loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$birthDateIpt = $('#birthDate');
      this.els.$emailIpt = $('#email');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$saveBtn = $('#saveBtn');
      this.els.$outBtn = $('#outBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      var self = this;
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      MNet.sendHttp({
        path: SERVER_PATH.INFO,
        data: {
          loginId : M.data.global('id'),
        },
        succ: function(data){
          self.els.$userNmIpt.val(data.userNm);
          self.els.$loginIdIpt.val(M.data.global('id'));
          self.els.$birthDateIpt.val(data.birthDate);
          self.els.$emailIpt.val(data.email);
          self.els.$cellPhoneIpt.val(data.cellPhone);
        },
        error: function (data) {
          console.log(data);
          alert('정보를 가져오지 못했습니다.');
        }
      });
      $('#saveBtn').attr("disabled", true);
    },
    initEvent : function initEvent(){
      var self = this;
      var id = M.data.global('id');
//      var birth = this.els.$birthDateIpt.val().trim();
//      var regBirth = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
      module.onKeyupNum(self.els.$cellPhoneIpt);
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      self.els.$passwordIpt.on('propertychange change keyup paste input', function () {
        $(self.els.$saveBtn).attr("disabled", false);
      });
      self.els.$changePwBtn.on('click', function () {
        var pw = self.els.$passwordIpt.val().trim();
        console.log(id);
        console.log(pw);
        MNet.sendHttp({
          path: SERVER_PATH.CHECK_PASSWORD,
          data: {
            loginId: id,
            password: pw,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              alert('비밀번호 확인 완료!');
              M.page.html({ path : './findPw2.html', 
                            action: 'NO_HISTORY',
                            param : {loginId : id}});
            } else {
              console.log(data);
              alert('비밀번호가 일치하지 않습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
      });
//      if(module.isEmpty(birth)){
//        return alert('생년월일을 입력해주세요.');
//      }
//      if(regBirth.test(birth) === false){
//        return alert('YYYYMMDD 형식으로 생년월일을 입력해주세요.');
//      }
      self.els.$saveBtn.on('click', function(){
        var pw = self.els.$passwordIpt.val().trim();
        var email = self.els.$emailIpt.val().trim();
        var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        var cp = self.els.$cellPhoneIpt.val().trim();
        if(module.isEmpty(email)){
          return alert('이메일을 입력해주세요.');
        } 
        if(regEmail.test(email) === false){
          return alert('입력된 값은 이메일형식이 아닙니다.');
        }
        if(module.isEmpty(cp)){
          return alert('휴대폰 번호를 입력해주세요.');
        } 
        if(!module.isRightPhoneNum(cp)){
          return alert('휴대폰 번호를 정확히 입력해주세요.');
        }
        MNet.sendHttp({
          path: SERVER_PATH.CHECK_PASSWORD,
          data: {
            loginId: id,
            password: pw
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              MNet.sendHttp({
                path: SERVER_PATH.UPDATE,
                data: {
                  loginId : id,
                  password : pw,
                  cellPhone: cp,
                  email: email  
                },
                succ: function(data){
                  alert('수정이 완료되었습니다.');
                  self.els.$passwordIpt.val('');                    
                },
                error: function (data) {
                  console.log(data);
                  alert('수정에 실패하셨습니다.');
                }
              });  
            } else {
              console.log(data);
              alert('비밀번호가 일치하지 않습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });          
      });
      self.els.$outBtn.on('click', function(){
        var pw = self.els.$passwordIpt.val().trim();
        console.log(id);
        console.log(pw);
        MNet.sendHttp({
          path: SERVER_PATH.CHECK_PASSWORD,
          data: {
            loginId: id,
            password: pw,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
               if (confirm("정말 탈퇴하시겠습니까?") == true){
                  MNet.sendHttp({
                    path: SERVER_PATH.OUT,
                    data: {
                      loginId: id,
                    },
                    succ: function (data) {
                      if (data.rsltCode == '0000') {
                        M.data.removeGlobal('id');
                        M.data.removeStorage('AUTO_LOGIN_AUTH');
                        alert("탈퇴완료되었습니다."); 
                        M.page.html({
                          url: './login.html',
                          actionType: 'CLEAR_TOP',
                        });
                      } else {
                        console.log(data);
                        alert('탈퇴에 실패하셨습니다.');
                      }
                    },
                    error: function (data) {
                      console.log(data);
                      alert('에러!');
                    }
                  });
               }else{
                 alert("취소되었습니다");
               }
            } else {
              console.log(data);
              alert('비밀번호가 일치해야 탈퇴하실 수 있습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
      });     
      
    } 
  };
  window.__page__ = page;
})(jQuery, M,__mnet__, __util__,__serverPath__, window);


// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);