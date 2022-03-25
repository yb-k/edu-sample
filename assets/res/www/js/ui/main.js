/**
 * @file : main.js 메인페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

(function ($, M, SERVER_PATH, MNet, window) {
  var seqNo = [];
  var page = {
    els: {
      $menuBtn: null,
      $noticeListBtn1: null,
      $noticeListBtn2: null,
      $ellipsis: null
    },
    data: {},
    init: function init() {
      this.els.$menuBtn = $('#menuBtn');
      this.els.$ellipsis = $('li.ellipsis');
      this.els.$noticeListBtn1 = $('#noticeListBtn1');
      this.els.$noticeListBtn2 = $('#noticeListBtn2');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
      var self = this;
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_LIST,
          data:{
            loginId: M.data.global("loginId"),
            lastSeqNo: "0", 
            cnt: "4"
          },
          succ: function(data){
            $('li.ellipsis:eq(0)').html(data.list[0].title);
            $('li.ellipsis:eq(1)').html(data.list[1].title);
            $('li.ellipsis:eq(2)').html(data.list[2].title);
            $('li.ellipsis:eq(3)').html(data.list[3].title);

            for(var i = 0; i < 4; i++){
              seqNo[i] = data.list[i].seqNo;
            }
          }
      });
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      //공지사항 상세 페이지
      this.els.$ellipsis.on('click', function () {
        for(var i = 0; i < 4; i++){
          if($(this).index() == i){
            M.data.global("seqNo",seqNo[i]);
            M.page.html("./detail.html");
          }
        }
      });
      // 정보수정 페이지
      var self = this;
      this.els.$menuBtn.on('click', function () {
        M.page.html("./userInfo.html");
      });

      //공지사항 목록 페이지
      this.els.$noticeListBtn1.on('click', function () {
        M.page.html("./list.html");
      });
      this.els.$noticeListBtn2.on('click', function () {
        M.page.html("./list.html");
      });
    },

    

    //    method: {},
  };
  window.__page__ = page;
})(jQuery, M, __serverpath__, __mnet__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);