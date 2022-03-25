/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: {
      $dataMore: null,
      $ellipsis: null,
      $menuBtn : null,
      $noticeBtn : null,
      $noticeBtn : null,
    },
    data: {},
    init : function init() {
      this.els.$dataMore = $('.btn-txt'); //공지사항 모두 보기
      this.els.$ellipsis = $('.main-box-03 .tit-wrap .ellipsis'); //터치된 항목의 상세정보
      this.els.$menuBtn = $('.btn-menu'); // 회원정보 수정
      this.els.$noticeBtn = $('.main-menu-box li:last'); //공지사항
    },
    
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
    
      
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$dataMore.on('click', function(){
        M.page.html('./list.html');
      });
      this.els.$ellipsis.on('click', function(){
        M.page.html('./list.html');
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