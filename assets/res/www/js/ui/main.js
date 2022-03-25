/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지단위 모듈
(function ($, M, window){


  var page = {
    els:{
      $dataMore : null,
      $btnMenu: null,


    },
    data: {},
    init: function init(){
      this.els.$btnMenu =  $("button[class='btn-menu r-fix']");
      this.els.$dataMore = $("[data-more]");

    },
    
   
    initView: function initView(){
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent(){
      // initEvent 바인딩
      this.els.$btnMenu.on('click', function(){
        M.page.html('./userInfo.html');

      });

      this.els.$dataMore.on('click', function(){
        M.page.html('./list.html');
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window){
  M.onReady(function() {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);