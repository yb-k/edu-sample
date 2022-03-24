/**
 * @file : base.js
 * @author : 심수현
 * @date : 2022-03-22
 */

 (function ($,M,SERVER_PATH,config,window){
    var page = {
      els:{
          $changePw: null,
          $userNm: null,
          $loginId: null,
          $password: null,
          $birthDate: null,
          $email: null,
          $cellPhone: null,
          $saveBtn: null,
          $outBtn: null
      },
      data: {},
      init: function init(){
          this.els.$changePw = $('#changePw');
          this.els.$userNm = $('#userNm');
          this.els.$loginId = $('#loginId');
          this.els.$password = $('#password');
          this.els.$birthDate = $('#birthDate');
          this.els.$email = $('#email');
          this.els.$cellPhone = $('#cellPhone');
          this.els.$saveBtn = $('#saveBtn');
          this.els.$outBtn = $('#outBtn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
        //이름, 아이디, 생년월일, 메일, 휴대폰번호
        this.els.$loginId.val(M.data.param("loginId"));
        this.els.$userNm.val(M.data.param("userNm"));
        this.els.$birthDate.val(M.data.param("birthDate"));
        this.els.$email.val(M.data.param("email"));
        this.els.$cellPhone.val(M.data.param("cellPhone"));
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        //비밀번호 변경
        this.els.$changePw.on('click', function(){
          M.page.html("./findPw2.html");
        });
        //수정
        this.els.$saveBtn.on('click', function(){

        });
        //탈퇴
        this.els.$outBtn.on('click', function(){
          self.drop();
        });
      },
      
  //    method: {},
    };
    window.__page__ = page;
  })(jQuery,M,__serverpath__,__config__,window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);