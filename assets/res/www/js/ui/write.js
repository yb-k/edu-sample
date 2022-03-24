/**
 * @file : write.js 게시글 작성 페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

 (function ($,M,window){
    var page = {
      els:{
          $title: null,
          $content: null,
          $imgsrc: null,
          $imgBtn: null,
          $writeBtn: null,
      },
      data: {},
      init: function init(){
          this.els.$title = $('#title');
          this.els.$content = $('#content');
          this.els.$imgsrc = $('#imgsrc');
          this.els.$imgBtn = $('#imgBtn');
          this.els.$writeBtn = $('#writeBtn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        //이미지 첨부
        this.els.$imgBtn.on('click', function(){
            self.imgUpload();
        });
        //게시글 작성
        this.els.$writeBtn.on('click', function(){
            self.writeContent();
        });
      },
      
      imgUpload: function(){
        
      },

      writeContent: function(){
        var title = this.els.$title.val().trim();
        var content = this.els.$title.val().trim();
        
      }
      
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