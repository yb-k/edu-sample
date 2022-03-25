/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet, SERVER_PATH, window){

  var page = {
    els:  {
      $btnTxt : null,
      $btnMenu : null,
      $btnTxt2 : null,
    },
    data: {},
    init: function init(){
      this.els.$btnTxt = $('.btn-txt');
      this.els.$btnMenu = $('#btn-menu');
      this.els.$btnTxt2 = $('#btn-txt2');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('id'),
          "lastSeqNo": '100000000000', //물어보기,,
          "cnt": '4',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li id='info-box'>";
            items += "<strong class='ellipsis_1'>";
            items += item.title;
            items += "</strong>";
            items += "</li>";
          });
          $("#noti-wrap").html(items);
        },
        error: function (data) {
          console.log(data);
          alert("리스트를 가져오지 못했습니다.");
        },
      });
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$btnTxt.on('click', function(){
        M.page.html('./list.html');
      });
      this.els.$btnTxt2.on('click', function(){
        M.page.html('./list.html');
      });
      this.els.$btnMenu.on('click', function(){
        M.page.html('./userInfo.html');
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);