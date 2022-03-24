/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var seqNum;
  var page = {
    els: {
      $writeBtn: null,
      $topBtn: null,
      $moreBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$writeBtn = $('#write-btn');
      this.els.$topBtn = $('#top-btn');
      this.els.$moreBtn = $('#more-btn');

    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('myId'),
          "lastSeqNo": '100000000000', //물어보기,,
          "cnt": '6',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            //            items += "<img src=";
            //            items += item.imgUrl;
            //            items += "alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            //            items += "<img src=" ;
            //            items += item.imgUrl;
            //            items += "alt='50%'/>";
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
            seqNum = item.seqNo;
          });
          $("#card").html(items);
        },
        error: function (data) {
          console.log(data);
          alert("리스트를 가져오지 못했습니다.");
        },
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$writeBtn.on('click', function () {
        M.page.html('./write.html');
      });

      this.els.$topBtn.on("click", function () {
        $('.cont-wrap').scrollTop(0);
      });
      
      this.els.$moreBtn.on("click", function () {
        
      });
      
    },
  };

  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);