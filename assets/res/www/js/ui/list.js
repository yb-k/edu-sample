/**
 * @file : list.js
 * @author : 김소담
 * @date : 2022-03-24
 */

 (function ($,M,window){
    var page = {
      els:{
          $imgList : null,
          $moreBtn : null,
          $topBtn : null,
          $writeMenu : null
      },
      data: {},
      init: function init(){
          this.els.$imgList = $('.pd');
          this.els.$moreBtn = $('.btn-wrap');
          this.els.$topBtn = $('.btn-top');
          this.els.$writeMenu = $('.btn-modify');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
        document.querySelector('.none').style.setProperty('display', 'block', 'important');
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        this.els.$imgList.on('click', function() {
            M.page.html('./detail.html');
        });
        this.els.$moreBtn.on('click', function() {
            // 다음 페이지 항목 추가
        });
        this.els.$topBtn.on('click', function() {
            $(window).scrollTop(0);
        });
        this.els.$writeMenu.on('click', function() {
            M.page.html('./write.html');
        });
      },
      
  //    method: {},
    };
    window.__page__ = page;
  })(jQuery,M,window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);