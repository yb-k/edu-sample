/**
 * @file : list.js
 * @author : 강샛별
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, window){
  var page = {
      els: {
        $infoBox : null,
        $addBtn : null 
      },
      data: {},
      init : function init() {
        this.els.$infoBox = $('.info-box');
        this.els.$addBtn = $('.btn-point-color');
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$infoBox.on('click', function(){
           self.infoBox();
        });
        this.els.$addBtn.on('click', function(){
           self.addBtn();
        });
      },
      
      infoBox : function() {
        M.page.html('./detail.html');
      }
      addBtn : function() {
      
       });
       
      }
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);