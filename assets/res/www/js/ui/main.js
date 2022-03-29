/**
 * @file : 메인 (상세보기 추가)
 * @author : 김예은
 * @date : 22.03.25
 */

(function ($, M, CONFIG, window) {

  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  
  var seqNo = [];
  var page = {
    els: {
      $notice: null,
      $allBtn: null,
      $writeBtn: null,
      $ellipsis : null
    },
    data: {},
    init: function init() {
      this.els.$notice = $('#notice');
      this.els.$allBtn = $('#allBtn');
      this.els.$infoModifyBtn = $('#infoModifyBtn');
      this.els.$ellipsis = $('li.ellipsis');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
     
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      $.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('userId'),
          "lastSeqNo": "0",
          "cnt": "4",
        },
        succ: function (data) {
          $('li.ellipsis:eq(0)').text(data.list[0].title);
          $('li.ellipsis:eq(1)').html(data.list[1].title);
          $('li.ellipsis:eq(2)').html(data.list[2].title);
          $('li.ellipsis:eq(3)').html(data.list[3].title);

          for (var i = 0 ; i < 4 ; i++){
            seqNo[i] = data.list[i].seqNo;
          }
        },
        error: function (data) {alert("에러");}
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
      this.els.$ellipsis.on('click', function(){
        for (var i=0; i<4; i++) {
          // 클릭한 게시글의 index에 따라 seqNo을 global변수로 준다 (수정,삭제를 위해)
          if ($(this).index() == i) {
            M.data.global("seqNo", seqNo[i]);
            M.page.html({
              url : "./detail.html",
              action : "NO_HISTORY" 
            })
          }
        }
      })
      
    },
    
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
// 해당 화면으로 다시 돌아왔을 때 데이터 갱신 
  M.onRestore(function () {
    pageFunc.initView();
  });
})(jQuery, M, __page__, window);