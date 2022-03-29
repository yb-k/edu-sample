/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els:  {
      $btnOrder : null,
    },
    data: {},
    init: function init(){
      this.els.$btnOrder = $('#btn-order');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      console.log(M.data.global('id'));
      console.log(M.data.storage('AUTO_LOGIN_AUTH'));
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('id'),
          "lastSeqNo": '0',
          "cnt": '10000000',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<tr id='"+ item.seqNo +"' class ='test'>";
            items += "<th>";
            items += "<input type='checkbox' id='"+ item.seqNo +"' name='color' class='chk-03' />";
            items += "</th><td>";
            items += item.title;
            items += "</td><td>";
/*            items += "<input type='button' class='btn-plus' onclick='count("plus")' value='+'/>";
            items += "<span id='result'>0</span>";
            items += "<input type='button' class='btn-minus' onclick='count("minus")' value='-'/>";*/
            items += item.title;
            items += "</td><td>";
            items += item.title;
            items += "</td></td>";;
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
      var self= this;
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      this.els.$btnOrder.on('click', function(){
        M.page.html('./fpayment.html');
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverPath__,__difinition__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);