/**
 * @file : 비밀번호 찾기1 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $loginIdIpt: null,
      $userNmIpt: null,
      $cellPhoneIpt: null,
      $findPwBtn: null,


    },
    data: {},
    init: function init() {
      this.els.$loginIdIpt = $('#loginId');
      this.els.$userNmIpt = $('#userNm');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findPwBtn = $('#findPwBtn');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작

      var self = this;
      this.els.$findPwBtn.on('click', function () {
        self.findPw1();

      })
    },




    // 비밀번호 찾기
    findPw1: function () {
      var self = this;
      var userId = this.els.$loginIdIpt.val().trim(); // 사용자 아이디 가져오기
      var userNm = this.els.$userNmIpt.val().trim(); // 사용자 이름 가져오기 
      var cellPhone = this.els.$cellPhoneIpt.val().trim(); // 사용자 전화번호 가져오기 

      if (userId == '') {
        return alert('아이디를 입력해주세요')
      }
      if (userNm == '') {
        return alert('이름을 입력해주세요.');
      }
      if (cellPhone == '') {
        return alert('전화번호를 입력해주세요.');
      }




      MNet.sendHttp({
        path: SERVER_PATH.FIND,
        data: {
          "loginId": userId,
          "userNm": userNm,
          "cellPhone": cellPhone

        },

        succ: function (data) {
          if (data.existYn == 'Y') {
            alert("성공");
            // 페이지 호출
            M.page.html({
              path: './findPw2.html',
              param: {
                "loginId": userId
              }
            });
          } else {
            alert("아이디 또는 비밀번호 또는 전화번호가 없습니다.");
          }
        },
        error: function () {
          alert("아이디 또는 비밀번호 또는 전화번호가 맞지 않습니다.");
        }

      });



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