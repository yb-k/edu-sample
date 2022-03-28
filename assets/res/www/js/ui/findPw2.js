/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet,module, SERVER_PATH, window){

  var page = {
    els:  {
      $loginIdIpt : null,
      $passwordIpt : null,
      $repasswordIpt : null,
      $changePwBtn : null,
    },
    data: {},
    init: function init(){
      this.els.$loginIdIpt = M.data.param('loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$changePwBtn = $('#changePwBtn');
    },
    initView : function initView(){
      $('#loginId').attr("placeholder", M.data.global('id'));
      
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$changePwBtn.on('click', function(){
        self.changePw();
      });
    },
    changePw : function(){
      var id = this.els.$loginIdIpt;
      var pw = this.els.$passwordIpt.val().trim();
      var rpw = this.els.$repasswordIpt.val().trim();
      if(module.isEmpty(id)){
        return alert('아이디를 입력해주세요.');
      }
      if(module.isEmpty(pw)){
        return alert('변경할 비밀번호를 입력해주세요.');
      }
      module.isCorrectPassword(pw, rpw, function(){
        MNet.sendHttp({
          path: SERVER_PATH.PASSWORD,
          data: {
            loginId : id,
            password : pw
          },
          succ: function(data){
            alert('비밀번호 변경에 성공하셨습니다.');
            M.data.removeStorage('AUTO_LOGIN_AUTH');
        M.page.html({
          url: "./login.html",
          actionType: 'CLEAR_TOP'
        });
          },
          error: function(){
            alert('에러!');
          }
        });      
      });
     
    }
  };
  window.__page__ = page;
})(jQuery, M, __mnet__,__util__ ,__serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);