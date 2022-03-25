/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window){


  var page = {
    els:{
      $chk1: null,
      $chk2:null,
      $chk3: null,
      $chk4:null,
      $nextBtn:null,

    },
    data: {},
    init: function init(){
      this.els.$chk1 = $('#chk1');
      this.els.$chk2 = $('#chk2');
      this.els.$chk3 = $('#chk3');
      this.els.$chk4 = $('#chk4');
      this.els.$nextBtn = $('#nextBtn');
   
    },
    
   
    initView: function initView(){
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent(){
      // initEvent 바인딩
      var self = this;
      this.els.$chk1.on('click', function () {
        self.checkAll();
      });
      this.els.$nextBtn.on('click', function () {
        self.next();
      });

    },
    checkAll: function () {
      if (this.els.$chk1.is(':checked')) {
        $("input:checkbox[class='chk']").prop('checked', true);
      } else {
        $("input:checkbox[class='chk']").prop('checked', false);
      }
    },

    next: function(){
      if(this.els.$chk2.is(':checked') && this.els.$chk3.is(':checked')){
        M.page.html('./join2.html');
      }else{
        alert("필수 체크해주셈");
      }
    },
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window){
  M.onReady(function() {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);