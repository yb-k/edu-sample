/**
 * @file : 아이디 찾기 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $userNm: null,
      $cellPhone: null,
      $findIdBtn: null,
      $findPw: null,

    },
    data: {},
    init: function init() {
      this.els.$userNm = $('#userNm');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$findIdBtn = $('#findIdBtn')
      this.els.$findPw = $('#findPw');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작
      var self = this;
      this.els.$findIdBtn.on('click', function () {
        self.findId();
      })
      this.els.$findPw.on('click', function () {
        M.page.html('./findPw1.html');
      })
    },

    // 아이디 찾기
    findId: function () {
      var self = this;
      var userNm = this.els.$userNm.val(); // 사용자 이름 가져오기
      var cellPhone = this.els.$cellPhone.val(); // 사용자 전화번호 가져오기 

      if (userNm == '') {
        return alert('이름을 입력해주세요.');
      }
      if (cellPhone == '') {
        return alert('전화번호를 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.FIND_ID,
        data: {
          userNm: userNm,
          cellPhone: cellPhone
        },
        succ: function (data) {
          console.log(data);
          alert("유저의 아이디는" + data.loginId);

        },
        error: function () {
          alert("에러입니다.");
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