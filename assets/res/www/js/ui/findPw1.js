/**
 * @file : findPw1.js 비밀번호 찾기
 * @author : 심수현
 * @date : 2022-03-22
 */

 (function ($, M, MNet, config, SERVER_PATH, window){
    var page = {
      els:{
          $loginId: null,
          $userNm: null,
          $cellPhone: null,
          $findPwBtn: null
      },
      data: {},
      init: function init(){
          this.els.$loginId = $('#loginId');
          this.els.$userNm = $('#userNm');
          this.els.$cellPhone = $('#cellPhone');
          this.els.$findPwBtn = $('#findPwBtn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        this.els.$findPwBtn.on('click', function(){
            self.findPw();
        });
      },
      
      findPw: function(){
        var self = this;
        var id = this.els.$loginId.val().trim();
        var name = this.els.$userNm.val().trim();
        var phone = this.els.$cellPhone.val().trim();

        if(id == ''){
            return alert("아이디를 입력해주세요.");
        }
        if(name == ''){
            return alert("이름을 입력해주세요.");
        }
        if(phone == ''){
            return alert("휴대폰 번호를 입력해주세요.");
        }
        
        MNet.sendHttp({
            path: SERVER_PATH.FIND,
            data:{
                loginId : id,
                userNm : name,
                cellPhone : phone
            },
            succ: function(data){
                alert("본인인증에 성공했습니다.\n비밀번호 변경페이지로 이동합니다.")
                M.page.html("./findPw2.html");
            },
            error: function(data){
                alert("본인 인증에 실패했습니다.");
            }
        });
       
      }
  //    method: {},
    };
    window.__page__ = page;
  })(jQuery, M, __mnet__, __config__, __serverpath__, window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);