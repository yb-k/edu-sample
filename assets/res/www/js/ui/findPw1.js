/**
 * @file : 비밀번호찾기 페이지
 * @author : 김정원
 * @date :  2022-03-24
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window) {


  var page = {
    els: {
      $userNmIpt: null,
      $cellPhoneIpt: null,
      $findPwBtn: null,
      $loginIdIpt: null,
    },
    data: {},
    init: function init() {

      this.els.$userNmIpt = $('#userNm'); // input type
      this.els.$loginIdIpt = $('#login-id');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findPwBtn = $('#find-pw-btn');
    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      var self = this;

      this.els.$findPwBtn.on('click', function () {
        self.findPw();
      });
    },

    findPw: function () {

      var userNm = this.els.$userNmIpt.val().trim(); // 이름 가져오기
      var cellPhone = this.els.$cellPhoneIpt.val().trim(); // 전화번호 가져오기
      var id = this.els.$loginIdIpt.val().trim(); // 로그인 아이디 가져오기
      if (userNm == '') {
        return alert('이름을 입력해주세요.');
      }
      if (cellPhone == '') {
        return alert('전화번호을 입력해주세요.');
      }
      if (id == '') {
        return alert('아이디를 입력해주세요.');
      }


      MNet.sendHttp({
        path: SERVER_PATH.FIND,
        data: {
          userNm: userNm,
          cellPhone: cellPhone,
          loginId: id,
        },

        succ: function (data) {
          if (data.existYn == 'Y') {
            M.page.html('./findPw2.html', {
              param: {
                loginId: id
              }


            });
          } else {
            alert("이름이나 전화번호가 맞지않습니다.")
          }
        },


      });
    },
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);