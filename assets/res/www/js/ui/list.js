/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M,MNet, module, config, SERVER_PATH, window){

  var page = {
    els:  {
      $btnModify : null,
      $btnTop : null,
      $infoDetail : null,
      $btnWrap : null,
    },
    data: {
      lastSeqNum : null,
    },
    init: function init(){
      this.els.$btnModify = $('#btn-modify');
      this.els.$btnTop = $('.btn-top');
      this.els.$infoBox = $('#info-detail');
      this.els.$btnWrap = $('#btn-more');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      // 화면에서 세팅할 동적데이터
      var self = this;
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('id'),
          "lastSeqNo": '1000000',
          "cnt": '6',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          self.data.lastSeqNum = data.lastSeqNo;
          console.log(self.data.lastSeqNum);
          $.each(data.list, function (index, item) {
            console.log(item);
            console.log(item.imgUrl);
            items += "<li id='"+ item.seqNo +"' class ='test'>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            items += "<img src='" +item.imgUrl +" ' alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            items += "<img src= '" + item.imgUrl + "' alt='50%'/>";
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
          });
          $("#card").append(items);
        },
        error: function (data) {
          console.log(data);
          alert("리스트를 가져오지 못했습니다.");
        },
      });

    },
    initEvent : function initEvent(){
      var self = this;
      var id = M.data.global('id');
      M.data.param({'cnt' : '0'});
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      this.els.$btnModify.on('click', function(){
        M.page.html('./write.html');
      });
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      $('#card').on('click', '.test', function( ) {
        var seqNo = $(this).attr('id' );
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: id,
            seqNo	: seqNo,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              M.page.html('./detail.html',{param : {seqNo	: seqNo}} );
            } else {
              alert('페이지를 열 수 없습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
      });
      /*  
        $('.wrapper').on('click', '.test', function( ) {
          var seqNo = $(this).attr('id' );
          alert(seqNo);
        });
      */
      this.els.$btnWrap.on("click", function(){
        console.log('클릭');
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_LIST,
          data: {
            "loginId": M.data.global('id'),
            "lastSeqNo": self.data.lastSeqNum,
            "cnt": '6',
          },
          succ: function (data) {
            var items = "";
            self.data.lastSeqNum = data.lastSeqNo;
            console.log(self.data.lastSeqNum);
            $.each(data.list, function (index, item) {
              items += "<li id='"+ item.seqNo +"' class ='test'>";
              items += "<div class='thumbnail-wrap'>";
              items += "<div class='thumbnail'>";
              items += "<img src='" +item.imgUrl +" ' alt=''/>";
              items += "</div>";
              items += "<span class='label-info none'>";
              items += "<img src= '" + item.imgUrl + "' alt='50%'/>";
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
            $("#card").append(items);
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
})(jQuery, M,__mnet__, __util__, __config__, __serverPath__,  window);
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