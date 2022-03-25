/**
 * @file : findId.js
 * @author : 김소담
 * @date : 2022-03-23
 */

(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $userNm: null,
      $cellPhone: null,
      $findIdBtn: null,
      $findPw: null
    },
    data: {},
    init: function init() {
      this.els.$userNm = $('#user-name');
      this.els.$cellPhone = $('#cell-phone');
      this.els.$findIdBtn = $('#find-id-btn');
      this.els.$findPw = $('#find-pw');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      this.els.$findIdBtn.on('click', function () {
        self.findId();
      });
      this.els.$findPw.on('click', function () {
        M.page.html('./findPw1.html');
      })
    },

    // method: {},
    findId: function () {
      var self = this;
      var name = this.els.$userNm.val().trim();
      var phone = this.els.$cellPhone.val().trim();
      //          var regex = /[^0-9]/g;				// 숫자 외 문자를 선택하는 정규식
      //          var phone = phone.replace(regex, "");	// 숫자 외의 문자를 빈 문자로 변경
      //        정규식을 사용했는데 input tag에 이미 적용된 걸 몰랐다!

      if (name == '') {
        return alert('이름을 입력해주세요.');
      }
      if (phone == '') {
        return alert('번호를 입력해주세요.');
      }
      $.sendHttp({
        path: SERVER_PATH.FIND_ID,
        data: {
          userNm: name,
          cellPhone: phone
        },
        succ: function (data) {
          alert('아이디는 ' + data.loginId + ' 입니다.');
        },
        error: function (data) {
          alert('ID를 찾을 수 없습니다.')
        }
      });
    }
  };

  window.__page__ = page;
})(jQuery, M,  __config__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);