/**
 * @file : 비밀번호(2) 변경하기
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M,CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginId: null,
      $userNmIpt: null,
      $cellPhoneIpt: null,
      $findPwBtn: null
    },
    data: {},
    init: function init() {
    
      this.els.$loginId = $('#loginId'); // input 
      this.els.$password = $('#password'); // input 
      this.els.$repassword = $('#repassword'); // input
      this.els.$changePwBtn = $('#changePwBtn');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      // 가져온 데이터 (id) 를 보여준다 
      this.els.$loginId.val(M.data.param('loginId')); // param 
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      // 비밀번호 변경 버튼 클릭시 동작
      var self = this;
      this.els.$changePwBtn.on('click', function () {
        self.findPw2();
      })
    },
    findPw2: function () {
      var self = this;
      var id = this.els.$loginId.val().trim(); // 아이디 가져오기
      var newPw = this.els.$password.val().trim(); // 새로운 dhfkqkd!비밀번호 가져오기
      var newPwCon = this.els.$repassword.val().trim(); // 새로운 비밀번호 확인 가져오기 
      if (newPw == '') {
        return alert('비밀번호를 입력해주세요.');
      }
      if (newPwCon == '') {
        return alert('새로운 비밀번호를 입력해주세요.');
      }
      if (newPw != newPwCon){
        return alert('비밀번호 확인이 일치하지 않습니다.');
      }
      
      // 비밀번호 정규화규칙 확인 
      if(self.checkPw()){
            $.sendHttp({
              path: SERVER_PATH.PASSWORD,
              data: {
                loginId: id,
                password: newPw
              },
              succ: function (data) {
                alert("비밀번호가 변경되었습니다. \n 로그인 페이지로 이동합니다. ");
                M.page.html('./login.html');
              },
              error: function () {
                alert("에러 ");
              }
            });
      }else {
         return alert("비밀번호 변경에 실패했습니다. ");
      }
    },
    checkPw : function (){
      var self = this;
      var pw = this.els.$password.val().trim(); 
      var pwChk = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[@$!%*#^&_-]).{8,}$/;
    
      if(!pwChk.test(pw)){
         alert("비밀번호는 영문, 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 이상의 비밀번호이어야합니다.");
         return false;
      }else return true;
    }
  };
  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);