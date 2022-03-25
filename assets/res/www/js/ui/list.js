/**
 * @file : 리스트 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $back: null,
      $announcementWrite: null,
      $announcementMore: null,
      $btnTop: null,
     

    },
    data: {},
    init: function init() {
      this.els.$back = $('#back'); // input
      this.els.$announcementWrite = $('#announcementWrite');
      this.els.$announcementMore = $('#btn-point-color');
      this.els.$btnTop = $('#btnTop');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
   
      
        var self = this;
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_LIST,
          data: {
            "loginId": M.data.global('userIdSend'),
            "lastSeqNo" : "100000000",
            "cnt" : "100",
          },
          succ: function (data) {
            var items = "";
            $.each(data.list, function (index, item) {
              items += "<li>";
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
            
            $(".metro-wrap").html(items); 
            
                
            
          },
          error: function (data) {
            console.log(data);
            alert(" 틀렸습니다.");
          }
        });
     

    },

    

    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작
      //뒤로가기
      var self = this;
      this.els.$back.on('click', function () {
        M.page.html('./main.html');
      })
      // 게시글 작성하기  버튼 동작
      this.els.$announcementWrite.on('click', function () {
        M.page.html('./write.html');
      })
      // 더보기 버튼 동작
      this.els.$announcementMore.on('click', function (e) {
        self.moreBtn();
      })
      // btnTop 누르면 위로 올라가는 버튼
      this.els.$btnTop.on('click', function () {
          self.top();
      })


    },
    
  
    moreBtn: function(){

      // Load More를 위한 클릭 이벤트e
      e.preventDefault();
      $(".cont-wrap").slice(0, 10).show(); // 숨김 설정된 다음 10개를 선택하여 표시
      if($(".cont-wrap").length == 0){ // 숨겨진 항목이 있는지 체크
      alert("더 이상 항목이 없습니다"); // 더 이상 로드할 항목이 없는 경우 경고
      }
    },
      


    top : function () {
      $('.cont-wrap').scrollTop(0);
    
      
    
    },
    

    

  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);