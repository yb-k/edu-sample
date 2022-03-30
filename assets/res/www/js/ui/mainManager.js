/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els:  {
      $btnOrder : null,
      $btnSales : null,
      $btnProduct : null,
    },
    data: {},
    init: function init(){
      this.els.$btnOrder = $('#btn-order');
      this.els.$btnSales = $('#btn-sales');
      this.els.$btnProduct = $('#btn-product');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
    },
    initEvent : function initEvent(){
      var self = this;
      $('.r-fix').on('click', function(){
        $('.position').attr('style', 'position: absolute; top:0;right:0px;bottom:0;transition:1s ease;');
      });
      $('.r-fix').on('blur', function(){
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
      });
      this.els.$btnOrder.on('click', function(){
        M.page.html('./order.html');
      });      
      this.els.$btnSales.on('click', function(){
        M.page.html('./sales.html');
      });      
      this.els.$btnProduct.on('click', function(){
        M.page.html('./list.html');
      });      
    }
  };
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverPath__,__difinition__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);