/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
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
          MNet.sendHttp({
            path: SERVER_PATH.NOTICE_LIST,
            data: {
              "loginId": M.data.global('myId'),
              "lastSeqNo": '100000000000', //물어보기,,
              "cnt": '4',
            },        
            succ: function (data) {
              console.log(data);
              var items = "";
              $.each(data.list, function (index, item) {
                items += "<li class='ellipsis'>";
                items += item.title;
                items += "</li>";
                console.log(item.seqNo);
                $('.ellipsis').attr("id", "notice"+index);
                var asdf = $('.ellipsis').attr('id');
                console.log(asdf);
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
        M.page.html('./userInfo.html');
      });
      this.els.$allViewBtn.on('click', function () {
        M.page.html('./list.html');
      });
      this.els.$noticeBtn.on('click', function () {
        M.page.html('./list.html');
      });
      $('#noti-list').on('click', '.ellipsis', function () {
        M.page.html('./detail.html');
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