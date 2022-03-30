/**
 * @file : list.js
 * @author : 김소담
 * @date : 2022-03-24
 */

(function ($, M, CONFIG, window) {
    var SERVER_PATH = CONFIG.SERVER_PATH;
    var page = {
      els: {
        $moreBtn: null,
        $topBtn: null,
        $writeMenu: null
      },
      data: {},
      init: function init() {
        this.els.$moreBtn = $('.btn-wrap');
        this.els.$topBtn = $('.btn-top');
        this.els.$writeMenu = $('.btn-modify');
      },
      initView: function initView() {
        // 화면에서 세팅할 동적 데이터
        $.sendHttp({
          path: SERVER_PATH.NOTICE_LIST,
          data: {
            loginId: M.data.global("loginId"),
            lastSeqNo: "0",
            cnt: "6"
          },
          succ: function (data) {
            for (var i = 0; i < 6; i++) {
              $("strong.ellipsis_1:eq(" + i + ")").html(data.list[i].title);
              $("p.ellipsis_1:eq(" + i + ")").html(data.list[i].content);
              $(".li:eq("+i+")").attr('id', data.list[i].seqNo);
              if ("imgUrl" in data.list[i]) {
                $(".thumbnail img:eq(" + i + ")").attr('src', data.list[i].imgUrl);
              }
            }
            M.data.param("lastSeqNo", data.lastSeqNo);
          },
          error: function () {}
        });
      },
      initEvent: function initEvent() {
        // DOM Event 바인딩
        $('.metro-wrap').on('click', 'li', function () {
          var seqNo = $(this).attr('id');

          console.log(seqNo);

          M.data.global({
            'seqNo': seqNo
          });
          console.log(M.data.global('seqNo'));
          M.page.html({
            url: './detail.html',
            action: 'NO_HISTORY',
          });
        }),
    this.els.$moreBtn.on('click', function () {
      $.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          loginId: M.data.global("loginId"),
          lastSeqNo: M.data.param("lastSeqNo"),
          cnt: "6"
        },
        succ: function (data) {
          for (var i = 0; i < 6; i++) {
            if ("imgUrl" in data.list[i]) {
              $(".pd").append("<li id='" + data.list[i].seqNo + "'><div class='thumbnail-wrap'><div class='thumbnail'><img src='" + data.list[i].imgUrl + "' alt=''/></div></div><div class='info-box'><div class='info-box-top'><strong class='ellipsis_1'>" + data.list[i].title + "</strong></div><div class='info-box-btm'><p style='text-align:left;' class='ellipsis_1'>" + data.list[i].content + "</p></div></div></li>");
            } else {
              $(".pd").append("<li id='" + data.list[i].seqNo + "'><div class='thumbnail-wrap'><div class='thumbnail'><img src='' alt=''/></div></div><div class='info-box'><div class='info-box-top'><strong class='ellipsis_1'>" + data.list[i].title + "</strong></div><div class='info-box-btm'><p style='text-align:left;' class='ellipsis_1'>" + data.list[i].content + "</p></div></div></li>");
            }
          }
          M.data.param("lastSeqNo", data.lastSeqNo);
        },
        error: function () {}
      });
    });
    this.els.$topBtn.on('click', function () {
      $('.cont-wrap').scrollTop(0);
    });
    this.els.$writeMenu.on('click', function () {
      M.page.html('./write.html');
    });
  },

  //    method: {},
};
window.__page__ = page;
})(jQuery, M, __config__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);