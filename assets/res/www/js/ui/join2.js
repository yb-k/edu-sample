/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: {
      $userNmIpt:null,
      $yearIpt:null,
      $monthIpt:null,
      $dateIpt:null,
      $cellphoneIpt:null,
      $nextBtn:null,
      $genderSelected:null,      
    },
    data: {},
    init : function init() {
      this.els.$userNmIpt = $('#userNm');
      this.els.$yearIpt = $('#year');
      this.els.$monthIpt = $('#month');
      this.els.$dateIpt = $('#date');
      this.els.$cellphoneIpt = $('#cellPhone');
      this.els.$nextBtn = $('#nextBtn');
      this.els.$genderSelected = $("input[name=gender]");
    },
   
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
    },
    
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      
      this.els.$nextBtn.on('click', function(){
        self.next();
      });
      
      
      
    },
    
    next:function () {
      var self = this;
      var name = this.els.$userNmIpt.val().trim();      
      var gender = $('input[name=gender]:checked').val();
      var year = this.els.$yearIpt.val().trim();
      var month = this.els.$monthIpt.val().trim();
      var date = this.els.$dateIpt.val().trim();
      var birth = year+month+date;
      var phone = this.els.$cellphoneIpt.val().trim();
      console.log(gender);
      
      if(name == '') {
        return alert('이름을 입력해주세요');
      }
      if(!this.els.$genderSelected.is(":checked")) {
        return alert('성별을 선택해주세요');
      }
      if(year == '') {
        return alert('년도를 입력해주세요');
      }
      
      if(year.length != 4) {
        return alert('년도를 네자리로 입력해주세요');
      }
      if(month == '') {
        return alert('월을 입력해주세요');
      }
      if(month.length != 2) {
        return alert('월을 두자리로 입력해주세요');
      }
      if(month >=13 || month <=0){
        return alert('달을 1~12 중에 입력해주세요');
      }
      if(date == '') {
        return alert('날짜를 입력해주세요');
      }
      if(date.length != 2) {
        return alert('일을 두자리로 입력해주세요');
      }
      if(date <=0 || date >=32) {
        return alert('일을 올바르게 입력해주세요');
      }
      if(phone == '') {
        return alert('전화번호를 입력해주세요');
      }
      console.log(birth);
      M.page.html({
        path: './join3.html',
        param: {
          "userNm": name,
          "birthDate" : birth,
          "cellPhone" : phone,
          "gender" : gender,
        }
      });
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