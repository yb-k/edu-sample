/**
 * @file : join1.js 약관동의 페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

 (function ($,M,window){
    var page = {
      els:{
          $chk1: null,
          $chk2: null,
          $chk3: null,
          $chk4: null,
          $nextBtn: null
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
        // 화면에서 세팅할 동적 데이터
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        this.els.$chk1.on('change', function() {
            self.checkAll();
        });
        this.els.$nextBtn.on('click', function() {
            self.nextBtn();
        });
      },
      
      checkAll: function(){
        if(this.els.$chk1.prop('checked')){
            return $("input:checkbox[class='chk']").prop('checked', true);
        }
        else{
            return $("input:checkbox[class='chk']").prop('checked', false);
        }
      },
      nextBtn: function(){
        if(this.els.$chk2.prop('checked')&&this.els.$chk3.prop('checked')){
            M.page.html("./join2.html")
        }
        else{
            return alert("가입하시려면 필수 이용 약관에 동의하셔야 합니다.");
        }
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