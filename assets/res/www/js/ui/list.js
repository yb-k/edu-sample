/**
 * @file : list.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
var SERVER_PATH = CONFIG.SERVER_PATH;
  var seqNo=''; 
  var id = M.data.global("loginId");  
  var seqNum;
  var cnt = "6";
  M.data.removeGlobal('seqNum');
  M.data.removeGlobal('imgUrl');
  M.data.removeGlobal('imgName');
  
  var page = {
    els: {
      $writeBtn: null,
      $topBtn: null,
      $moreBtn: null,
      $detailCon: null
    },
    data: {},
    init : function init() {
      this.els.$writeBtn = $('.btn-modify');
      this.els.$topBtn = $('.btn-top');
      this.els.$detailCon = $('.thumbnail-wrap');
      this.els.$moreBtn = $('#moreBtn');
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      var id = M.data.global("loginId");
      var num = "0";
      var cnt = "6";
      
      $.sendHttp({
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
            items += "<img src='";
            items += item.imgUrl;
            items += "' id ='imgUrl' alt=''/>";
            items += "<span class='label-info none'>";
            items += "<img src='";
            items += item.imgUrl;
            items += "' id ='imgUrl' alt='50%'/>";
            items += "</span>";
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
            seqNum = item.seqNo
            console.log(seqNum);
            console.log(item.imgUrl);
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
      
      this.els.$topBtn.on("click", function () {
        $('.cont-wrap').scrollTop(0);
      });
      
      this.els.$moreBtn.on("click", function () {
        $.sendHttp({
          path: SERVER_PATH.NOTICE_LIST,
          data:{
            "loginId" : id,
            "lastSeqNo" : seqNum,
            "cnt" : "6"
          },
          succ: function(data){
            console.log(data);
            var items = "";
            $.each(data.list, function(index, item) {
            cnt = 6;
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
              cnt -= 1;   
              $(".thumbnail-wrap").attr("id" + "notice"+index);
              seqNum = item.seqNo
              console.log(seqNum);
            });
            $(".metro-wrap").append(items);
            if(cnt == 0 || seqNum <= 6){
              document.getElementById("moreBtn").style.display = "none";
            }
          },
          error: function(data){
            console.log(data);
            alert('리스트를 불러오지 못했습니다.');
          }
        })
      });
      
      $(".metro-wrap").on('click', "li", function(){
        var seq = $(this).attr("data-seq");
        M.data.global('seqNum', seq)
        console.log(seq);
        $.sendHttp({
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
            return alert('상세페이지를 불러오지 못했습니다.');
          }   
        });
      })
    },
    
    detail:function(){
      var self = this;
      var id = M.data.global("loginId");
      $.sendHttp({
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
          return alert('상세페이지를 불러오지 못했습니다.');
        }
      });
    }
  };
  
  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);