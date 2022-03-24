/**
 * @file : list.js 공지사항 리스트 페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

 (function ($,M,window){
    var page = {
      els:{
          $writeBtn: null,
          $infoBox: null, //이거 클래스여
          $viewMoreBtn: null,
          $topBtn: null
      },
      data: {},
      init: function init(){
          this.els.$writeBtn = $('#writeBtn');
          this.els.$infoBox = $('.infoBox');
          this.els.$viewMoreBtn = $('#viewMoreBtn');
          this.els.$topBtn = $('#topBtn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        //게시글 작성
        this.els.$writeBtn.on('click', function(){
            M.page.html("./write.html");
        });
        //
        this.els.$infoBox.on('click', function(){
            M.page.html("./detail.html");
        });
        this.els.$viewMoreBtn.on('click', function(){
            //멀... 멀 더 보여주는데
        });
        this.els.$topBtn.on('click', function(){
            //목록 맨위로 버튼
        })
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