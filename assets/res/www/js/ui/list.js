/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window) {


  var page = {
    els: {
      $btnTop: null,
      $btnBack: null,
      $btnModify: null,
      $dataMore: null,



    },
    data: {},
    init: function init() {
      this.els.$btnBack = $('.btn-back');
      this.els.$dataMore = $("[data-more]");
      this.els.$btnModify = $("button[class='btn-modify r-fix']");
      this.els.$btnTop = $("button[class='btn-top']");

    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var id;
      if (M.data.storage("AUTO_LOGIN_AUTH")) {
        id = M.data.storage("AUTO_LOGIN_AUTH").id;
      } else {
        id = M.data.global("userId");
      }

      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          loginId: id,
          lastSeqNo: "100000",
          cnt: "6"
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
        error: function(data){
          alert("에러임");
        },

      });


    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      var self = this;
      self.els.$btnBack.on('click', function () {
        M.page.back();
      });
      self.els.$btnTop.on('click', function () {
        $('html').scrollTop(0);
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);