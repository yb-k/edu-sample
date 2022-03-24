/**
 * @file : join1.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: {
       $chk1: null,
       $chk2: null,
       $chk3: null,
       $chk4: null,
       $nextBtn: null
    },
    data: {},
    init : function init() {
      this.els.$chk1 = $('#chk1'); //모두 동의
      this.els.$chk2 = $('#chk2'); //필수1
      this.els.$chk3 = $('#chk3'); //필수2
      this.els.$chk4 = $('#chk4'); //선택
      this.els.$nextBtn = $('#nextBtn'); //다음 버튼
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
    
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$nextBtn.on('click', function(){
        self.joinNext();
      });
//      this.els.$chk1.on('change', function() {
//        self.allCheck();
//      });
      this.els.$chk1.on('change', function() {
              self.allCheck2();
            });
    },
    allCheck : function() {
      if (this.els.$chk1.prop('checked')) {
        return $("input:checkbox[class='chk']").prop("checked", true);
      } else {
        return $("input:checkbox[class='chk']").prop("checked", false);
      }
    },
    
    allCheck2 : function() {
       $("#chk1").click(function() {
          if($("#chk1").is(":checked")) $("input:checkbox[class='chk']").prop("checked", true);
          else $("input:checkbox[class='chk']").prop("checked", false);
       });
       $("input:checkbox[class='chk']").click(function() {
          var total = $("input:checkbox[class='chk']").length;
          var checked = $("input:checkbox[class='chk']:checked").length;
          
          if(total != checked) $("#chk1").prop("checked", false);
          else $("#chk1").prop("checked", true); 
       });

    },
        
    joinNext:function (){
      var self = this;
      var ischk1 = this.els.$chk1.prop('checked');
      var ischk2 = this.els.$chk2.prop('checked');
      var ischk3 = this.els.$chk3.prop('checked');
      var ischk4 = this.els.$chk4.prop('checked');
      var nextBtn = this.els.$nextBtn.prop('click');

      if(!ischk2) {      
        alert('첫번째 필수 항목에 동의하지 않으셨습니다.');                
        return false;
      }
      if(!ischk3) {      
        alert('두번째 필수 항목에 동의하지 않으셨습니다.');                
        return false;
      }
      
      if(ischk3 && ischk3) {      
        M.page.html({
          path: './join2.html'
        });
      }

      return true;
    }
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