/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: {
      $nextBtn:null,
      $allchkBtn:null,
      $chk2:null,
      $chk3:null,
      $chk4:null,
      
    },
    data: {},
    init : function init() {
      this.els.$nextBtn = $('#nextBtn');
      this.els.$allchkBtn = $('#chk1');
      this.els.$chk2 = $('#chk2');
      this.els.$chk3 = $('#chk3');
      this.els.$chk4 = $('#chk4');
      
    },
   
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
    },
    
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      
      this.els.$nextBtn.on('click', function() {
         M.page.html('./join2.html');
      });
      
      this.els.$allchkBtn.on('click', function(){
        if(this.els.$allchkBtn.prop('checked')) {
          this.els.$chk2.prop("checked", true);
          this.els.$chk3.prop("checked", true);
          this.els.$chk4.prop("checked", true);
        } else {
          this.els.$chk2.prop("checked", false);
          this.els.$chk3.prop("checked", false);
          this.els.$chk4.prop("checked", false);
        }
      });
      
    },
    
    
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