/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window) {
  
  var id;
  var seqNum='0';
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
      this.els.$dataMore = $('.btn-point-color');
      this.els.$btnModify = $('.btn-modify');
      this.els.$btnTop = $("button[class='btn-top']");
      

    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터

      if (M.data.storage("AUTO_LOGIN_AUTH")) {
        id = M.data.storage("AUTO_LOGIN_AUTH").id;
      } else {
        id = M.data.global("userId");
      }

      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          loginId: id,
          lastSeqNo: seqNum,
          cnt: "6",
        },
        succ: function (data) {
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li data='" + item.seqNo + "' class='numSend'>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            // items += "<img src='";
            // items += item.imgUrl;
            // items += "' alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            // items += "<img src='";
            // items += item.imgUrl;
            // items += "' alt='50%'/>";
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
          $(".metro-wrap").append(items);
          
        },
        error: function (data) {
          $(".btn-point-color").css("display", "none");
          console.log(data);
        }
      });

     
    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      var self = this;
      self.els.$btnBack.on('click', function () {
        M.page.back();
      });
      self.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      self.els.$dataMore.on('click', function (){
        self.initView();
      });
      this.els.$btnModify.on('click', function (){
        M.page.html('write.html');
      });
    },

 

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