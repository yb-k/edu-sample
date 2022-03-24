/**
 * @file : main.js
 * @author : 김소담
 * @date : 2022-03-24
 */
 
(function ($, M, MNet, config, SERVER_PATH, window) {
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
      this.els.$allNoticeBtn = $('.main-box-03 .tit-wrap .btn-txt'); // 모두보기
      this.els.$menuBtn = $('.btn-menu'); // 상단 메뉴 (회원수정)
      this.els.$noticeBtn = $('.main-menu-box li:last'); // 공지사항
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          loginId: M.data.global("loginId"),
          lastSeqNo: "0",
          cnt: "4"
        },
        succ: function (data) {
          $('li.ellipsis:eq(0)').text(data.list[0].title);
          $('li.ellipsis:eq(1)').text(data.list[1].title);
          $('li.ellipsis:eq(2)').text(data.list[2].title);
          $('li.ellipsis:eq(3)').text(data.list[3].title);

          for (var i = 0; i < 4; i++) {
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
      this.els.$allNoticeBtn.on('click', function () {
        M.page.html('./list.html');
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
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);