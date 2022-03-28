/**
 * @file : findPw1.js
 * @author :
 * @date : 
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
    els: {
      $loginId : null,
      $passwordIpt : null,
      $repasswordIpt : null,
      $changePwBtn : null
    },
    data: {},
    init : function init() {
      this.els.$loginId = $('#loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$changePwBtn = $('#changePwBtn');
    },
    initView : function initView() {
    this.els.$loginId.val(M.data.param('loginId'));
      // 화면에서 세팅할 동적데이터
      
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$changePwBtn.on('click', function(){
        self.changePw();
      });
    },
    
    changePw : function(){
      var self = this;
         var id = M.data.param("loginId"); // param은 여기서 받기!
         var password = this.els.$passwordIpt.val().trim();
         var repassword = this.els.$repasswordIpt.val().trim();
         var regPassword = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      
          if(password == '') {
             return alert('비밀번호를 입력해주세요');
          }else if(!regPassword.test(password)) {
             return alert('비밀번호는 특수문자, 숫자, 영문이 포함된 8자 이상의 문자열로 입력해주세요.');
          }
          
          if(repassword == '') {
             return alert('비밀번호 확인을 입력해주세요');
          }
          if(password != repassword) {
             return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
          }
      
      MNet.sendHttp({
        path: SERVER_PATH.PASSWORD,
        data: {
              loginId : id,
              password : password,
              repassword : repassword
        },
        succ: function (data) {
          if(data.rsltCode == '0000') {
             alert('비밀번호가 변경되었습니다.');
             return M.page.html('./login.html');
          }else{
             alert('비밀번호가 변경되지 않았습니다.');
          }
         }
      });
    }
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);