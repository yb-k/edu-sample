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
      $chked:null,
      
    },
    data: {},
    init : function init() {
      this.els.$nextBtn = $('#nextBtn');
      this.els.$allchkBtn = $('#chk1');

      this.els.$chk2 = $('#chk2');
      this.els.$chk3 = $('#chk3');
      this.els.$chk4 = $('#chk4');  
      this.els.$chked = $("input[type=checkbox]");    
    },
   
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
    },
    
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      
      this.els.$nextBtn.on('click', function() {
         self.next();
      });
      
      this.els.$allchkBtn.on('click', function() {
        if($("input:checkbox[id='chk1']").prop("checked")) {
          $("input[type=checkbox]").prop("checked", true);
        } else {
          $("input[type=checkbox]").prop("checked", false);
        }
      });
     
      this.els.$chked.on('click', function(){
        var total =  $("input[type=checkbox]").length;
        var checked = $("input[type=checkbox]:checked").length;

        if(total != checked) $("input:checkbox[id='chk1']").prop("checked", false);
        else $("input:checkbox[id='chk1']").prop("checked", true);
      });
     
    },
    
    next:function () {
      var self = this;
      var ischecked1 = this.els.$chk2.prop('checked');
      var ischecked2 = this.els.$chk3.prop('checked');
     
      
      if(ischecked1){
      } else { // 첫번째 체크박스가 체크 되어있지 않은 경우
        alert("필수 첫번째 항목을 체크 해주세요.")
        return false;
      }
      
      if(ischecked2){
      } else { // 두번째 체크박스가 체크 되어있지 않은 경우
        alert("필수 두번째 항목을 체크 해주세요.");
        return false;
      }
      
      M.page.html('./join2.html');
      
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