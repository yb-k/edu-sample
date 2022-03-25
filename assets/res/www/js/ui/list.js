/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M,MNet, config, SERVER_PATH, window){

  var page = {
    els:  {
      $btnModify : null,
      $btnTop : null,
      $infoBox : null,
      $btnWrap : null,
    },
    data: {},
    init: function init(){
      this.els.$btnModify = $('#btn-modify');
      this.els.$btnTop = $('.btn-top');
      this.els.$infoBox = $('#info-box');
      this.els.$btnWrap = $('.btn-wrap');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      // 화면에서 세팅할 동적데이터
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('id'),
          "lastSeqNo": '100000000000', //물어보기,,
          "cnt": '6',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li id='info-box'>";
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
          $("#card").html(items);
        },
        error: function (data) {
          console.log(data);
          alert("리스트를 가져오지 못했습니다.");
        },
      });

    },
    initEvent : function initEvent(){
      var cnt = 0;
      this.els.$btnModify.on('click', function(){
        M.page.html('./write.html');
      });
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      this.els.$infoBox.on("click", function(){
        M.page.html('./detail.html');
      });
      this.els.$btnWrap.on("click", function(){
        var cnt = cnt + 6;
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_LIST,
          data: {
            "loginId": M.data.global('id'),
            "lastSeqNo": '100000000000', //물어보기,,
            "cnt": cnt,
          },
          succ: function (data) {
            console.log(data);
            var items = "";
            $.each(data.list, function (index, item) {
              items += "<li id='info-box'>";
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
            $("#card").html(items);
          },
          error: function (data) {
            console.log(data);
            alert("리스트를 가져오지 못했습니다.");
          },
        });
      });
    }
  };
  window.__page__ = page;
})(jQuery, M,__mnet__, __config__, __serverPath__,  window);
/*
$.each(data.lists, function(index, item){
  items += "<tr>";
  items += "<td><a href='/'>"+ item.memberNum + "</a></td>";
  items += "<td>"+ item.memberNum +"</td>";
  items += "<td><input type='' name='' value='" + item.memberNum + "'></td>";
  items += "</tr>";    
})*/

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);