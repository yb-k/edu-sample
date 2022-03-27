/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
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
      // 화면에서 세팅할 동적데이터

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$findPwBtn.on('click', function () {
        self.findPw();
      });
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
    },

    findPw: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var name = this.els.$userNmIpt.val().trim();
      var phone = this.els.$cellPhoneIpt.val().trim();
      if (id == '') {
        return alert('아이디를 입력해주세요');
      }
      if (name == '') {
        return alert('이름을 입력해주세요');
      }
      if (phone == '') {
        return alert('전화번호를 입력해주세요');
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
            console.log(data);
            M.page.html({
              path: './findPw2.html',
              param: {
                "loginId": id,
              }
            });
          } else {
            console.log(data);
            alert('본인 인증 실패! 정보를 확인하고 다시 입력해주세요');
          }
        },
        error: function (data) {
          console.log(data);
          alert('본인 인증 실패! 정보를 확인하고 다시 입력해주세요');
        }
      });
    }
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);