/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, SERVER_PATH, MNet, module, M, window) {
  var page = {
    els: {
      $btnModify: null,
      $contentUl: null,
      $contentWrapper: null,
      $moreData: null,
      $write : null,
      $topbutton : null,
      $lists : null,
    },
    data: {
      lastSeqNo: null
    },
    init: function init() {
      this.els.$btnModify = $('.btn-modify');
      this.els.$contentUl = $("[data-more]");
      this.els.$contentWrapper = $('#content-wrapper');
      this.els.$moreData = $('#more-data');
      this.els.$write = $('#write');
      this.els.$topbutton = $('#top-button');
      
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
      var _data = null;
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          loginId: M.data.global("LOGIN_INFO").id,
          lastSeqNo: "0",
          cnt: "6"
        },
        succ: function (data) {
          console.log(data)
          _data = data;
          self.data.lastSeqNo = data.lastSeqNo;
          $.each(data.list, function (index, item) {
            self.addItemToList(item);
          });
          self.els.$lists = $('.test');
          module.setEventWithParam($('.test'),'click','./detail.html',M.data.global("LOGIN_INFO").id);
        },
        error: function () {
          console.log('error');
        }
      });
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      self.els.$write.on('click',function (){
        M.page.html('./write.html');
      });
      self.els.$topbutton.on('click',function (){
        $('.cont-wrap').scrollTop(0);
      });
      self.els.$moreData.on('click', function () {
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_LIST,
          data: {
            loginId: M.data.global("LOGIN_INFO").id,
            lastSeqNo: self.data.lastSeqNo,
            cnt: "6"
          },
          succ: function (data) {
            self.data.lastSeqNo = data.lastSeqNo;
            $.each(data.list, function (index, item) {
              self.addItemToList(item);
            });
            self.els.$lists = $('.test');
            module.setEventWithParam($('.test'),'click','./detail.html',M.data.global("LOGIN_INFO").id);
          }
        })
      });
      
    },
    addItemToList: function (item) {
      var items = "";
      var url = item.imgUrl;
      console.log(url);
      items += "<li id='" + item.seqNo + "' class ='test'>";
      items += "<a>";
      items += "<div class='thumbnail-wrap'>";
      items += "<div class='thumbnail'>";
                  items += '<img style="height:100%"src="';
                  items += url;
                  items += '"';
                  items += "alt=''/>";
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
      items += "</a>";
      items += "</li>";
      $(this.els.$contentWrapper).append(items);
    }
  };
  window.__page__ = page;
})(jQuery, __serverpath__, __mnet__, __util__, M, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);