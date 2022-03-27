/**
 * @file : list.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var seqNo=''; 
  var page = {
    els: {
      $writeBtn: null,
      $topBtn: null,
    },
    data: {},
    init : function init() {
      this.els.$writeBtn = $('.btn-modify');
      this.els.$topBtn = $('.btn-top');
      this.els.$detailCon = $('.thumbnail-wrap');
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      var id = M.data.global("loginId");
      var num = "0";
      var cnt = "6";
      
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data:{
          "loginId" : id,
          "lastSeqNo" : num,
          "cnt" : cnt
        },
        succ: function(data){
          console.log(data);
          var items = "";
          $.each(data.list, function(index, item) {
          //이미지 링크
            items += "<li data-seq='"+item.seqNo+"'>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            items += "<img src='>";
            items += item.imgUrl;
            items += "' alt=''/>";
            items += "</div>";
            items += "</div>";
          //제목
            items += "<div class='info-box'>";
            items += "<div class='info-box-top'>";
            items += "<strong class='ellipsis_1'>";
            items += item.title;
            items += "</strong>";
            items += "</div>";
          //내용
            items += "<div class='info-box-btm'>";
            items += "<p style='text-align:left;' class='ellipsis_1'>";
            items += item.content;
            items += "</p>";
            items += "</div>";
            items += "</div>";
            items += "</li>";
            
            $(".thumbnail-wrap").attr("id" + "notice"+index);
            console.log(item.seqNo);
          });
          $(".metro-wrap").html(items);
        },
        error: function(data){
          console.log(data);
          alert('에러가 발생하였습니다.');
        }
      })
      
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$writeBtn.on('click', function(){
        M.page.html('./write.html');
      });
      
      $(".metro-wrap").on('click', "li", function(){
        var seq = $(this).attr("data-seq");
        M.data.global('seqNum', seq)
        console.log(seq);
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("loginId"),
            seqNo: seq
          },
          succ: function(data){
          console.log(data);
          console.log(seq);
            M.page.html({
              path: './detail.html'
            });
          },
          error:function(){
            console.log(data);
            return alert('에러');
          }   
        });
      })
    },
    
    detail:function(){
      var self = this;
      var id = M.data.global("loginId");
      MNet.sendHttp({
        path: SERVER_PATH.INFO,
        data:{
          loginId : id,
          seqNo : num
        },
        succ: function(data){
          M.page.html({
            path: './detail.html'
          });
        },
        error:function(){
          console.log(data);
          return alert('에러');
        }
      });
    }
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);