/**
 * @file : 공지리스트
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $writeBtn: null,
      $back: null,
      $moreBtn: null,
      $detail: null,
      $btnTop: null,
    },
    data: {
      requset: {
        loginId: M.data.global('userId'),
        lastSeqNo: '0',
        cnt: '6'
      },
    },
    init: function init() {
      this.els.$writeBtn = $('#writeBtn');
      this.els.$moreBtn = $('#moreBtn');
      this.els.$back = $('#back');
      this.els.$detail = $('.metro-wrap');
      this.els.$btnTop = $('.btn-top');

    },
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      this.drawNoticeList()
    },
    drawNoticeList: function () {
      // 공지 리스트 보여주기 
      var self = this;
      $.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          self.data.requset.lastSeqNo = data.lastSeqNo;
          $.each(data.list, function (index, item) {
            items += "<li data-seq='" + item.seqNo + "'>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            if (item.imgUrl) {
              items += "<img src='";
              items += item.imgUrl;
              items += "' alt=''/>";
            }
            items += "</div>";
            items += "<span class='label-info none'>";
   
            items += "</span>";
            items += "</div>";
            items += "<div class='info-box'>";
            items += "<div class='info-box-top'>";
            items += "<strong class='ellipsis_1'>";
            items += item.title;
            items += "</strong>";
            items += "<div class='info-box-btm'>";
            items += "<p style='text-align:left;' class='ellipsis_1'>";
            items += item.content;
            items += "</p>";
            items += "</div>";
            items += "</div>";
            items += "</li>";
          });
          $(".metro-wrap").append(items);
        },
        error: function (data) {
          $(".btn-wrap").css("display", "none");
          alert("에러");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$writeBtn.on('click', function () {
        M.page.html("./write.html");
      })
      this.els.$back.on('click', function () {
        M.page.back();
      })
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      })
      this.els.$moreBtn.on('click', function () {
        self.drawNoticeList()
      })

      $('.metro-wrap').on('click', 'li', function () {
        console.log(this)
        var seqNo = $(this).attr('data-seq');
        console.log(seqNo);
        M.data.global("seqNo", seqNo)
        $.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("userId"),
            seqNo: M.data.global("seqNo")
          },
          succ: function (data) {
            M.page.html('./detail.html');
          }
        });
      })
    },
  };

  window.__page__ = page;
})(jQuery, M, __config__ , window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);