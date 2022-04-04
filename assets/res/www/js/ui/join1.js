/**
 * @file : join1.js
 * @author : 박고은 
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
      els: {
        $chk1 : null,
        $chk2 : null,
        $chk3 : null,
        $chk4 : null,
        $nextBtn : null
      },
      data: {},
      init : function init() {
        this.els.$chk1 = $('#chk1');
        this.els.$chk2 = $('#chk2');
        this.els.$chk3 = $('#chk3');
        this.els.$chk4 = $('#chk4');
        this.els.$nextBtn = $('#nextBtn');
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$chk1.on('click', function(){
           self.chk1();
        });      
        this.els.$nextBtn.on('click', function(){
           self.nextBtn();
        });
      },
     
      chk1 : function(){
        if(this.els.$chk1.prop('checked')) {
           return $("input:checkbox[class='chk']").prop("checked", true);
        }else {
           return $("input:checkbox[class='chk']").prop("checked", false);
        }
      },   
    
      nextBtn : function() {
        if(this.els.$chk2.prop('checked') && this.els.$chk3.prop('checked')) {
          return M.page.html("./join2.html");
        }else {
          alert("필수 약관에 동의하셔야 합니다.");
        }
      }
    
  };
  
  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
  
})(jQuery, M, __page__, window);