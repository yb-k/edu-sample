/**
 * @file : 비밀번호 찾기2 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {

    els: {


      $passwordIpt: null,
      $repasswordIpt: null,
      $changePwBtn: null,
      $loginId: null,


    },
    data: {},
    init: function init() {

      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$changePwBtn = $('#changePwBtn');
      this.els.$loginId = $('#loginId');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      this.els.$loginId.val(M.data.param('loginId'));
      
      
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작

      var self = this;
      this.els.$changePwBtn.on('click', function () {
        self.findPw2();
      })
    },

    // 비밀번호 바꾸기
    findPw2: function () {


      // sample.html 에서 넘어온 Parameter 확인
      M.data.param("loginId");
      var self = this;
      var loginId = M.data.param("loginId");;
      var password = this.els.$passwordIpt.val(); // 변경할 비밀번호 가져오기
      var newPassword = this.els.$repasswordIpt.val(); // 변경할 비밀번호 확인 가져오기 
      console.log(password);

      if (password == '') {
        return alert('비밀번호를 입력해주세요.');
      }
      if (newPassword == '') {
        return alert('비밀번호 확인을 입력해주세요.');
      }



      var PwCon = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (password != newPassword) {
        alert("비밀번호와 비밀번호 확인이 다릅니다.");

      } else if (!PwCon.test(password)) {
        alert("특수문자,숫자,영문이 포함된 8글자 이상으로 해주세요");

        return false;

      } else {
        MNet.sendHttp({
          path: SERVER_PATH.PASSWORD,
          data: {
            "loginId": loginId,
            "password": password,



          },
          succ: function (data) {
            alert("성공");
            M.page.html('./login.html');
          },
          error: function () {
            alert("틀렸습니다.");
          }

        });
        return true;
      }


    }

  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);