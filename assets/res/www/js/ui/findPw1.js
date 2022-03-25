/**
 * @file : findPw.js
 * @author : 김소담
 * @date : 2022-03-23
 */

(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $loginId: null,
      $userNm: null,
      $cellPhone: null,
      $findPwBtn: null
    },
    data: {},
    init: function init() {
      this.els.$loginId = $('#login-id');
      this.els.$userNm = $('#user-name');
      this.els.$cellPhone = $('#cell-phone');
      this.els.$findPwBtn = $('#find-pw-btn');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      this.els.$findPwBtn.on('click', function () {
        self.findPw();
      });
    },

    //    method: {},
    findPw: function () {
      var self = this;
      var id = this.els.$loginId.val().trim();
      var name = this.els.$userNm.val().trim();
      var phone = this.els.$cellPhone.val().trim();

      if (id == '') {
        return alert('ID를 입력해주세요.');
      }
      if (name == '') {
        return alert('이름을 입력해주세요.');
      }
      if (phone == '') {
        return alert('번호를 입력해주세요.');
      }

      $.sendHttp({
        path: SERVER_PATH.FIND,
        data: {
          loginId: id,
          userNm: name,
          cellPhone: phone
        },
        succ: function (data) {
          alert('본인인증 성공');
          M.page.html({
            path: "findPw2.html",
            param: {
              "loginId": id
            }
          });
        },
        error: function () {
          alert('본인인증 실패');
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