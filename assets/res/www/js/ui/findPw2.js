/**
 * @file : findPw2
 * @author :
 * @date :
 */

(function ($,M,module,MNet,SERVER_PATH,window){
  var page = {
    els:{
      $loginId : null,
      $password : null,
      $rePassword : null,
      $changePwBtn : null
    },
    data: {},
    init: function init(){
      this.els.$loginId = M.data.param('userId');
      this.els.$password = $('#password');
      this.els.$rePassword = $('#repassword');
      this.els.$changePwBtn = $('#change-pw-btn');
    },
    initView: function initView(){
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent(){
      // DOM Event 바인딩
      var self = this;
      this.els.$changePwBtn.on('click',function () {
        module.confirmPasswordAndRePassword(self.els.$password.val(),self.els.$rePassword.val(),function(){
          MNet.sendHttp({
            path : SERVER_PATH.PASSWORD,
            data : {
              loginId: self.els.$loginId,
              password: self.els.$rePassword.val()
            },
            succ : function (data) {
              if (data.rsltCode == "0000"){
                alert('비밀번호 변경에 성공했습니다.');
                M.page.html('./login.html');
              }
              else{
                alert('비밀번호 변경중 생긴 오류');
              }
            },
            error : function (){
              alert('에러');
            }
          });
        });
      });
    },
   
  };
  window.__page__ = page;
})(jQuery,M,__util__,__mnet__,__serverpath__,window);

(function($,M,pageFunc,window){
  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M,__page__,window);