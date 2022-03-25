/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  M.data.removeGlobal('seqNo');
  var seqNum='';
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
      $.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('myId'),
          "lastSeqNo": '0', 
          "cnt": '6',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li class='noticeBoard' id='"+ item.seqNo +"'>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            items += "<img src='" +item.imgUrl +" ' alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            items += "<img src= '" + item.imgUrl + "' alt='50%'/>";
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
          $("#card").append(items);
          console.log(seqNum);
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
      
      $('#card').on('click','.noticeBoard', function () {
      var seqNo = $(this).attr('id');
      console.log(seqNo);
              
      M.data.global({'seqNo': seqNo});
      console.log(M.data.global('seqNo'));
      M.page.html('./detail.html');
      });

      this.els.$writeBtn.on('click', function () {
        M.page.html('./write.html');
      });

      this.els.$topBtn.on("click", function () {
        $('.cont-wrap').scrollTop(0);
      });
      
      this.els.$moreBtn.on("click", function () {
        var count = 6
        $.sendHttp({
                path: SERVER_PATH.NOTICE_LIST,
                data: {
                  "loginId": M.data.global('myId'),
                  "lastSeqNo": seqNum, 
                  "cnt": '6',
                },
                succ: function (data) {
                  console.log(data);
                  var items = "";
                  $.each(data.list, function (index, item) {
                    items += "<li class='noticeBoard' id='"+ item.seqNo +"'>";
                    items += "<div class='thumbnail-wrap'>";
                    items += "<div class='thumbnail'>";
                    items += "<img src= '" + item.imgUrl + "'alt=''/>";
                    items += "</div>";
                    items += "<span class='label-info none'>";
                    items += "<img src='" + item.imgUrl + "'alt='50%'/>";
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
                    count -= 1;
                    seqNum = item.seqNo;
                    console.log(count);
                  });
                  $("#card").append(items);
                  console.log(seqNum);
                  if(count != 0) {
                    document.getElementById("more-btn").style.display = "none";
                  }
                },
                error: function (data) {
                  console.log(data);
                  alert("리스트를 가져오지 못했습니다.");
                },
              });
      });
      
    },
  };

  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);