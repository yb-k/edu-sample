/**
 * @file : 비밀번호 찾기(1) (본인인증전)
 * @author : 김예은
 * @date : 22.03.23
 */

(function ($, M, CONFIG, window) {
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
      this.els.$userNmIpt = $('#userNm'); // input 
      this.els.$cellPhoneIpt = $('#cellPhone'); // input
      this.els.$findPwBtn = $('#findPwBtn');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      // 본인인증 버튼 클릭시 동작
      var self = this;
      this.els.$findPwBtn.on('click', function () {
        self.findPw1();
      })
    },
    findPw1: function () {
      var self = this;
      var id = this.els.$loginId.val().trim(); // 아이디 가져오기
      var name = this.els.$userNmIpt.val().trim(); // 이름 가져오기
      var phone = this.els.$cellPhoneIpt.val().trim(); // 휴대폰 번호 가져오기 
      if (id == '') {
        return alert('ID를 입력해주세요.');
      }
      if (name == '') {
        return alert('이름을 입력해주세요.');
      }
      if (phone == '') {
        return alert('휴대폰 번호를 입력해주세요.');
      }
      $.sendHttp({
        path: SERVER_PATH.FIND,
        data: {
          loginId: id,
          userNm: name,
          cellPhone: phone
        },
        succ: function (data) {
          if (data.existYn == 'Y') {
            alert("본인 인증에 성공했습니다.");
            M.page.html({
              path: "./findPw2.html",
              param: {
                "loginId" : id
              }
            });
          }
          else {
           return  alert("본인 인증에 실패했습니다.");
          }
        },
        error: function (data) {
          console.log(data);
          alert("본인 인증에 실패했습니다.");
        }
      });
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