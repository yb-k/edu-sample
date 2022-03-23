/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

// 페이지 단위 모듈
(function ($, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;

  var page = {
    els: {
      $percent: null,
      $progressBar: null,
    },
    data: {},
    init: function init() {
      this.els.$percent = $('#percent');
      this.els.$progressBar = $('#progress-bar')
    },
    /**
     * 진행도를 표시한다.
     * @param {function} succCallback 완료 후 호출될 함수
     */
    startProgress: function startProgress(succCallback) {
      var $percent = this.els.$percent;
      var $progressBar = this.els.$progressBar;
      var count = 0;
      var interval = setInterval(function () {
        count += 10;
        $percent.html(count);
        $progressBar.css('width', count + '%');
        if (count == 100) {
          clearInterval(interval); // 반복 실행을 멈춘다.
          succCallback();
        }
      }, 50); // 반복적으로 함수를 실행시켜준다.
    },
    moveLoginPage: function moveLoginPage() {
      $.movePage({
        url: "./login.html",
        actionType: "CLEAR_TOP"
      });
    },
    moveMainPage: function moveMainPage() {
      $.movePage({
        url: "./main.html",
        actionType: "CLEAR_TOP"
      });
    },
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      var existLoginData = $.storage.getAuth();
      if (!$.isEmpty(existLoginData)) {
        this.startProgress(function () {
          $.sendHttp({
            path: SERVER_PATH.LOGIN,
            data: {
              loginId: existLoginData.id,
              password: existLoginData.pw
            },
            succ: function (data) {
              // 로그인이 성공했을때 콜백
              self.moveMainPage();
            },
            error: function () {
              self.moveLoginPage();
            },
          });
        });
      } else {
        this.startProgress(this.moveLoginPage);
      }

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
    }
  };

  window.__page__ = page;
})(jQuery, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  // 화면에 리소스가 로딩을 끝내고 정상적으로 동작할 수 있는 시점에 대한 콜백
  // window.onload 와 비슷함.
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
  });

})(jQuery, M, __page__, window);