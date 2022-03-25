/**
 * @file : main.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var seqNo = [];
  var page = {
    els: {
      $dataMore: null,
//      $ellipsis: null,
      $menuBtn : null,
      $noticeBtn : null,
    },
    data: {},
    init : function init() {
      this.els.$dataMore = $('.btn-txt'); //공지사항 모두 보기
//      this.els.$ellipsis = $('.ellipsis'); //터치된 항목의 상세정보
      this.els.$menuBtn = $('.btn-menu'); // 회원정보 수정
      this.els.$noticeBtn = $('.main-menu-box li:last'); //공지사항
    },
    
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      var id = M.data.global("loginId");
      var num = "0";
      var cnt = "4";

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
            items += "<li class='ellipsis' id='notice'";
            items += index + "'>";
            items += item.title;
            items += "</li>";
            seqNo[index] = item.seqNo;
            
//            M.data.global("num", item.seqNo);
            $(".ellipsis").attr("id" + "notice"+index);
          });
          $(".noti-wrap").html(items);
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
      this.els.$dataMore.on('click', function(){
        M.page.html('./list.html');
      });
      $(".ellipsis").on('click', "#notice0", function(){
//        self.detail();
          M.data.global("seqNo", seqNo[0]);
          M.page.html('./detail.html');
      });
      $(".ellipsis").on('click', "#notice1", function(){
        M.data.global("seqNo", seqNo[1]);
        M.page.html('./detail.html');
      });
      $(".ellipsis").on('click', "#notice2", function(){
        M.data.global("seqNo", seqNo[2]);
        M.page.html('./detail.html');
      });
      $(".ellipsis").on('click', "#notice3", function(){
        M.data.global("seqNo", seqNo[3]);
        M.page.html('./detail.html'); 
      });
      this.els.$menuBtn.on('click', function() {
        self.info();
      });
      this.els.$noticeBtn.on('click', function() {
        M.page.html('./list.html');
      });
      
    },
    
    info:function(){
      var self = this;
      var id = M.data.global("loginId");
      MNet.sendHttp({
        path: SERVER_PATH.INFO,
        data:{
          loginId : id
        },
        succ: function(data){
          console.log(data);
            M.page.html({
              path: './userInfo.html'
            });
        },
        error:function(){
          console.log(data);
          return alert('에러');
        }
      });
    },
    
    detail:function(){
      var self = this;
      var id = M.data.global("loginId");
      var num = M.data.global("num");
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