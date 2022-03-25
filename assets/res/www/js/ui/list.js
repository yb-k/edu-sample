/**
 * @file : 공지리스트
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M, MNet, config, SERVER_PATH, window) {
   
  var page = {
    els: { 
      $writeBtn : null,
      $back : null,
      $moreBtn : null,
      $detail : null,
      $btnTop : null,
    },
    data: {},
    init: function init() {
      this.els.$writeBtn = $('#writeBtn');
      this.els.$moreBtn = $('#moreBtn');
      this.els.$back = $('#back');
      this.els.$detail = $('.metro-wrap');
      this.els.$btnTop = $('.btnTop');

    },
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      // 공지 리스트 보여주기 
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('userId'),
          "lastSeqNo" : "0",
          "cnt" : "4",
        },
        succ: function (data) {
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
          });
          $(".metro-wrap").html(items);     
          
        },
        error: function (data) {
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
        M.page.html("./main.html");
      })
      this.els.$btnTop.on('click', function(){
       $('.cont-wrap').scrollTop(0);
      })
      this.els.$detail.on('click', function(){
        MNet.sendHttp({
          path : SERVER_PATH.NOTICE_DETAIL,
          data : {
            loginId : M.data.global("userId"),
            seqNo  : seqNo
          }
        });
        M.page.html("./detail.html");
      })
    },
  };

  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);