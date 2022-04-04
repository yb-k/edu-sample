/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  M.data.removeGlobal('seqNo');
  var seqNo = [];
  var page = {
    els: {
      $userMenuBtn: null,
      $allViewBtn: null,
      $noticeBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$userMenuBtn = $('#userMenu-btn');
      this.els.$allViewBtn = $('#allView-btn');
      this.els.$noticeBtn = $('#notice-btn');
    },

    initView: function initView() {
      var self = this;
      // 화면에서 세팅할 동적데이터
      console.log(M.data.global('seqNo'));
      $.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('loginId'),
          "lastSeqNo": '0',
          "cnt": '4',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li class='ellipsis' id='notice" + index + "'>";
            items += item.title;
            items += "</li>";
            seqNo[index] = item.seqNo;
          });
          $("#noti-list").html(items);
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

      this.els.$userMenuBtn.on('click', function () {
        M.page.html({
          url: './userInfo.html',
          action: 'NO_HISTORY',
        });
      });
      this.els.$allViewBtn.on('click', function () {
        M.page.html({
          url: './list.html',

        });
      });
      this.els.$noticeBtn.on('click', function () {
        M.page.html({
          url: './list.html',

        });
      });
      $('#noti-list').on('click', '#notice0', function () {

        M.data.global("seqNo", seqNo[0]);
        M.page.html({
          url: './detail.html',
          action: 'NO_HISTORY'
        });
      });
      $('#noti-list').on('click', '#notice1', function () {

        M.data.global("seqNo", seqNo[1]);
        M.page.html({
          url: './detail.html',
          action: 'NO_HISTORY'
        });
      });
      $('#noti-list').on('click', '#notice2', function () {

        M.data.global("seqNo", seqNo[2]);
        M.page.html({
          url: './detail.html',
          action: 'NO_HISTORY'
        });
      });
      $('#noti-list').on('click', '#notice3', function () {
 
        M.data.global("seqNo", seqNo[3]);
        M.page.html({
          url: './detail.html',
          action: 'NO_HISTORY'
        });
      });
    },
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
  M.onRestore(function () {
    pageFunc.initView();
  });
})(jQuery, M, __page__, window);