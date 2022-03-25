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
      self.els.$saveBtn.disabled = false;
      self.els.$outBtn.disabled = false;
    },
    initEvent : function initEvent(){
      var self = this;
      var pw = self.els.$passwordIpt.val().trim();
      var id = this.els.$loginIdIpt.val(M.data.global('id'));
//      var birth = this.els.$birthDateIpt.val().trim();
//      var regBirth = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
      var email = $('#email').val().trim();
      var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      var cp = $('#cellPhone').val().trim();
//      if(module.isEmpty(birth)){
//        return alert('생년월일을 입력해주세요.');
//      }
//      if(regBirth.test(birth) === false){
//        return alert('YYYYMMDD 형식으로 생년월일을 입력해주세요.');
//      }
      if(pw != ''){
        self.els.$saveBtn.disabled = true;
        self.els.$outBtn.disabled = true;
        self.els.$saveBtn.on('click', function(){
          if(module.isEmpty(email)){
            return alert('이메일을 입력해주세요.');
          } 
          if(regEmail.test(email) === false){
            return alert('입력된 값은 이메일형식이 아닙니다.');
          }
          if(module.isEmpty(cp)){
            return alert('휴대폰번호를 입력해주세요.');
          } 
          if(!module.isRightPhoneNum(cp)){
            return alert('휴대폰 번호를 정확히 입력해주세요.');
          }
          self.els.$saveBtn.disabled = false;
          self.els.$outBtn.disabled = false;
          module.onKeyupNum(self.els.$cellPhoneIpt);
          self.els.$changePwBtn.on('click', function(){
            M.page.html('./findPw2.html');
          });
          MNet.sendHttp({
            path: SERVER_PATH.UPDATE,
            data: {
              loginId : M.data.global('id'),
              password : data.password,
              cellPhone: cellphone,
              email: email  
            },
            succ: function(data){
              alert('수정이 완료되었습니다.');
              M.page.html('./userInfo.html');                       
            },
            error: function (data) {
              console.log(data);
              alert('비밀번호가 일치하지 않습니다.');
            }
          });            
        });
        self.els.$outBtn.on('click', function(){
          alert('정말 탈퇴하시겠습니까?');
        });     
      }else{
        self.els.$saveBtn.on('click', function(){
          return alert('비밀번호를 입력하셔야 합니다.');
        });
      }
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