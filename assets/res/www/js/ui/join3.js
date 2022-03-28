/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet, module, SERVER_PATH, window){

  var page = {
    els:  {
      $userNm : null,
      $gender : null,
      $birthDate : null,
      $cellPhone : null,
      
      $loginIdIpt : null,
      $passwordIpt : null,
      $repasswordIpt : null,
      $pwOk : null,
      $dupBtn : null,
      $dupBtnOk : null,
      $emailIpt : null,
      $joinBtn : null,
    },
    data: {},
    init: function init(){
      this.els.$userNm = M.data.param('userNm');
      this.els.$gender = M.data.param('gender');
      this.els.$birthDate = M.data.param('birthDate');
      this.els.$cellPhone = M.data.param('cellPhone');
      
      this.els.$loginIdIpt = $('#loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$pwOk = false;
      console.log(this.els.$pwOk);
      this.els.$dupBtn = $('#dupBtn');
      this.els.$dupBtnOk = false;
      this.els.$emailIpt = $('#email');
      this.els.$joinBtn = $('#joinBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      $('.l-fix').on('click', function(){
        M.page.back();
      });
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$dupBtn.on('click', function(){
        self.idOk();
      });
      this.els.$joinBtn.on('click', function(){
        self.joinOk();
      });      
    },
    idOk : function(){
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      if(module.isEmpty(id)){
        return alert('아이디를 입력해주세요.');
      }
      if(id.length < 5 ){
        return alert('아이디를 5자 이상 입력해주세요.');
      }
      MNet.sendHttp({
        path : SERVER_PATH.DUPLICATE,
        data : { loginId : id },
        succ : function succ(data){
          if(data.dupYn === 'Y'){
            alert('중복된 아이디입니다.');
            self.els.$dupBtnOk = false;
          }else{
            alert('사용 가능한 아이디입니다.');
            M.data.param({'idT' : id});
            console.log(M.data.param('idT'));
            self.els.$dupBtnOk = true;
          }
        }
      });
    },
    joinOk : function(){
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      var rpw = this.els.$repasswordIpt.val().trim();
      var email = this.els.$emailIpt.val().trim();
      var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      
      var nm = this.els.$userNm;
      var gender = this.els.$gender;
      var birth = this.els.$birthDate;
      var cellphone = this.els.$cellPhone;
      if(module.isEmpty(id)){
        return alert('아이디를 입력해주세요.');
      }      
      if(module.isEmpty(pw)){
        return alert('비밀번호를 입력해주세요.');
      }
      module.isCorrectPassword(pw, rpw, function(){
        self.els.$pwOk = true;
      });
      if(module.isEmpty(email)){
        return alert('이메일을 입력해주세요.');
      }
      if(regEmail.test(email) === false){
        return alert('입력된 값은 이메일형식이 아닙니다.');
      }
      if(M.data.param('idT') != id){
        self.els.$dupBtnOk = false;
      }
      if(self.els.$dupBtnOk === false){
        return alert('아이디 중복체크를 해주세요.');
      }
      if(self.els.$pwOk){
        MNet.sendHttp({
          path : SERVER_PATH.JOIN,
          data : {
            loginId: id,
            password: pw,
            userNm: nm,
            birthDate: birth,
            gender: gender,
            cellPhone: cellphone,
            email: email
          },
          succ : function(data){
            M.page.html({
              url: "./join4.html",
              actionType: 'CLEAR_TOP'
            });
          }
        });
      }   
    }
    
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __util__, __serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);