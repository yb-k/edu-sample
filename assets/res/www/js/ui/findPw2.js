/**
 * @file : 비밀번호찾기 페이지
 * @author : 김정원
 * @date :  2022-03-24
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window){


  var page = {
    els:{
      $repasswordIpt:null,
      $passwordIpt: null,
      $loginIdIpt:null,
      $changePwBtn:null,
    },
    data: {},
    init: function init(){
      var id = M.data.param("loginId");
      this.els.$loginIdIpt = $('#loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$changePwBtn = $('#changePwBtn');
      this.els.$loginIdIpt.attr('value',id);
    },
    
   
    initView: function initView(){
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent(){
      // initEvent 바인딩
      var self = this;

      this.els.$changePwBtn.on('click', function(){
        self.changPw();
      });
    },

    changPw: function(){
      var self = this;
      var repassword = this.els.$repasswordIpt.val().trim();
      var password = this.els.$passwordIpt.val().trim();
      var passchk = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      var id = this.els.$loginIdIpt.val().trim();
      if (password == '') {
        return alert('비밀번호를 입력해주세요.');
      }
      if (repassword == '') {
        return alert('비밀번호확인을 입력해주세요.');
      }
      if(password != repassword){
        return alert('비밀번호와 비밀번호확인이 다릅니다.');
      }else if(!passchk.test(password)){
        alert("비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 이상으로 설정해주세요.");
        return false;
      }else{
        MNet.sendHttp({
          path: SERVER_PATH.PASSWORD,
          data: {
            loginId: id,
            password: password,
  
  
          },
          succ: function (data) {
            alert("비밀번호 변경완료.");
            M.page.html('./login.html');
          },
       
  
        });
      }



    },
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window){
  M.onReady(function() {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);