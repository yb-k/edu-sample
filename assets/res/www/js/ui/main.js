/**
 * @file : main.js
 * @author : 김소담
 * @date : 2022-03-24
 */
 
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var seqNo = [];
  var page = {
    els: {
      $ellipsis: null,
      $allNoticeBtn: null,
      $menuBtn: null,
      $noticeBtn: null,

    },
    data: {},
    init: function init() {
      this.els.$ellipsis = $('li.ellipsis'); // 최근 공지사항 목록
      this.els.$menuBtn = $('.btn-menu'); // 상단 메뉴 (회원수정)
      this.els.$noticeBtn = $('[data-more]'); // 공지사항
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
      var self = this;
      $.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          loginId: M.data.global("loginId"),
          lastSeqNo: "0",
          cnt: "4"
        },
        succ: function (data) {
          for(var i = 0; i < 4; i++) {
            $('li.ellipsis:eq('+i+')').text(data.list[i].title);
            seqNo[i] = data.list[i].seqNo;
          }
        },
        error: function () {}

      });

      console.log(seqNo);
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      this.els.$ellipsis.on('click', function () {
        for (var i = 0; i < 4; i++) {
          if ($(this).index() == i) {
            M.data.global("seqNo", seqNo[i]);
            M.page.html("./detail.html");
          }
        }
      });
      this.els.$menuBtn.on('click', function () {
        M.page.html('./userInfo.html');
      });
      this.els.$noticeBtn.on('click', function () {
        M.page.html('./list.html');
      });
    },

    //    method: {},
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