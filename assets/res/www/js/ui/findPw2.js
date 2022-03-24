/**
 * @file : findPw2.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: {
       $loginId: loginId,
       $password: null,
       $repassword: null,
       $changePwBtn: null,
    },
    data: {},
    init : function init() {
      this.els.$loginId = $('#loginId'); //아이디
      this.els.$password = $('#password'); //이름
      this.els.$repassword = $('#repassword'); //휴대폰
      this.els.$changePwBtn = $('#changePwBtn'); //비밀번호 찾기 버튼
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
     this.els.$loginId.val(M.data.param("loginId"));
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$changePwBtn.on('click', function(){
        self.chgChk();
      });
      
    },
  
    chgChk:function (){
      var self = this;
      var id = M.data.param("loginId");
      var pw = this.els.$password.val().trim();
      var rePw = this.els.$repassword.val().trim();
      var pwChk = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      var pwBtn = this.els.$changePwBtn.prop('click');
      if(pw == ''){
        return alert('비밀번호를 입력해주세요.');
      }
      if(rePw == ''){
        return alert('비밀번호 확인을 입력해주세요.');
      }
      //비밀번호와 비밀번호 확인 일치 여부
      if(!pwChk.test(pw)) {      
        alert('비밀번호 형식에 맞지 않습니다.');                
        return false;
      }
      else {
        if(pw != rePw){
          return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }
        MNet.sendHttp({
          path: SERVER_PATH.PASSWORD,
            data:{
            loginId : id,
            password: pw
          },
          succ: function(data){
            alert('비밀번호가 정상적으로 변경되었습니다.');
            M.page.html({
              path: './login.html'
            });
          },
          error:function(){
            return alert('다시 입력해주세요');
          }
        });
        return true;
      }
  
      return true;
    }
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);