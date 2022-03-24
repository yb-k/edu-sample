/**
 * @file : main.js
 * @author : 김소담
 * @date : 2022-03-24
 */

 (function ($,M,window){
    var page = {
      els:{
          $ellipsis : null,
          $allNoticeBtn: null,
          $menuBtn : null,
          $noticeBtn : null,

      },
      data: {},
      init: function init(){
          this.els.$ellipsis = $('.ellipsis'); // 최근 공지사항 목록
          this.els.$allNoticeBtn = $('.main-box-03 .tit-wrap .btn-txt'); // 모두보기
          this.els.$menuBtn = $('.btn-menu'); // 상단 메뉴 (회원수정)
          this.els.$noticeBtn = $('.main-menu-box li:last'); // 공지사항
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        this.els.$ellipsis.on('click', function() {
            alert($(this).text());
        });
        this.els.$allNoticeBtn.on('click', function() {
            M.page.html('./list.html');
        });
        this.els.$menuBtn.on('click', function() {
            M.page.html('./userInfo.html');
        });
        this.els.$noticeBtn.on('click', function() {
            M.page.html('./list.html');
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