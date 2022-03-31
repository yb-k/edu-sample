/**
 * @file : findId page
 * @author : 박도영
 * @date :
 */

(function ($, M, MNet, SERVER_PATH, window) {
  var page = {
    els: {
      $userName: null,
      $cellPhone: null,
      $findIdBtn: null,
      $findPw: null
    },
    data: {},
    init: function init() {
      this.els.$userName = $('#user-name');
      this.els.$cellPhone = $('#cellphone');
      this.els.$findIdBtn = $('#find-id-btn');
      this.els.$findPw = $('#find-pw');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      this.els.$findIdBtn.on('click', function () {
        self.findId();
      });
      this.els.$findPw.on('click', function () {
        M.page.html({url : './findPw1.html', actionType:"NO_HISTORY"});
      })
    },
    findId: function findId() {
      var self = this;
      var userName = self.els.$userName.val().trim();
      var cellPhone = self.els.$cellPhone.val().trim();
      if (userName == '') {
        return alert('사용자 이름을 입력해주세요');
      }
      if (cellPhone == '') {
        return alert('휴대폰 번호를 입력해주세요');
      }
      MNet.sendHttp({
        path: SERVER_PATH.FIND_ID,
        data: {
          userNm: userName,
          cellPhone: cellPhone,
        },
        succ: function (data) {
          if (data.rsltCode == '0000') { // 사용자가 찾는 아이디가 있을 경우
            return alert('아이디 : ' + data.loginId);
          } else {
            return alert('해당하는 아이디가 없습니다.');
          }
        }
      })
    }
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);