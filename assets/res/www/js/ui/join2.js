/**
 * @file : join2.js
 * @author : 강샛별
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
      els: {
        $backBtn : null,
        $userNmIpt : null,
        $man : null,
        $woman : null,
        $year : null,
        $month : null,
        $date : null,
        $cellPhone : null,
        $nextBtn : null
      },
      data: {},
      init : function init() {
        this.els.$backBtn = $('#back-btn');
        this.els.$userNmIpt = $('#user-nm');
        this.els.$man = $('#man');
        this.els.$woman = $('#woman');
        this.els.$year = $('#year');
        this.els.$month = $('#month');
        this.els.$date = $('#date');
        this.els.$cellPhone = $('#cell-phone');
        this.els.$nextBtn = $('#next-btn');
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$backBtn.on('click', function(){
          M.page.html("./login.html");
        });
        this.els.$nextBtn.on('click', function(){
           self.nextBtn();
        });
      },
      nextBtn : function() {
        var name = this.els.$userNmIpt.val().trim();
        var gender = $("input:radio[name='gender']:checked").val();
//        var man = this.els.$man.val().trim();
//        var woman = this.els.$woman.val().trim();
        var year = this.els.$year.val().trim();
        var month = this.els.$month.val().trim();
        var date = this.els.$date.val().trim();
        var cellPhone = this.els.$cellPhone.val().trim();
        
        if(name == '') {
          return alert("이름을 입력해주세요");
        }
        if(gender == '') { 
          return alert("성별을 입력해주세요");
        }
        if(year == '' || month == '' || date == '') {
          return alert("생년원일을 입력해주세요");
        }
        if(cellPhone == '') {
          return alert("연락처를 입력해주세요");
        }
         
        M.page.html({
          path : "join3.html", 
          param : {
            "userNm" : name, 
            "gender" : gender,
            "year" : year,
            "month" : month,
            "date" : date,
            "cellPhone" : cellPhone
          }
        });
        
      }
    
  }; // 가입하기 버튼 이벤트어디
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);