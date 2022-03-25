/**
 * @file : 메인
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M, MNet, config, SERVER_PATH, window) {
  var seqNo = [];
  var page = {
    els: {
      $notice: null,
      $allBtn: null,
      $writeBtn: null,
      $ellipsis1 : null,
      $ellipsis2 : null,
      $ellipsis3 : null,
      $ellipsis4 : null
    },
    data: {},
    init: function init() {
      this.els.$notice = $('#notice');
      this.els.$allBtn = $('#allBtn');
      this.els.$infoModifyBtn = $('#infoModifyBtn');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('userId'),
          "lastSeqNo": "100000",
          "cnt": "4",
        },
        succ: function (data) {
          $(".ellipsis1").html(data.list[0].title);
          $(".ellipsis2").html(data.list[1].title);
          $(".ellipsis3").html(data.list[2].title);
          $(".ellipsis4").html(data.list[3].title);

          seqNo[0] = data.list[0].seqNo;
          seqNo[1] = data.list[1].seqNo;
          seqNo[2] = data.list[2].seqNo;
          seqNo[3] = data.list[3].seqNo;

        },
        error: function (data) {
          alert("에러");
        }
      });

      this.els.$notice.on('click', function () {
        M.page.html("./list.html");
      })
      this.els.$allBtn.on('click', function () {
        M.page.html("./list.html");
      })
      this.els.$infoModifyBtn.on('click', function () {
        M.page.html("./userInfo.html");
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