/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, window){

  var page = {
    els:  {
      $chk1: null,
      $chk2: null,
      $chk3: null,
      $chk4: null,
      $nextBth: null
    },
    data: {},
    init: function init(){
      this.els.$chk1 = $('#chk1');
      this.els.$chk2 = $('#chk2');
      this.els.$chk3 = $('#chk3');
      this.els.$chk4 = $('#chk4');
      this.els.$nextBth = $('#nextBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      $('.l-fix').on('click', function(){
        M.page.back();
      });
    },
    initEvent : function initEvent(){
      var self = this;
      self.els.$chk1.on('click', function(){
      // 전체선택
        if (self.els.$chk1.prop('checked')) {
          $('.chk').prop('checked',true);
        } else {
          $('.chk').prop('checked',false);
        }        
      });
      self.els.$nextBth.on('click', function(){
        if(!self.els.$chk2.prop('checked')){
          return alert('서비스 이용약관에 동의해주세요.');
        }
        if(!self.els.$chk3.prop('checked')){
          return alert('개인정보 수집 및 이용에 동의해주세요.');
        }
        M.page.html('./join2.html');
      });
         
    }
  };
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);