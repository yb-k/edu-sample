/**
 * @file : findPw2.js 비밀번호 변경페이지
 * @author : 심수현
 * @date : 2022-03-22
 */

 (function ($,M,window){
    var page = {
      els:{
        $loginId: null,
        $password: null,
        $repassword: null,
        $changePwBtn: null
      },
      data: {},
      init: function init(){
          this.els.$loginId = $('#loginId');
          this.els.$password = $('#password');
          this.els.$repassword = $('#repassword');
          this.els.$changePwBtn = $('#changePwBtn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
        // 아이디 가져오기
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        this.els.$changePwBtn.on('click', function(){
            self.changePw();
        });
      },

      changePw: function(){
          var self = this;
          var id = this.els.$loginId.val().trim();
          var pw = this.els.$password.val().trim();
          var rpw = this.els.$repassword.val().trim();
          //변경 비밀번호 조건 확인

          if(pw != rpw){
              return alert("비밀번호와 비밀번호 확인이 다릅니다.");
          }
        
          MNet.sendHttp({
            path: SERVER_PATH.PASSWORD,
            data:{
                loginId: id,
                password: pw,
                repassword: rpw
            },
            succ: function(data){
                //사용자 비밀번호 변경
                alert("비밀번호가 성공적으로 변경되었습니다.\n로그인 페이지로 이동합니다.")
                M.page.html("./login.html");
              }
          });
          
      }
      
  //    method: {},
    };
    window.__page__ = page;
  })(jQuery,M,window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);