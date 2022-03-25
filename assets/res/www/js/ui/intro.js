/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, M, MNet, SERVER_PATH, window) {
  var page = {
    els: {
      $percent: null,
      $progressBar: null,
    },
    data: {},
    init: function init() {
      this.els.$percent = $('#percent');
      this.els.$progressBar = $('#progress-bar');
    },
    /**
     * 진행도를 표시한다.
     * @param {function} successCallback 완료후 호출될 함수
     */
    startProgress: function startProgress(successCallback) {
      var $percent = this.els.$percent;
      var $progressBar = this.els.$progressBar;
      var count = 0;
      var interval = setInterval(function () {
        count = count + 10;
        $percent.html(count);
        $progressBar.css('width', count + '%');
        if (count >= 0) {               // 테스트중 로딩속도를 빠르게하기 위해 0
          clearInterval(interval);
          successCallback();
        }
      }, 50); // 50미리 초 마다 반복실행 
    },
    moveLoginPage: function moveLoginPage() {
      M.page.html({
        url: "./login.html",
        actionType: "CLEAR_TOP"
      });
    },
    initView: function initView() {
      var self = this;
      var existLoginData = M.data.storage('AUTO_LOGIN_AUTH');
      if (existLoginData) {
        this.startProgress(function () {
          MNet.sendHttp({
            path: SERVER_PATH.LOGIN,
            data: {
              loginId: existLoginData.id,
              password: existLoginData.pw,
            },
            succ: function () {
              console.log('로그인 성공');
              M.data.global("LOGIN_INFO",{id : existLoginData.id});
              M.page.html('./main.html');
            },
            error: function () {
              console.log('로그인 실패');
              self.moveLoginPage();
            }
          });
        });
      } else {
        this.startProgress(this.moveLoginPage);
      }
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
    },
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);