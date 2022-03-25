/**
 * @file : main.js
 * @author : 강샛별
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
      els: {
        $noti : null, 
        $notiAllList : null,
        $notiPage : null,
        $menuBtn : null
      },
      data: {},
      init : function init() {
        this.els.$noti = $('.ellipsis');
        this.els.$notiAllList = $('.btn-txt');
        this.els.$notiPage = $('.main-menu-box li:last');
        this.els.$menuBtn = $('.btn-menu');
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$noti.on('click', function(){
           self.noti();
        });
        this.els.$notiAllList.on('click', function(){
           self.notiAllList();
        });
        this.els.$notiPage.on('click', function(){
           self.notiPage();
        });
        this.els.$menuBtn.on('click', function(){
           self.menuBtn();
        });
                
      },
      noti : function() {
        M.page.html('./detail.html');
      },
      notiAllList : function() {
        M.page.html('./list.html');
      },
      notiPage : function() {
        M.page.html('./list.html');
      },
      menuBtn : function() {
        M.page.html('./userInfo.html');
      }
            
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);